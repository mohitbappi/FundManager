import * as ActionType from './ActionType';

export function getAllEmployees(allEmployees){    
    return {
        type: ActionType.GET_ALL_EMPLOYEES,
        payload: allEmployees
    }
}

export function setNull() {    
    return {
        type: ActionType.SET_NULL        
    }
}

export function setAmount(amount) {    
    return {
        type: ActionType.SET_AMOUNT,
        payload: amount     
    }
}