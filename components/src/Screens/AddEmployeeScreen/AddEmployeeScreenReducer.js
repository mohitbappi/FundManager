import * as ActionType from './ActionType';

const initialState = {
    email: '',
    code: '',
    name: '',
    dob: '',
    amount: ''    
}

const AddEmployeeScreenReducer = (state = initialState, action) => {
    switch(action.type) {
        case ActionType.SET_EMAIL:
            return {
                ...state,
                email: action.payload
            }
        case ActionType.SET_CODE:
            return {
                ...state,
                code: action.payload
            }
        case ActionType.SET_NAME:
            return {
                ...state,
                name: action.payload
            }
        case ActionType.SET_DOB:
            return {
                ...state,
                dob: action.payload
            }
        case ActionType.EMPLOYEE_SET_AMOUNT:
            return {
                ...state,
                amount: action.payload
            }
        case ActionType.RESET_VALUES:
            return {
                ...state,
                email: '',
                code: '',
                name: '',
                dob: '',
                amount: ''
            }        
    }
    return state;
}

export default AddEmployeeScreenReducer;