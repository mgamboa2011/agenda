import { types } from "../types/types";

/*
    {
        uid: asdasdad,
        name: 'Mauricio',
    }
*/
export const authReducer = (state = {}, action) => {
    switch (action.type) {
        case types.loggin:
            return {
                uid: action.payload.uid,
                name: action.payload.displayName
            }
        case types.logout:
            return {}
        default:
            return state;
    }
}