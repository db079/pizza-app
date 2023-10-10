import React, { useState } from 'react'
import Layout from '../../components/Layout/Layout'
import { useNavigate } from "react-router-dom";
import axios from 'axios';
import "../../styles/AuthStyles.css";
import { useAuth } from '../../context/auth';
// import toast from 'react-hot-toast';
import {  toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useLocation } from 'react-router-dom';

const Login = () => {
    const navigate = useNavigate();
    const location = useLocation();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [auth,setAuth] = useAuth();

    
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post(`${process.env.REACT_APP_API}/api/v1/auth/login`, { email, password })
            if (res.data.success) {
                toast.success( res.data.message);
                setAuth({
                    ...auth,
                    user:res.data.user,
                    token:res.data.token
                });
                localStorage.setItem("auth", JSON.stringify(res.data));
                navigate(location.state || '/')
            } else {
                 toast.error(res.data.message);
            }
        } catch (error) {
            if(error.response && error.response.status >=400 && error.response.status <= 500){
                toast.error(error.response.data.message);
            }
            // console.log(error)
            // toast.error("First verify your email");
            //  if error in toastify we use hot-tost for that play vide 2.45.00
        }
        
    }


    return (
        <Layout title="Loign - Ecommer App">
            <div className="form-container" style={{ minHeight: "70vh" }}>
                <form onSubmit={handleSubmit}>
                    <h4 className="title">LOGIN NOW</h4>
        
                    <div className="mb-3">
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="form-control"
                            id="exampleInputEmail1"
                            placeholder="Enter Your Email "
                            required
                        />
                    </div>
                    <div className="mb-3">
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="form-control"
                            id="exampleInputPassword1"
                            placeholder="Enter Your Password"
                            required
                        />
                    </div>
                    <div className="mb-3">
                        <button type="submit" onClick={()=>navigate('/forgot-password')} className="btn btn-primary">
                            Forgot Password
                        </button>
                    </div>
                    <button type="submit" className="btn btn-primary">
                        Login
                    </button>
                </form>
            </div>
        </Layout>
    )
}

export default Login
