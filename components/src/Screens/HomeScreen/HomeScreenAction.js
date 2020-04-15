import * as ActionType from "./ActionType";

export function storeUserData(userInfo, loggedIn) {    
    return {
        type: ActionType.STORE_DATA,
        value: userInfo,
        loggedIn: loggedIn
    };
}

export function isSignedIn(sign) {    
    return {
        type: ActionType.IS_SIGNED_IN,
        payload: sign
    };
}