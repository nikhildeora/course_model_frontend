import React from 'react'
import { useSelector } from 'react-redux';
import styles from "../styles/courses.module.css";
import { Link } from 'react-router-dom';

const Courses = () => {
 const courses = useSelector(store=>store.courses);

 return (
  <div className={styles.courses_list}>
    {courses.length === 0 ? (
      <h1 className={styles.empty_list}>List is Empty</h1>
    ) : (
      <div className={styles.courses}>
        {courses?.map(course => {
          return (
            <div key={course._id} className={styles.course_card}>
              <img src={course.thumbnail} alt={course.name} className={styles.course_image} />
              <h1 className={styles.course_title}>{course.name}</h1>
              <p className={styles.instructor}>Instructor: {course.instructor}</p>
              <Link to={`/course/${course._id}`}><button className={styles.detail_button}>Details</button></Link> 
            </div>
          );
        })}
      </div>
    )}
  </div>
);
}

export default Courses;
