import React, { useEffect, useState } from 'react';
import Layout from '../../../components/Layout/Layout';
import AdminMenu from '../../../components/Layout/AdminMenu';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios'
import { Modal } from 'antd'
import StockMenu from '../StockMenu';

const CreateVeggies = () => {
    const [veggies, setVeggies] = useState([]);
    const [name, setName] = useState("");
    const [price, setPrice] = useState("");
    const [quantity, setQuantity] = useState("");
    const [visible, setVisisble] = useState(false);
    const [selected, setSelected] = useState(null);
    const [updatedName, setUpdatedName] = useState("");
    const [updatedPrice, setUpdatedPrice] = useState("");
    const [updatedQty, setUpdatedQty] = useState("");


    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const { data } = await axios.post(`${process.env.REACT_APP_API}/api/v1/product/create-pizzaVeggies`, {name:name,price:price,qty:quantity});
            if (data?.success) {
                toast.success(`${name} is created`);
                getAllVeggies();
                setName("");
                setPrice("");
                setQuantity("");
            } else {
                toast.error(data?.message)
            }
        } catch (error) {
            if (error.response && error.response.status >= 400 && error.response.status <= 500) {
                toast.error(error.response.data.message);
            }
        }
    }

    const getAllVeggies = async () => {
        try {
            const { data } = await axios.get(`${process.env.REACT_APP_API}/api/v1/product/get-pizzaVeggies`);
            if (data.success) {
                setVeggies(data?.veggies);
            }
        } catch (error) {
            if (error.response && error.response.status >= 400 && error.response.status <= 500) {
                toast.error(error.response.data.message);
            }
        }
    };

    useEffect(() => {
        getAllVeggies();
    }, []);

    // update category
    const handleUpdate = async (e) => {
        e.preventDefault();
        try {
            const { data } = await axios.put(`${process.env.REACT_APP_API}/api/v1/product/update-pizzaVeggies/${selected._id}`, {name:updatedName,price:updatedPrice,qty:updatedQty})
            if (data?.success) {
                toast.success(`${updatedName} is updated`);
                setSelected(null);
                setUpdatedName("")
                setUpdatedPrice("")
                setUpdatedQty("")
                setVisisble(false);
                getAllVeggies();
            } else {
                toast.error(data.message)
            }
        } catch (error) {
            if (error.response && error.response.status >= 400 && error.response.status <= 500) {
                toast.error(error.response.data.message);
            }
        }
    }
    // delete category
    const handleDelete = async (id) => {
        try {
            const { data } = await axios.delete(`${process.env.REACT_APP_API}/api/v1/product/delete-pizzaVeggies/${id}`)
            if (data?.success) {
                toast.success(data.message);
                getAllVeggies();
                
            } else {
                toast.error(data.message)
            }
        } catch (error) {
            if (error.response && error.response.status >= 400 && error.response.status <= 500) {
                toast.error(error.response.data.message);
            }
        }
    }

    return (
        <Layout title={'pizzapp - add Base'}>
            <div className=' m-3 p-3'>
                <div className="row">
                    <div className="col-md-3">
                        <AdminMenu />
                    </div>
                    <div className="col-md-9">
                        <StockMenu />
                        <h1>Manage Veggies</h1>
                        <div className="p-9 ms-1 w-50">
                            <form onSubmit={handleSubmit}>
                                <div className="mb-3">
                                    <input
                                        type="text"
                                        className="form-control"
                                        placeholder="Enter name of new Veggies"
                                        value={name}
                                        onChange={(e) => setName(e.target.value)}
                                    />
                                </div>
                                <div className="mb-3">
                                    <input
                                        type="text"
                                        className="form-control"
                                        placeholder="Enter the price"
                                        value={price}
                                        onChange={(e) => setPrice(e.target.value)}
                                    />
                                </div>
                                <div className="mb-3">
                                    <input
                                        type="text"
                                        className="form-control"
                                        placeholder="Enter the quantity"
                                        value={quantity}
                                        onChange={(e) => setQuantity(e.target.value)}
                                    />
                                </div>
                                <button type='submit' className='btn btn-primary'>submit</button>
                            </form>
                        </div>
                        <div className='w-75'>
                            <table className="table">
                                <thead>
                                    <tr>
                                        <th scope="col">Name</th>
                                        <th scope="col">Quantity</th>
                                        <th scope="col">price</th>
                                        <th scope="col">Actions</th>
                                    </tr>
                                </thead>
                                <tbody>

                                    {veggies?.map((c) => (
                                        <>
                                            <tr>
                                                <td key={c._id}>{c.name}</td>
                                                <td>{c.quantityAvailable}</td>
                                                <td>{c.price}</td>
                                                <td>
                                                    <button className='btn btn-primary mb-3  ms-3' onClick={() => { setVisisble(true); setUpdatedName(c.name);setUpdatedPrice(c.price); setUpdatedQty(c.quantityAvailable); setSelected(c) }}>Edit</button>
                                                    <button className='btn btn-danger mb-3 ms-3' onClick={() => handleDelete(c._id)}>Delete</button>
                                                </td>
                                            </tr>
                                        </>
                                    ))}

                                </tbody>
                            </table>
                        </div>
                    </div>
                    <Modal onCancel={() => setVisisble(false)} footer={null} visible={visible}>
                        {/* <BaseForm value={updatedName} setValue={setUpdatedName} handleSubmit={handleUpdate} /> */}
                        <form onSubmit={handleUpdate}>
                                <div className="mb-3">
                                    <input
                                        type="text"
                                        className="form-control"
                                        placeholder="Enter name of new Base"
                                        value={updatedName}
                                        onChange={(e) => setUpdatedName(e.target.value)}
                                    />
                                </div>
                                <div className="mb-3">
                                    <input
                                        type="text"
                                        className="form-control"
                                        placeholder="Enter the price"
                                        value={updatedPrice}
                                        onChange={(e) => setUpdatedPrice(e.target.value)}
                                    />
                                </div>
                                <div className="mb-3">
                                    <input
                                        type="text"
                                        className="form-control"
                                        placeholder="Enter the quantity"
                                        value={updatedQty}
                                        onChange={(e) => setUpdatedQty(e.target.value)}
                                    />
                                </div>
                                <button type='submit' className='btn btn-primary'>submit</button>
                            </form>
                    </Modal>
                </div>
            </div>
        </Layout>
    )
}

export default CreateVeggies

