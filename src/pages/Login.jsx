
import React, { useEffect, useRef, useState } from 'react';
import styles from "../styles/login.module.css";
import { Link, useNavigate } from 'react-router-dom';
import { FunCurrentUserDetail, FunUserLogin } from '../redux/actions';
import { useDispatch, useSelector } from 'react-redux';

const Login = () => {
  const loginFormRef = useRef([]);
  const token = useSelector(store=>store.token);
  const currentUser = useSelector(store=>store.currentUser);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();

    if(loginFormRef[0].value==="" || loginFormRef[1].value===""){
      alert("All fields are mandatory");
      return;
    }

    const loginDetail = {
      email : loginFormRef[0].value,
      pass : loginFormRef[1].value
    }

    dispatch(FunUserLogin(loginDetail))

    loginFormRef[0].value = "";
    loginFormRef[1].value = "";
  };

  useEffect(()=>{
    if(token){
      dispatch(FunCurrentUserDetail(token))
      .then(()=>navigate("/"))
    }
  },[token])

  return (
    <form onSubmit={handleLogin} className={styles.login_form}>
      <h2>Login</h2>
      <div className={styles.form_group}>
        <label htmlFor="email">Email:</label>
        <input
          type="email"
          id="email"
          name="email"
          ref={(email)=>loginFormRef[0]=email}
          placeholder="Enter your email"
        />
      </div>
      <div className={styles.form_group}>
        <label htmlFor="password">Password:</label>
        <input
          type="password"
          id="password"
          name="password"
          ref={(pass)=>loginFormRef[1]=pass}
          placeholder="Enter your password"
        />
      </div>
      <button type='submit' className={styles.login_button}>
        Login
      </button>
      <p>
        Don't have an account? <Link to="/signup">Sign up</Link>
      </p>
    </form>
  );
};

export default Login;

