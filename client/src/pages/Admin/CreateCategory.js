import React, { useEffect, useState } from 'react';
import Layout from '../../components/Layout/Layout'
import AdminMenu from '../../components/Layout/AdminMenu'
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios'
import CategoryForm from '../../components/Form/CategoryForm';
import { Modal } from 'antd'

const CreateCategory = () => {
    const [categories, setCategories] = useState([]);
    const [name,setName] = useState("");
    const [visible,setVisisble] = useState(false);
    const [selected , setSelected] = useState(null);
    const [updatedName,setUpdatedName] = useState("");


    const handleSubmit = async (e)=>{
        e.preventDefault();
        try {
            const {data} = await axios.post(`${process.env.REACT_APP_API}/api/v1/category/create-category`,{name});
            if(data?.success){
                toast.success(`${name} is created`);
                getAllCategroies();
            }else{
                toast.error(data.message)
            }
        } catch (error) {
            if(error.response && error.response.status >=400 && error.response.status <= 500){
                toast.error(error.response.data.message);
            }
        }
    }

    const getAllCategroies = async () => {
        try {
            const { data } = await axios.get(`${process.env.REACT_APP_API}/api/v1/category/get-category`);
            if (data.success) {
                setCategories(data.category);
            }
        } catch (error) {
            if(error.response && error.response.status >=400 && error.response.status <= 500){
                toast.error(error.response.data.message);
            }
        }
    };

    useEffect(() => {
        getAllCategroies();
    }, []);

    // update category
    const handleUpdate = async (e)=>{
        e.preventDefault();
        try {
            const {data} = await axios.put(`${process.env.REACT_APP_API}/api/v1/category/update-category/${selected._id}`,{name:updatedName})
            if(data?.success){
                toast.success(`${updatedName} is updated`);
                setSelected(null);
                setUpdatedName("")
                setVisisble(false);
                getAllCategroies();
            }else{
                toast.error(data.message)
            }
        } catch (error) {
            if(error.response && error.response.status >=400 && error.response.status <= 500){
                toast.error(error.response.data.message);
            }
        }
    }
    // delete category
    const handleDelete = async (id)=>{
        try {
            const {data} = await axios.delete(`${process.env.REACT_APP_API}/api/v1/category/delete-category/${id}`)
            if(data?.success){
                toast.success(data.message);
                getAllCategroies();
            }else{
                toast.error(data.message)
            }
        } catch (error) {
            if(error.response && error.response.status >=400 && error.response.status <= 500){
                toast.error(error.response.data.message);
            }
        }
    }

    return (
        <Layout title={'pizzapp - add category'}>
            <div className=' m-3 p-3'>
                <div className="row">
                    <div className="col-md-3">
                        <AdminMenu />
                    </div>
                    <div className="col-md-9">
                        <h1>Manage Category</h1>
                        <div className="p-3 w-50">
                            <CategoryForm handleSubmit={handleSubmit} value={name} setValue={setName}/>
                        </div>
                        <div className='w-75'>
                            <table className="table">
                                <thead>
                                    <tr>
                                        <th scope="col">Name</th>
                                        <th scope="col">Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    
                                        {categories?.map((c)=>(
                                            <>
                                            <tr>
                                            <td key={c._id}>{c.name}</td>
                                            <td>
                                                <button className='btn btn-primary ms-3' onClick={()=> {setVisisble(true); setUpdatedName(c.name); setSelected(c)}}>Edit</button>
                                                <button className='btn btn-danger ms-3' onClick={()=>handleDelete(c._id)}>Delete</button>
                                            </td>
                                            </tr>
                                            </>
                                        ))}
                                    
                                </tbody>
                            </table>
                        </div>
                    </div>
                    <Modal onCancel={()=>setVisisble(false)} footer={null} visible={visible}>
                        <CategoryForm value={updatedName} setValue={setUpdatedName} handleSubmit={handleUpdate}/>
                    </Modal>
                </div>
            </div>
        </Layout>
    )
}

export default CreateCategory
