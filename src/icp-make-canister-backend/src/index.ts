// import { Canister,  query, update, nat64, text } from 'azle';
import {
    bool,
    Canister,
    nat64,
    nat8,
    Opt,
    query,
    StableBTreeMap,
    text,
    Tuple,
    update,
    Vec,
    Record,
    Some,
    None,
    Void
} from 'azle';

const User = Record({
    id : text,
    pw : text,
    auth : nat8
});
type User = typeof User.tsType;

const File = Record({
    index : nat64,
    title : text,
    contents : text,
    auth : nat8
});
type File = typeof File.tsType;

const ROOT_AUTH : nat8 = 0;
const FIRST_AUTH : nat8 = 1;
const SECOND_AUTH : nat8 = 2;
const THIRD_AUTH : nat8 = 3;

let userMap = StableBTreeMap<text, User>(0);

let fileMap = StableBTreeMap<text, File>(0);

let fileAccessLogs : Vec<text> = [];

let logIndex: nat64 = 0n;

let fileIndex: nat64 = 0n;

export default Canister({

    uploadFile: update([text, text, nat8, text], bool, (fileTitle, fileContents, fileAuth, userId) => {
        if (!userMap.containsKey(userId)) {
            return false
        }
        if (!fileMap.containsKey(fileTitle)) {
            let file : File = {index : fileIndex, title : fileTitle, contents : fileContents, auth : fileAuth};
            fileIndex += 1n;
            fileMap.insert(fileTitle, file);
            return true
        }
        return false
    }),

    readFile: update([text, text], Opt(File), (title, userId) => {
        if (fileMap.get(title) == None || userMap.get(userId) == None) {
            return None
        }
        if (fileMap.get(title).Some!.auth < userMap.get(userId).Some!.auth) {
            return None
        }
        const now = Date.now();
        fileAccessLogs.push(`${now} | ${logIndex} | ${userId} read ${title}`);
        logIndex += 1n;
        return fileMap.get(title)
    }),

    getFileAccessLogs: query([], Vec(text), () => {
        return fileAccessLogs
    }),

    registerUser: update([User], bool, (user) => {
        if (user.auth < ROOT_AUTH || user.auth > THIRD_AUTH) {
            return false
        }
        if (!userMap.containsKey(user.id)) {
            userMap.insert(user.id, user);
            return true
        };
        return false
    }),

    login: query([text, text], bool, (userId, userPw) => {
        if (userMap.containsKey(userId)) {
            let u = userMap.get(userId);
            if (u.Some?.pw == userPw) {
                return true
            } else {
                return false
            }
        } else {
            return false
        }
    }),

    
    // greet: query([text], text, (name) => {
    //     return `Hello, ${name}!`;
    // }),
    // readCount: query([], nat64, () => {
    //     return count;
    // }),
    // incrementCount: update([], nat64, () => {
    //     count += 1n;

    //     return count;
    // }),
    // containsKey: query([Key], bool, (key) => {
    //     return map.containsKey(key);
    // }),

    // get: query([Key], Opt(Value), (key) => {
    //     return map.get(key);
    // }),

    // insert: update([Key, Value], Opt(Value), (key, value) => {
    //     return map.insert(key, value);
    // }),

    // isEmpty: query([], bool, () => {
    //     return map.isEmpty();
    // }),

    // items: query([], Vec(Tuple(Key, Value)), () => {
    //     return map.items();
    // }),

    // keys: query([], Vec(Key), () => {
    //     return Uint8Array.from(map.keys());
    // }),

    // len: query([], nat64, () => {
    //     return map.len();
    // }),

    // remove: update([Key], Opt(Value), (key) => {
    //     return map.remove(key);
    // }),

    // values: query([], Vec(Value), () => {
    //     return map.values();
    // })
})
