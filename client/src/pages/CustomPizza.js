import React, { useState, useEffect } from 'react';
import Layout from '../components/Layout/Layout'
import { Select } from 'antd';
import { Checkbox, Col, Row } from 'antd';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';
const { Option } = Select;


const CustomPizza = () => {
    const [description, setDescription] = useState("");
    const [baseList, setBaseList] = useState([]);
    const [base, setBase] = useState("");
    const [sauceList, setSauceList] = useState([]);
    const [sauce, setSauce] = useState("");
    const [cheeseList, setCheeseList] = useState([]);
    const [cheese, setCheese] = useState("");
    const [veggiesList, setVeggiesList] = useState([])
    const [veggies, setVeggies] = useState([]);
    const [price, setPrice] = useState(0);
    const [quantity, setQuantity] = useState();


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


    const handleGetFare = () => {
        // Calculate the total price based on selected options
        let totalPrice = 0;
    
        // Calculate the base price
        const selectedBase = baseList.find(item => item._id === base);
        if (selectedBase) {
            totalPrice += selectedBase.price;
        }
    
        // Calculate the sauce price
        const selectedSauce = sauceList.find(item => item._id === sauce);
        if (selectedSauce) {
            totalPrice += selectedSauce.price;
        }
    
        // Calculate the cheese price
        const selectedCheese = cheeseList.find(item => item._id === cheese);
        if (selectedCheese) {
            totalPrice += selectedCheese.price;
        }
    
        // Calculate the veggies price
        veggies.forEach(veggieId => {
            const selectedVeggie = veggiesList.find(item => item._id === veggieId);
            if (selectedVeggie) {
                totalPrice += selectedVeggie.price;
            }
        });
    
        // Multiply by quantity if it's provided
        if (quantity) {
            totalPrice *= parseInt(quantity, 10);
        }
    
        // Update the price state
        setPrice(totalPrice);
    };
    
    

    useEffect(() => {
        getAllBase();
        getAllSauce();
        getAllCheese();
        getAllVeggies();
    }, []);
    return (
        <Layout>
            <div className="container mt-2">
                <h4 className="text-center">Category - Custom Pizza</h4>
                <h4>Select details for custom order</h4>
                {/* get base */}
                <div className="mb-3">
                    <label className='form-label'>Choose base</label>
                    <Select
                        bordered={false}
                        placeholder="Select a pizza Base"
                        size="large"
                        className="form-select mb-3"
                        onChange={(value) => {
                            setBase(value);

                        }}
                    >
                        {baseList?.map((c) => (
                            <Option key={c._id} value={c._id}>
                                {c.name} - ₹ {c.price}
                            </Option>
                        ))}
                    </Select>
                </div>
                {/* sauce list */}
                <div className="mb-3">
                    <label className='form-label'>Choose Sauce</label>
                    <Select
                        bordered={false}
                        placeholder="Select a pizza sauce"
                        size="large"
                        className="form-select mb-3"
                        onChange={(value) => {
                            setSauce(value);
                        }}
                    >
                        {sauceList?.map((e) => (
                            <Option key={e._id} value={e._id}>
                                {e.name} - ₹ {e.price}
                            </Option>
                        ))}
                    </Select>
                </div>
                {/* cheese list */}
                <div className="mb-3">
                    <label className='form-label'>Choose Cheese</label>
                    <Select
                        bordered={false}
                        placeholder="Select a pizza cheese"
                        size="large"
                        className="form-select mb-3"
                        onChange={(value) => {
                            setCheese(value);
                        }}
                    >
                        {cheeseList?.map((e) => (
                            <Option key={e._id} value={e._id}>
                                {e.name} - ₹ {e.price}
                            </Option>
                        ))}
                    </Select>
                </div>
                {/* veggies list */}
                <div className="mb-3">
                    <label className='form-label'>Select veggies</label>
                    <Checkbox.Group
                        style={{ width: '100%' }}
                        value={veggies} // This sets the selected values based on the state
                        onChange={(value) => setVeggies(value)}
                        className='mb-3'
                    >
                        <Row>
                            {veggiesList?.map((f) => (
                                <Col span={8} key={f._id}>
                                    <Checkbox key={f._id} value={f._id}>{f.name} - ₹ {f.price}</Checkbox>
                                </Col>
                            ))}
                        </Row>
                    </Checkbox.Group>
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
                <div className="mb-3">
                    <input
                        type="number"
                        value={quantity}
                        placeholder="write a quantity"
                        className="form-control"
                        onChange={(e) => setQuantity(e.target.value)}
                    />
                </div>
                <div className="d-flex justify-content-between">
                    <button type="button" class="btn btn-outline-primary ms-1" onClick={handleGetFare}>{price?price:'Get Fare'}</button>
                     <button className='btn btn-danger' onClick={()=>window.location.reload()}>Cleaar Filter</button>
                 </div>
                <button className='btn btn-secondary m-1'>Add to cart</button>
            </div>
        </Layout>
    )
}

export default CustomPizza


