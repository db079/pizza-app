import Layout from '../../components/Layout/Layout';
import React, { useState, useEffect } from 'react';
import AdminMenu from '../../components/Layout/AdminMenu';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';
import { Link } from 'react-router-dom'


const Products = () => {
  const [product, setProduct] = useState([]);
  const getAllProduct = async () => {
    try {
      const { data } = await axios.get(`${process.env.REACT_APP_API}/api/v1/product/get-product`);
      setProduct(data.product);
    } catch (error) {
      if (error.response && error.response.status >= 400 && error.response.status <= 500) {
        toast.error(error.response.data.message);
      }
    }
  }

  // lifecycle method
  useEffect(() => {
    getAllProduct();
  }, [])
  return (
    <Layout>
      <div className="row">
        <div className="col-md-3">
          <AdminMenu />
        </div>
        <div className="col-md-9">
          <h1 className='text-center' style={{paddingTop:'1rem'}}>All product list</h1>
          <div class="container d-flex flex-wrap mt-4 p-4">
            {product?.map(p => (
              <Link to={`/dashboard/admin/product/${p.slug}`} className='product-link'>
                <div className="card m-2" style={{ maxWidth: '18rem' }}>
                  <img src={require(process.env.REACT_APP_IMAGE_BASE_PATH + p.photo)} className="card-img-top" alt={p.name} />
                  <div className="card-body">
                    <h5 className="card-title">{p.name}</h5>
                    <p className="card-text">{p.description}</p>
                    <a href="#" className="btn btn-primary">Go somewhere</a>
                  </div>
                </div>
              </Link>
            ))
            }
          </div>
        </div>
      </div>
    </Layout>
  )
}

export default Products
