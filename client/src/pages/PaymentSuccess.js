import styles from './Auth/EmailVerify/styles.module.css';
import {useState,useEffect, Fragment} from 'react';
import Pagenotfound from './Pagenotfound';
import {Link,Params, useParams} from 'react-router-dom'
import axios from 'axios';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const PaymentSuccess = () => {
    const param = useParams();
    const id = param.razorpay_payment_id;
    toast.success("payment successfull")
  return (
    <>
        <div className={styles.container}>
            <img src="/images/success.png" alt="success" className={styles.success_img} />
            <h1 className='text-center'>
                Payment successfully 
            </h1>
            <span>payment successful with your payment ID : {id}</span>
            <p>please click here to see your orders</p>
            <Link to='/ '>
                <button className={styles.green_btn}>Home</button>
            </Link>
        </div>
  
</>
  )
}

export default PaymentSuccess
