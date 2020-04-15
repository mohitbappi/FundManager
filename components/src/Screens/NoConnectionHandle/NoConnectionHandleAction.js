import * as ActionType from './ActionType';

export function checkConnectivity(value) {    
    return {
        type: ActionType.CHECK_INTERNET,
        payload: value ? 'none' : 'flex',
        position: value ? 'relative' : 'absolute',        
    }
}