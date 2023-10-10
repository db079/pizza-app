import styles from './styles.module.css';
import {useState,useEffect, Fragment} from 'react'
import Pagenotfound from '../../Pagenotfound';
import {Link,Params, useParams} from 'react-router-dom'
import axios from 'axios';
import Layout from '../../../components/Layout/Layout';


const EmailVerify=()=>{
    const [validUrl,setValidurl] = useState(false);
    const param = useParams();

    useEffect(()=>{
        const verifyEmailurl = async () =>{
            try {
                const url = `${process.env.REACT_APP_API}/api/v1/auth/${param.id}/verify/${param.token}`;
                const  {data} = await axios.get(url);
                console.log(data);
                setValidurl(true)

            } catch (error) {
                console.log(error)
                setValidurl(false)
            }
        };
        verifyEmailurl();
    },[param])

    return (
        <>
            {validUrl?(
                <div className={styles.container}>
                    <img src="/images/success.png" alt="success" className={styles.success_img} />
                    <h1 className='text-center'>
                        Email veryfied successfully 
                    </h1>
                    <Link to='/login'>
                        <button className={styles.green_btn}>Login</button>
                    </Link>
                </div>
            ):(
                <Pagenotfound/>
            )}
        </>
    );
};
export default EmailVerify