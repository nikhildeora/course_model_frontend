import React, { useState } from "react";
import { Link } from "react-router-dom";
import styles from "./navbar.module.css";
import { useDispatch, useSelector } from "react-redux";
import { FunUserLogout } from "../../redux/actions";

const Navbar = () => {
  const token = useSelector(store=>store.token);
  const dispatch = useDispatch();

  return (
    <nav className={styles.navbar}>
      <ul className={styles.navbar_list}>
        <div className={styles.navbar_section}>
          <li className={styles.navbar_item}>
            <Link to="/">Courses</Link>
          </li>
          <li className={styles.navbar_item}>
            <Link to="/dashboard">Dashboard</Link>
          </li>
        </div>

        {!token ? (
          <div className={styles.navbar_section}>
            <li className={styles.navbar_item}>
              <Link to="/signup">SignUp</Link>
            </li>
            <li className={styles.navbar_item}>
              <Link to="/login">Login</Link>
            </li>
          </div>
        ) : (
          <button onClick={()=>dispatch(FunUserLogout())} className={styles.navbar_logout}>Logout</button>
        )}
      </ul>
    </nav>
  );
};

export default Navbar;
