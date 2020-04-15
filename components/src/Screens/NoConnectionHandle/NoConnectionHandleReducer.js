import * as ActionType from './ActionType';

const initialState = {
    isActive : 'none',
    position: 'relative' 
}

const NoConnectionHandleReducer = (state = initialState, action) => {        
    switch(action.type) {
        case ActionType.CHECK_INTERNET:
            return {
                ...state,
                isActive: action.payload,
                position: action.position             
            }
    }        
    return state;
}

export default NoConnectionHandleReducer;