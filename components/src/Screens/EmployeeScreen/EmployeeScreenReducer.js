import * as ActionType from './ActionType';

const initialState = {
    allEmployees: null,
    totalAmount: 0,
    convertKeyValue: null
}

const EmployeeScreenReducer = (state = initialState, action) => {      
    switch(action.type) {        
        case ActionType.GET_ALL_EMPLOYEES:           
            return {
                ...state,
                allEmployees: action.payload
            }
        case ActionType.SET_NULL:
            return {
                ...state,
                allEmployees: null,
                totalAmount: 0
            }
        case ActionType.SET_AMOUNT:
            return {
                ...state,
                totalAmount: action.payload
            }
    }
    return state;
}

export default EmployeeScreenReducer;