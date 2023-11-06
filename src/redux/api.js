// All Api's are here 

const cyclicApi = "https://button-sea-lion.cyclic.app";
// const cyclicApi = "http://localhost:8080";

function  get_all_courses_api(){
    return fetch(`${cyclicApi}/course`)
    .then(res=>res.json())
    .then(res=>res.data)
    .catch(err=>err)
};

function sign_up_user_api(signUpDetail){
    return fetch(`${cyclicApi}/register`,{
      method : "POST",
      body : JSON.stringify(signUpDetail),
      headers : {
        "Content-Type" : "application/json"
      }  
    }).then(res=>res.json())
    .then(res=>res)
    .catch(err=>console.log(err))
}

function single_course_api(course_id){
    return fetch(`${cyclicApi}/course/${course_id}`)
    .then(res=>res.json())
    .then(res=>res.course)
    .catch(err=>console.log(err))
}

function login_user_api(loginDetail){
    return fetch(`${cyclicApi}/login`,{
        method : "POST",
        body : JSON.stringify(loginDetail),
        headers : {
          "Content-Type" : "application/json"
        }  
      }).then(res=>res.json())
      .then(res=>res)
      .catch(err=>console.log(err))
}

function get_current_user_detail_api(curToken){
    return fetch(`${cyclicApi}/userdetail`,{
        headers : {
            "Authorization" : curToken
        }
    }).then(res=>res.json())
    .then(res=>res)
    .catch(err=>console.log(err))
}

function enroll_in_new_course_api(course_enroll, curToken){
  return fetch(`${cyclicApi}/enroll/`,{
    method : "PATCH",
    body : JSON.stringify({courseEnroll:[...course_enroll]}),
    headers : {
      "Content-Type" : "application/json",
      "Authorization" : curToken
    }  
  }).then(res=>res.json())
  .then(res=>res)
  .catch(err=>console.log(err))
}

function enrolled_course_completed_api(course_enroll, curToken){
  return fetch(`${cyclicApi}/coursecomplete/`,{
    method : "PATCH",
    body : JSON.stringify({courseEnroll:[...course_enroll]}),
    headers : {
      "Content-Type" : "application/json",
      "Authorization" : curToken
    }  
  }).then(res=>res.json())
  .then(res=>res)
  .catch(err=>console.log(err))
}

export {get_all_courses_api, sign_up_user_api, single_course_api, login_user_api, get_current_user_detail_api, enroll_in_new_course_api, enrolled_course_completed_api};