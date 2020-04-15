import * as ActionType from './ActionType';

export function setEmail(email){
    return {
        type: ActionType.SET_EMAIL,
        payload: email
    }
}

export function setCode(code){
    return {
        type: ActionType.SET_CODE,
        payload: code
    }
}

export function setName(name){
    return {
        type: ActionType.SET_NAME,
        payload: name
    }
}

export function setDOB(dob){
    return {
        type: ActionType.SET_DOB,
        payload: dob    
    }
}

export function setAmount(amount){
    return {
        type: ActionType.EMPLOYEE_SET_AMOUNT,
        payload: amount
    }
}

export function resetValues(){
    return {
        type: ActionType.RESET_VALUES
    }
}