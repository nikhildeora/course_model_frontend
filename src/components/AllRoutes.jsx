import { Route, Routes } from "react-router-dom";
import React from 'react'
import PrivateRoute from "./PrivateRoute";
import Courses from "../pages/Courses";
import SingleCourse from "../pages/SingleCourse";
import Dashboard from "../pages/Dashboard";
import SignUp from "../pages/SignUp";
import Login from "../pages/Login";

const AllRoutes = () => {
  return (
    <Routes>
        <Route path="/" element={<Courses />} />
        <Route path="/course/:course_id" element={<SingleCourse />} />
        <Route path="/dashboard" element={
        <PrivateRoute>
        <Dashboard />
        </PrivateRoute>
        } />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/login" element={<Login />} />
    </Routes>
  )
}

export default AllRoutes