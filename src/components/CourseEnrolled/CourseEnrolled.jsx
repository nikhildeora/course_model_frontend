import React from "react";
import styles from "./courseEnrolled.module.css";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { FunEnrolledCourseComplete } from "../../redux/actions";

const CourseEnrolled = ({ course }) => {
  const currentUser = useSelector(store=>store.currentUser);
  const token = useSelector(store=>store.token);
  const dispatch = useDispatch();

  const enrolledCourseComplete = () => {
    if(course.status) return;

    const courseEnrollArr = currentUser.courseEnroll.map(item=>{
       if(item.id._id==course.id._id){
        return {...item, status : true};
       }
       return item;
    })
    dispatch(FunEnrolledCourseComplete(courseEnrollArr,token));
  }

  return (
    <div className={styles.course_card}>
      <img
        src={course.id.thumbnail}
        alt={course.id.name}
        className={styles.course_image}
      />
      <h1 className={styles.course_title}>{course.id.name}</h1>
      <p className={styles.instructor}>Instructor: {course.id.instructor}</p>
      <div>
        {course.status ?                 
          <h3>Status: Completed</h3> :
          <div className={styles.status_inside_div}>
            <h3>Status: In progress</h3>
            <button onClick={enrolledCourseComplete} className={styles.detail_button}>Complete</button>
          </div>
         }
      </div>
      <Link to={`/course/${course.id._id}`}>
        <button className={styles.detail_button}>Details</button>
      </Link>
    </div>
  );
};

export default CourseEnrolled;
