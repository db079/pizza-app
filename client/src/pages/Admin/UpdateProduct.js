import React, { useState, useEffect } from 'react';
import Layout from '../../components/Layout/Layout'
import AdminMenu from '../../components/Layout/AdminMenu'
import axios from 'axios';
import { Select } from 'antd';
import { Checkbox, Col, Row } from 'antd';
import { useNavigate,useParams } from "react-router-dom";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const { Option } = Select;

const UpdateProduct = () => {

    const navigate = useNavigate();
    const params  = useParams();

    const [categories, setCategories] = useState([]);
    const [category, setCategory] = useState("");
    const [name, setName] = useState("");
    const [photo, setPhoto] = useState("");
    const [description, setDescription] = useState("");
    const [baseList, setBaseList] = useState([]);
    const [base, setBase] = useState("");
    const [sauceList, setSauceList] = useState([]);
    const [sauce, setSauce] = useState("");
    const [cheeseList, setCheeseList] = useState([]);
    const [cheese, setCheese] = useState("");
    const [price, setPrice] = useState("");
    const [quantity, setQuantity] = useState("");
    const [shipping, setShipping] = useState("");
    const [veggiesList, setVeggiesList] = useState([])
    const [veggies, setVeggies] = useState([]);
    const [id,setId] = useState("");

    // GET SINGLE PRODUCT
    const getSingleProduct = async () => {
        try {
            const { data } = await axios.get(`${process.env.REACT_APP_API}/api/v1/product/get-product/${params.slug}`);
            if (data?.success) {
                setId(data.product._id);
                setName(data.product.name);
                setDescription(data.product.description);
                setBase(data.product.base._id);
                setSauce(data.product.sauce._id);
                setCheese(data.product.cheese._id);
                setVeggies(data.product.veggies._id)
                setPrice(data.product.price);
                setQuantity(data.product.quantity);
                setCategory(data.product.category._id);
            }
        } catch (error) {
            if (error.response && error.response.status >= 400 && error.response.status <= 500) {
                toast.error(error.response.data.message);
            } else {
                toast.error("something went wrong")
            }
        }
    };
    useEffect(()=>{
        getSingleProduct();
        // eslint-disable-next-line
    },[])

    // get all category
    const getAllCategory = async () => {
        try {
            const { data } = await axios.get(`${process.env.REACT_APP_API}/api/v1/category/get-category`);
            if (data?.success) {
                setCategories(data?.category);
            }
        } catch (error) {
            if (error.response && error.response.status >= 400 && error.response.status <= 500) {
                toast.error(error.response.data.message);
            } else {
                toast.error("something went wrong")
            }
        }
    };
    // to get all base
    const getAllBase = async () => {
        try {
            const { data } = await axios.get(`${process.env.REACT_APP_API}/api/v1/product/get-pizzaBase`);
            if (data?.success) {
                setBaseList(data?.base);
            }

        } catch (error) {
            if (error.response && error.response.status >= 400 && error.response.status <= 500) {
                toast.error(error.response.data.message);
            } else {
                toast.error("something went wrong")
            }
        }
    };
    // to get all sauce
    const getAllSauce = async () => {
        try {
            const { data } = await axios.get(`${process.env.REACT_APP_API}/api/v1/product/get-pizzaSauce`);
            if (data?.success) {
                setSauceList(data?.sauce);
            }
        } catch (error) {
            if (error.response && error.response.status >= 400 && error.response.status <= 500) {
                toast.error(error.response.data.message);
            } else {
                toast.error("something went wrong")
            }
        }
    }
    // get all cheese
    const getAllCheese = async () => {
        try {
            const { data } = await axios.get(`${process.env.REACT_APP_API}/api/v1/product/get-pizzaCheese`);
            if (data?.success) {
                setCheeseList(data?.cheese);
            }
        } catch (error) {
            if (error.response && error.response.status >= 400 && error.response.status <= 500) {
                toast.error(error.response.data.message);
            } else {
                toast.error("something went wrong")
            }
        }
    }
    // get all veggies
    const getAllVeggies = async () => {
        try {
            const { data } = await axios.get(`${process.env.REACT_APP_API}/api/v1/product/get-pizzaVeggies`);
            if (data?.success) {
                setVeggiesList(data?.veggies);
            }

        } catch (error) {
            if (error.response && error.response.status >= 400 && error.response.status <= 500) {
                toast.error(error.response.data.message);
            }
        }
    }

    useEffect(() => {
        getAllCategory();
        getAllBase();
        getAllSauce();
        getAllCheese();
        getAllVeggies();
    }, []);

    // Update product function
    const handleUpdate = async (e) => {
        e.preventDefault();
        try {
            const productData = new FormData();
            productData.append("name", name);
            productData.append("description", description);
            productData.append("price", price);
            productData.append("quantity", quantity);
            productData.append("photo", photo);
            productData.append("category", category);
            productData.append("base", base);
            productData.append("sauce", sauce);
            productData.append("cheese", cheese);
            productData.append("veggies", veggies);
            const { data } = await axios.put(`${process.env.REACT_APP_API}/api/v1/product/update-product/${id}`, productData);
            if (data?.success) {
                toast.success(data.message);
                setTimeout(() => {
                    navigate("/dashboard/admin/products");
               }, 1000);
              } else {
                toast.error(data.message)
              }
        } catch (error) {
            if (error.response && error.response.status >= 400 && error.response.status <= 500) {
                toast.error(error.response.data.message);
            }
        }
    }
    const handleDelete= async ()=>{
        try {
            let answer = window.prompt('Are you sure want to delete this product (yes or no) ? ');
            if(!answer) return 
            const {data} = await axios.delete(`${process.env.REACT_APP_API}/api/v1/product/delete-product/${id}`)
            if (data?.success) {
                toast.success(data.message);
                setTimeout(() => {
                    navigate("/dashboard/admin/products");
               }, 1000);
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
    <Layout title={'pizzapp - Upadate product'}>
            <div className=' m-3 p-3'>
                <div className="row">
                    <div className="col-md-3">
                        <AdminMenu />
                    </div>
                    <div className="col-md-9">
                        <h1>Update Products</h1>
                        <div className="m-1 w-75">
                            <Select
                                bordered={false}
                                placeholder="Select a category"
                                size="large"
                                showSearch
                                className="form-select mb-3"
                                onChange={(value) => {
                                    setCategory(value);
                                }}
                                value={category}
                            >
                                {categories?.map((c) => (
                                    <Option key={c._id} value={c._id}>
                                        {c.name}
                                    </Option>
                                ))}
                            </Select>
                            <div className="mb-3">
                                <label htmlFor="formFile" className="form-label">Upload photo here</label>
                                <input className="form-control" type="file" onChange={(e) => setPhoto(e.target.files[0])} name='photo' accept='image/*' id="formFile" />
                            </div>
                            <div className="mb-3">
                                {photo && (
                                    <div className="text-center">
                                        <img src={URL.createObjectURL(photo)} alt="product photo" height={'200px'} className='img img-responsive' />
                                    </div>
                                )}
                            </div>
                            <div className="mb-3">
                                <input
                                    type="text"
                                    value={name}
                                    placeholder="write a name"
                                    className="form-control"
                                    onChange={(e) => setName(e.target.value)}
                                />
                            </div>
                            <div className="mb-3">
                                <textarea
                                    type="text"
                                    value={description}
                                    placeholder="write a description"
                                    className="form-control"
                                    onChange={(e) => setDescription(e.target.value)}
                                />
                            </div>
                            {/* get base list */}
                            <Select
                                bordered={false}
                                placeholder="Select a pizza Base"
                                size="large"
                                className="form-select mb-3"
                                onChange={(value) => {
                                    setBase(value);
                                }}
                                value={base}
                            >
                                {baseList?.map((c) => (
                                    <Option key={c._id} value={c._id}>
                                        {c.name}
                                    </Option>
                                ))}
                            </Select>
                            {/* getting sauce list */}
                            <Select
                                bordered={false}
                                placeholder="Select a pizza sauce"
                                size="large"
                                className="form-select mb-3"
                                onChange={(value) => {
                                    setSauce(value);
                                }}
                                value={sauce}
                            >
                                {sauceList?.map((e) => (
                                    <Option key={e._id} value={e._id}>
                                        {e.name}
                                    </Option>
                                ))}
                            </Select>
                            {/* getting cheese list */}
                            <Select
                                bordered={false}
                                placeholder="Select a pizza cheese"
                                size="large"
                                className="form-select mb-3"
                                onChange={(value) => {
                                    setCheese(value);
                                }}
                                value={cheese}
                            >
                                {cheeseList?.map((e) => (
                                    <Option key={e._id} value={e._id}>
                                        {e.name}
                                    </Option>
                                ))}
                            </Select>
                            {/* get all vegires in checkbox format */}
                            <p>Select veggies from below list</p>
                            <Checkbox.Group
                                style={{ width: '100%' }}
                                onChange={(value) => setVeggies(value)}
                                value={veggies} // This sets the selected values based on the state
                                className='mb-3'
                            >
                                <Row>
                                    {veggiesList?.map((f) => (
                                        <Col span={8} key={f._id}>
                                            <Checkbox key={f._id} value={f._id}>{f.name}</Checkbox>
                                        </Col>
                                    ))}
                                </Row>
                            </Checkbox.Group>
                            <div className="mb-3">
                                <input
                                    type="number"
                                    value={price}
                                    placeholder="write a Price"
                                    className="form-control"
                                    onChange={(e) => setPrice(e.target.value)}
                                />
                            </div>
                            <div className="mb-3">
                                <input
                                    type="number"
                                    value={quantity}
                                    placeholder="write a quantity"
                                    className="form-control"
                                    onChange={(e) => setQuantity(e.target.value)}
                                />
                            </div>
                            <div className="mb-3">
                                <Select
                                    bordered={false}
                                    placeholder="Select Shipping "
                                    size="large"
                                    showSearch
                                    className="form-select mb-3"
                                    onChange={(value) => {
                                        setShipping(value);
                                    }}
                                    value={shipping ? "yes":"no"}
                                >
                                    <Option value="0">No</Option>
                                    <Option value="1">Yes</Option>
                                </Select>
                            </div>
                            <div className="mb-3">
                                <button className="btn btn-primary" onClick={handleUpdate}>
                                    UPDATE PRODUCT
                                </button>
                            </div>
                            <div className="mb-3">
                                <button className="btn btn-danger" onClick={handleDelete}>
                                    Delete PRODUCT
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Layout >
  )
}

export default UpdateProduct
