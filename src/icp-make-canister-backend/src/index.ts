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
import { sha256, sha224 } from 'js-sha256';


const User = Record({
    userHash : text,
    auth : nat8
});
type User = typeof User.tsType;

const UserHashElement = Record({
    identity : text,
    userId : text,
    userPw : text
})
type UserHashElement = typeof UserHashElement.tsType;

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

function addFileAccessLog(title : text, userHashElement: UserHashElement) {
    const now = Date.now();
    fileAccessLogs.push(`${now.toLocaleString()} | Log #${logIndex} | UserID: ${userHashElement.userId} accessed file: ${title}`);
    logIndex += 1n;
}

function getUserHash(userHashElement: UserHashElement) : text{
    let userIdHash = sha256(userHashElement.userId + userHashElement.identity)
    let userPwHash = sha256(userHashElement.userPw + userHashElement.identity)
    let userHash = sha256(userIdHash + userPwHash)
    return userHash
}

export default Canister({
    uploadFile: update([text, text, nat8, UserHashElement], bool, (fileTitle, fileContents, fileAuth, userHashElement) => {
        let userHash = getUserHash(userHashElement)
        if (!userMap.containsKey(userHash)) {
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

    readFile: update([text, UserHashElement], Opt(File), (fileTitle, userHashElement) => {
        let userHash = getUserHash(userHashElement)
        if (!fileMap.containsKey(fileTitle) || !userMap.containsKey(userHash)) {
            return None
        }
        if (fileMap.get(fileTitle).Some!.auth <= userMap.get(userHash).Some!.auth) {
            return None
        }
        addFileAccessLog(fileTitle, userHashElement)
        return fileMap.get(fileTitle)
    }),

    getFileAccessLogs: query([], Vec(text), () => {
        return fileAccessLogs
    }),

    registerUser: update([UserHashElement, nat8], bool, (userHashElement, auth) => {
        let userHash = getUserHash(userHashElement)
        let user : User = {userHash : userHash, auth : auth}

        if (auth < ROOT_AUTH || auth > THIRD_AUTH) {
            return false
        }
        if (userMap.containsKey(userHash)) {
            return false
        };
        userMap.insert(userHash, user);
        return true
    }),

    login: query([UserHashElement], bool, (userHashElement) => {
        let userHash = getUserHash(userHashElement)
        if (!userMap.containsKey(userHash)) {
            return false
        }
        return true
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
