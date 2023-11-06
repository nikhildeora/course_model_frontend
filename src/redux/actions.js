import {
  GET_ALL_COURSES,
  USER_LOGIN,
  CURREBT_USER_DETAIL,
  USER_LOGOUT,
  ALREADY_LOGGED_IN,
  ENROLL_IN_NEW_COURSE,
  ENROLLED_COURSE_COMPLETED,
} from "./actionTypes";
import {
  get_all_courses_api,
  login_user_api,
  get_current_user_detail_api,
  enroll_in_new_course_api,
  enrolled_course_completed_api,
} from "./api";

// action for get all courses 
export const FunGetAllCourses = () => async (dispatch) => {
  try {
    let courseData = await get_all_courses_api();
    dispatch({ type: GET_ALL_COURSES, payload: courseData });
  } catch (error) {
    console.log(error);
  }
};

// action for login 
export const FunUserLogin = (loginDetail) => async (dispatch) => {
  try {
    let loginData = await login_user_api(loginDetail);
    if (loginData.token === undefined) {
      alert(loginData.message);
    } else {
      alert(loginData.message);
      dispatch({ type: USER_LOGIN, payload: loginData.token });
    }
  } catch (error) {
    console.log(error);
  }
};

// action for getting user details , this action first called just after user logged in 
export const FunCurrentUserDetail = (curToken) => async (dispatch) => {
  try {
    get_current_user_detail_api(curToken).then((res) => {
      if (res.error === undefined) {
        dispatch({ type: CURREBT_USER_DETAIL, payload: res });
      } else {
        alert(res.message);
        dispatch({ type: USER_LOGOUT });
        return;
      }
    });
  } catch (error) {
    console.log(error);
  }
};

export const FunUserLogout = () => ({ type: USER_LOGOUT });

export const FunAlreadyLoggedIn = (user_token) => ({
  type: ALREADY_LOGGED_IN,
  payload: user_token,
});



export const FunEnrollInNewCourse =
  (course_enroll, user_token) => async (dispatch) => {
    try {
      let res = await enroll_in_new_course_api(course_enroll, user_token);
      console.log("res",res);
      if (res.message === "successfully updated") {
        get_current_user_detail_api(user_token).then((res) => {
          if (res.error === undefined) {
            dispatch({ type: CURREBT_USER_DETAIL, payload: res });
          } else {
            alert(res.message);
            return;
          }
        });
      } else {
        console.log(res);
        alert(res.message);
      }
    } catch (error) {
      console.log(error);
    }
  };

export const FunEnrolledCourseComplete =
  (course_enroll, user_token) => async (dispatch) => {
    try {
      let res = await enrolled_course_completed_api(course_enroll, user_token);
      if (res.message === "successfully updated") {
        get_current_user_detail_api(user_token).then((res) => {
          if (res.error === undefined) {
            dispatch({ type: CURREBT_USER_DETAIL, payload: res });
          } else {
            alert(res.message);
            return;
          }
        });
      } else {
        alert(res.message);
      }
    } catch (error) {
      console.log(error);
    }
  };
