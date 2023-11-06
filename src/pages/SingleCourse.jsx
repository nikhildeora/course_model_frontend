import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import styles from "../styles/singleCourse.module.css";
import { single_course_api } from "../redux/api";
import { useDispatch, useSelector } from "react-redux";
import { FunEnrollInNewCourse, FunEnrolledCourseComplete } from "../redux/actions";

const SingleCourse = () => {
  const { course_id } = useParams();
  const [curCourse, setCurCourse] = useState({});
  const token = useSelector((store) => store.token);
  const currentUser = useSelector((store) => store.currentUser);
  const [isEnroll, setIsEnroll] = useState(false);
  const [status, setStatus] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    if (token) {
      for (let i = 0; i < currentUser.courseEnroll.length; i++) {
        if (currentUser.courseEnroll[i].id._id === course_id) {
          setIsEnroll(true);
          setStatus(currentUser.courseEnroll[i].status);
          break;
        }
      }
    }

    single_course_api(course_id).then((res) => setCurCourse(res));
  }, [course_id]);

  const enrollInCourse = () => {
    if(!token) return;
    const courseEnrollArr = [...currentUser.courseEnroll];
    courseEnrollArr.push({id : curCourse._id, status :false});
    setIsEnroll(true);
    dispatch(FunEnrollInNewCourse(courseEnrollArr,token));
  }

  const enrolledCourseComplete = () => {
    if(!token) return;
    const courseEnrollArr = currentUser.courseEnroll.map(item=>{
       if(item.id._id==course_id){
        return {...item, status : true};
       }
       return item;
    })
    setStatus(true);
    dispatch(FunEnrolledCourseComplete(courseEnrollArr,token));
  }

  return (
    <div className={styles.single_course_page}>
      {curCourse._id === undefined ? (
        <h2 className={styles.loading}>Loading...</h2>
      ) : (
        <div>
          <h1 className={styles.course_title}>{curCourse.name}</h1>
          <img
            src={curCourse.thumbnail}
            alt={curCourse.name}
            className={styles.course_image}
          />
          <p className={styles.description}>
            <span>Description:</span> {curCourse.description}
          </p>
          <p className={styles.instructor}>
            <span>Instructor:</span> {curCourse.instructor}{" "}
          </p>
          <p className={styles.duration}>
            <span>Duration: </span>
            {curCourse.duration}{" "}
          </p>
          <p className={styles.location}>
            <span>Location: </span>
            {curCourse.location}{" "}
          </p>
          <p className={styles.status}>
            <span>Status: </span>
            {curCourse.enrollmentStatus}
          </p>
          <p className={styles.schedule}>
            <span>Schedule: </span>
            {curCourse.schedule}{" "}
          </p>
          <ul className={styles.prerequisites_ul}>
            <h2 className={styles.prerequisites_title}>Prerequisites:</h2>
            {curCourse.prerequisites.map((pre, i) => {
              return (
                <li key={i} className={styles.prerequisite}>
                  {pre}
                </li>
              );
            })}
          </ul>
          <div>
            <h2 className={styles.syllabus_title}>Syllabus:</h2>
            {curCourse.syllabus.map((syl, i) => {
              return (
                <div key={i} className={styles.syllabus_item}>
                  <h3 className={styles.week_title}>Week {syl.week}</h3>
                  <p className={styles.topic}>Topic: {syl.topic}</p>
                  <p className={styles.small_description}>
                    Small Description: {syl.content}
                  </p>
                </div>
              );
            })}
          </div>
          {token ? (
            isEnroll ? (
              status ? (
                <h3>Status: Completed</h3>
              ) : (
                <div>
                  <h3>Status: In progress</h3>
                  <button onClick={enrolledCourseComplete} className={styles.enroll_now}>Complete</button>
                </div>
              )
            ) : (
              <button onClick={enrollInCourse} className={styles.enroll_now}>Enroll Now</button>
            )
          ) : null}
        </div>
      )}
    </div>
  );
};

export default SingleCourse;
