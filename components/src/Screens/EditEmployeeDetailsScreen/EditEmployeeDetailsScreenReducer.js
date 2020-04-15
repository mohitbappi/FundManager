import * as ActionType from './ActionType';

const initialState = {
    code: '',
    name: '',
    dob: '',
    email: '',
    amount: ''
}

const EditEmployeeDetailsScreenReducer = (state = initialState, action) => {    
    switch(action.type) {
        case ActionType.EDIT_USERCODE:
            return {
                ...state,
                code: action.payload
            }           
        case ActionType.EDIT_USERNAME:
            return {
                ...state,
                name: action.payload
            } 
        case ActionType.EDIT_USERDOB:
            return {
                ...state,
                dob: action.payload
            }
        case ActionType.EDIT_USEREMAIL:
            return {
                ...state,
                email: action.payload
            }
        case ActionType.EDIT_USERAMOUNT:
            return {
                ...state,
                amount: action.payload
            }
        case ActionType.USER_STORE_INITIAL_DATA:                        
            return {
                ...state,
                name: action.name,
                dob: action.dob,
                code: action.code,
                email: action.email,
                amount: action.amount
            }
    }
    return state;
}

export default EditEmployeeDetailsScreenReducer;
