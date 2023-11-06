import React from 'react'
import { useSelector } from 'react-redux';
import CourseEnrolled from '../components/CourseEnrolled/CourseEnrolled';
import styles from "../styles/dashboard.module.css";

const Dashboard = () => {
  const currentUser = useSelector(store=>store.currentUser);

  return (
    <div>
      <div className={styles.dashboard_main_first__div}>
         <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTLg7YYue_VyRsQLCwmguYP8nSLBwe24G8WgqJr8i_YxHwyHXbn9wqkZXAwdAvSGF9kVMk&usqp=CAU" alt="avatar_image" />
         <div className={styles.dashboard_main_inside__div}>
            <p><span>Name: </span>{currentUser?.name}</p>
            <p><span>Email: </span>{currentUser?.email}</p>
            <p><span>Mobile Number: </span>{currentUser?.mobileNo}</p>
         </div>
      </div>
      <div>
        <h1>Enrolled in Courses below:</h1>
        <div>
        {currentUser?.courseEnroll?.length===0 ? 
        <h2>Not Enrolled in any course yet</h2> :
        currentUser?.courseEnroll?.map((course,i)=>{
          return (<CourseEnrolled key={i} course={course} />) 
        })}
        </div>
      </div>
    </div>
  )
};

export default Dashboard;
