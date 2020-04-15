import * as ActionType from "./ActionType";

const initialState = {
    userInfo: null,
    loggedIn: false,
    isSignedIn: false
}

const HomeScreenReducer = (state = initialState, action) => {    
    switch(action.type) {        
        case ActionType.STORE_DATA:        
            return {
                ...state,
                userInfo: action.value,
                loggedIn: action.loggedIn
            }
        case ActionType.IS_SIGNED_IN:        
            return {
                ...state,
                isSignedIn: action.payload
            }
    }    
    return state;    
}

export default HomeScreenReducer;