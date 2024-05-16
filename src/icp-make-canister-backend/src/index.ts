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

const Key = nat8;
type Key = typeof Key.tsType;

const Value = text;
type Value = typeof Value.tsType;

let map = StableBTreeMap<Key, Value>(0);

//================================================


const File = Record({
    title : text,
    contents : text 
});
type File = typeof File.tsType;

let fileMap = StableBTreeMap<text, File>(0);

const User = Record({
    id : text,
    pw : text
});
type User = typeof User.tsType;

let userMap = StableBTreeMap<text, User>(0);

let fileAccessLog : Vec<text> = [];



let logIndex: nat64 = 0n;

export default Canister({
    uploadFile: update([File, text], bool, (file, userId) => {
        if (!userMap.containsKey(userId)) {
            return false
        }
        if (!fileMap.containsKey(file.title)) {
            fileMap.insert(file.title, file);
            return true
        }
        return false
    }),
    readFile: update([text, text], Opt(File), (title, userId) => {
        if (!userMap.containsKey(userId)) {
            return None
        }
        if (fileMap.get(title) != None) {
            fileAccessLog.push(`${logIndex} ${userId} read ${title}`);
            logIndex += 1n;
        }
        return fileMap.get(title)
    }),
    getFileAccessLog: query([], Vec(text), () => {
        return fileAccessLog
    }),
    register: update([User], bool, (user) => {
        if (!userMap.containsKey(user.id)) {
            userMap.insert(user.id, user);
            return true
        };
        return false
    }),
    login: query([User], bool, (user) => {
        if (userMap.containsKey(user.id)) {
            let u = userMap.get(user.id);
            if (u.Some?.pw == user.pw) {
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
