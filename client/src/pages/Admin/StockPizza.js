import React, { useState } from 'react'
import AdminMenu from '../../components/Layout/AdminMenu';
import Layout from '../../components/Layout/Layout';
import StockMenu from './StockMenu';
import { useNavigate } from 'react-router-dom';

const StockPizza = () => {
  const navigate = useNavigate();
  return (
    <Layout title={'pizzapp - add stock'}>
      <div className=' m-3 p-3'>
        <div className="row">
          <div className="col-md-3">
            <AdminMenu/>
          </div>
          <div className="col-md-9 text-center">
            <h1 className='text-start'>Stock list</h1>
            <StockMenu/>
          </div>
        </div>

      </div>
    </Layout>
  )
}

export default StockPizza
