import * as ActionType from './ActionType';

const initialState = {
    code: '',
    name: '',
    dob: ''
}

const EditProfileScreenReducer = (state = initialState, action) => {    
    switch(action.type) {
        case ActionType.EDIT_USERCODE:
            return {
                ...state,
                code: action.code
            }           
        case ActionType.EDIT_USERNAME:
            return {
                ...state,
                name: action.name
            } 
        case ActionType.EDIT_USERDOB:
            return {
                ...state,
                dob: action.dob
            }
        case ActionType.STORE_INITIAL_DATA:                        
            return {
                ...state,
                name: action.name,
                dob: action.dob,
                code: action.code
            }
    }
    return state;
}

export default EditProfileScreenReducer;
