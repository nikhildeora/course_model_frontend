import React, { useRef, useState } from "react";
import styles from "../styles/signup.module.css";
import { Link } from "react-router-dom";
import { sign_up_user_api } from "../redux/api";
import { useNavigate } from "react-router-dom";

const SignUp = () => {
  const signUpFormRef = useRef([]);
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    for (let i = 0; i <= 3; i++) {
      if (signUpFormRef[i].value === "") {
        alert("All fields are mandatory");
        return;
      }
    }

    const signUpDetail = {
      name: signUpFormRef[0].value,
      mobileNo: signUpFormRef[1].value,
      email: signUpFormRef[2].value,
      pass: signUpFormRef[3].value,
    };

    // console.log(signUpDetail);
    sign_up_user_api(signUpDetail)
      .then((res) => alert(res.message))
      .then(() => navigate("/login"));

    signUpFormRef[0].value = "";
    signUpFormRef[1].value = "";
    signUpFormRef[2].value = "";
    signUpFormRef[3].value = "";
  };

  return (
    <form onSubmit={handleLogin} className={styles.signUp_form}>
      <h2>SignUp</h2>
      <div className={styles.form_group}>
        <label htmlFor="name">Name:</label>
        <input
          type="text"
          id="name"
          name="name"
          ref={(name) => (signUpFormRef[0] = name)}
          placeholder="Enter your name"
        />
      </div>
      <div className={styles.form_group}>
        <label htmlFor="mobileno">Mobile No:</label>
        <input
          type="number"
          id="mobileno"
          name="mobileno"
          ref={(mobile) => (signUpFormRef[1] = mobile)}
          placeholder="Enter your mobile number"
        />
      </div>
      <div className={styles.form_group}>
        <label htmlFor="email">Email:</label>
        <input
          type="email"
          id="email"
          name="email"
          ref={(email) => (signUpFormRef[2] = email)}
          placeholder="Enter your email"
        />
      </div>
      <div className={styles.form_group}>
        <label htmlFor="password">Password:</label>
        <input
          type="password"
          id="password"
          name="password"
          ref={(pass) => (signUpFormRef[3] = pass)}
          placeholder="Enter your password"
        />
      </div>
      <button type="submit" className={styles.signUp_button}>
        SignUp
      </button>
      <p>
        Already have an account? <Link to="/login">Login</Link>
      </p>
    </form>
  );
};

export default SignUp;
