import React, { useEffect, useState } from 'react'
import Layout from './../components/Layout/Layout'
import axios from 'axios';
import { useParams, useSearchParams } from 'react-router-dom';

const ProductDetails = () => {
  const params = useParams();
  const [product, setProduct] = useState({});

  useEffect(() => {
   getProduct();
// eslint-disable-next-line  
  },[])

  const getProduct = async () => {
    try {
      const { data } = await axios.get(`${process.env.REACT_APP_API}/api/v1/product/get-product/${params.slug}`)
      setProduct(data?.product);
    } catch (error) {
    }
  }

  return (
    <Layout>
        {/* {JSON.stringify(product,null,4)} */}
      <div className="row container mt-3">
        <div className="col-md-6 mt-5" >
          <img style={{borderRadius:'15px'}} src={require(process.env.REACT_APP_IMAGE_BASE_PATH2 + product?.photo)} className="card-img-top" alt={product.name} />
        </div>
        <div className="col-md-6">
          <h1 className="text-center">Product Details</h1>
          <hr />
          <h6>Name : {product?.name}</h6>
          <h6>Description : {product?.description}</h6>
          <h6>Category : {product?.category?.name}</h6>
          <h6>Price : {product.price} ₹</h6>
          <h6 style={{ textDecoration: 'line-through' }}>MRP : {product?.price + product?.price * 0.1} ₹</h6>
          <button className='btn btn-secondary ms-1'>Add to cart</button>
          <table className="table mt-5">
            <thead>
              <tr>
                <th scope="col">#</th>
                <th scope="col">item</th>
                <th scope="col">name</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <th scope="row">1</th>
                <td>Base</td>
                <td>{product?.base?.name}</td>
              </tr>
              <tr>
                <th scope="row">2</th>
                <td>Sauce</td>
                <td>{product?.sauce?.name}</td>
              </tr>
              <tr>
                <th scope="row">3</th>
                <td>Cheese</td>
                <td>{product?.cheese?.name}</td>
              </tr>
            </tbody>
          </table>

        </div>
      </div>

    </Layout>
  )
}

export default ProductDetails
