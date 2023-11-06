import { GET_ALL_COURSES, USER_LOGIN, CURREBT_USER_DETAIL, USER_LOGOUT, ALREADY_LOGGED_IN } from "./actionTypes";

let initialState = {
    courses : [],
    currentUser : {},
    token : ""
};

export function Reducer(state=initialState,action){
    switch(action.type){
        case GET_ALL_COURSES : {
            return {...state, courses : action.payload};
        }
        case USER_LOGIN : {
            localStorage.setItem("alemeno_student_token",action.payload);
            return {...state, token : action.payload};
        }
        case CURREBT_USER_DETAIL : {
            return {...state, currentUser : {...action.payload}}
        }
        case USER_LOGOUT : {
            localStorage.removeItem("alemeno_student_token");
            return {...state, currentUser : {}, token : ""}
        }
        case ALREADY_LOGGED_IN : {
            return {...state, token : action.payload};
        }
        default : {
            return state;
        }
    }
}