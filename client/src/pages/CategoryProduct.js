import React, { useState, useEffect } from 'react';
import Layout from '../components/Layout/Layout';
import { useParams,useNavigate } from 'react-router-dom';
import axios from 'axios';


const CategoryProduct = () => {
    const params = useParams();
    const navigate = useNavigate();
    const [products, setProducts] = useState([]);
    const [category, setCategory] = useState([]);

    useEffect(() => {
        if (params?.slug === 'custom') 
        {
            navigate('/product/custom');
        }
        if(params?.slug) getPrductsByCat();
    }, [params?.slug]);
    const getPrductsByCat = async () => {
        try {
            const { data } = await axios.get(
                `${process.env.REACT_APP_API}/api/v1/product/product-category/${params.slug}`
            );
            setProducts(data?.products);
            setCategory(data?.category);
        } catch (error) {
        }
    };

    return (
        <Layout>
            <div className="container">
                <h4 className="text-center">Category - {category?.name}</h4>
                <div className="row">
                    <div className="d-flex flex-wrap">
                        {products?.map(p => (
                            <div className="card m-2" style={{ maxWidth: '18rem' }}>
                                <img src={require(process.env.REACT_APP_IMAGE_BASE_PATH2 + p.photo)} className="card-img-top" alt={p.name} />
                                <div className="card-body">
                                    <h5 className="card-title">{p.name}</h5>
                                    <p className="card-text">{p.description.substring(0, 10)}..</p>
                                    <p className="card-text">₹ {p.price}</p>
                                    <button
                                        className="btn btn-info ms-1"
                                        onClick={() => navigate(`/product/${p.slug}`)}
                                    >
                                        More Details
                                    </button>
                                    <button className='btn btn-secondary ms-1'>Add to cart</button>
                                </div>
                            </div>
                        ))
                        }
                    </div>
                </div>
            </div>
        </Layout>
    )
}

export default CategoryProduct
