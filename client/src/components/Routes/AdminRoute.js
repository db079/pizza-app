import { useState, useEffect } from "react";
import { useAuth } from "../../context/auth";
import { Outlet } from "react-router-dom";
import axios from "axios";
import Spinner from "../Spinner";
import { toast } from "react-toastify";

export default function AdminRoute(){
    const [ok,setOk] = useState(false)
    const[auth,setAuth] = useAuth();

    useEffect(()=>{
        const authCheck = async ()=>{
       
            try{const res = await axios.get(`${process.env.REACT_APP_API}/api/v1/auth/admin-auth`);
            if(res.data.ok){
                setOk(true);
            }else{
                setOk(false);
            }}catch(error){
                if(error.response && error.response.status >=400 && error.response.status <= 500){
                    toast.error(error.response.data.message);
                }
            }
        };
        if(auth?.token) authCheck();
    },[auth?.token]);

    return ok?<Outlet/> : <Spinner path="/"/>    
}
