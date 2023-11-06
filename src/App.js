import logo from './logo.svg';
import './App.css';
import { useEffect } from 'react';
import Navbar from './components/Navbar/Navbar';
import AllRoutes from './components/AllRoutes';
import { useDispatch } from 'react-redux';
import { FunAlreadyLoggedIn, FunCurrentUserDetail, FunGetAllCourses } from './redux/actions';

function App() {
const dispatch = useDispatch();
const token = localStorage.getItem("alemeno_student_token") || "";

useEffect(()=>{
  dispatch(FunGetAllCourses());
  if(token){
    dispatch(FunAlreadyLoggedIn(token))
    dispatch(FunCurrentUserDetail(token));
  }
},[])

  return (
    <div className="App">
       <Navbar />
       <AllRoutes />
    </div>
  );
}

export default App;
