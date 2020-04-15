import * as ActionType from './ActionType';

export function editUserCode(code) {    
    return {
        type: ActionType.EDIT_USERCODE,
        code: code
    }
}

export function editUserName(name) {    
    return {
        type: ActionType.EDIT_USERNAME,
        name: name
    }
}

export function editUserDOB(dob) {    
    return {
        type: ActionType.EDIT_USERDOB,
        dob: dob
    }
}

export function storeInitialData(name, dob, code) {    
    return {
        type: ActionType.STORE_INITIAL_DATA,
        name: name,
        dob: dob,
        code: code
    }
}