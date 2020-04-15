import * as ActionType from './ActionType';

export function editUserCode(code) {    
    return {
        type: ActionType.EDIT_USERCODE,
        payload: code
    }
}

export function editUserName(name) {    
    return {
        type: ActionType.EDIT_USERNAME,
        payload: name
    }
}

export function editUserDOB(dob) {    
    return {
        type: ActionType.EDIT_USERDOB,
        payload: dob
    }
}

export function editUserEmail(email) {    
    return {
        type: ActionType.EDIT_USEREMAIL,
        payload: email
    }
}

export function editUserAmount(amount) {    
    return {
        type: ActionType.EDIT_USERAMOUNT,
        payload: amount
    }
}

export function storeInitialData(name, dob, code, email, amount) {    
    return {
        type: ActionType.USER_STORE_INITIAL_DATA,
        name: name,
        dob: dob,
        code: code,
        email: email,
        amount: amount
    }
}