import React, { useState, useEffect } from 'react'
import Layout from '../components/Layout/Layout';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';
import {Checkbox,Radio} from 'antd'
import { Prices } from '../components/Prices';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/cart';

const HomePage = () => {
  const navigate = useNavigate();
  const [cart,setCart] = useCart();
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [checked, setChecked] = useState([]);
  const [radio, setRadio] = useState([])
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);

  
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
  
  useEffect(() => {
    getAllCategory();
    getTotal();
  }, []);
  
  const getAllProduct = async () => {
    try {
      setLoading(true)
      const { data } = await axios.get(`${process.env.REACT_APP_API}/api/v1/product/product-list/${page}`);
      setLoading(false)
      setProducts(data.products);
    } catch (error) {
      setLoading(false)
      if (error.response && error.response.status >= 400 && error.response.status <= 500) {
        toast.error(error.response.data.message);
      }
    }
  }

  //getTOtal COunt
  const getTotal = async () => {
    try {
      const { data } = await axios.get(`${process.env.REACT_APP_API}/api/v1/product/product-count`);
      setTotal(data?.total);
    } catch (error) {    }
  };

  useEffect(()=>{
    if(page===1) return 
    loadMore(); 
  },[page])
  // load more 
  const loadMore  = async ()=>{
    try {
      setLoading(true)
      const { data } = await axios.get(`${process.env.REACT_APP_API}/api/v1/product/product-list/${page}`);
      setLoading(false)
      setProducts([...products, ...data?.products])
    } catch (error) {
    }
  }

  const handleFilter=(value,id)=>{
    let all =[...checked]
    if(value){
      all.push(id)
    }else{
      all = all.filter((c)=> c!==id)
    }
    setChecked(all);
  }

  useEffect(() => {
    if (!checked.length || !radio.length) getAllProduct();
  }, [checked.length, radio.length]);

  useEffect(() => {
    if (checked.length || radio.length) filterProduct();
  }, [checked, radio]);

  // product filter function
  const filterProduct = async ()=>{
    try {
      const {data} = await axios.post(`${process.env.REACT_APP_API}/api/v1/product/product-filter`, {
        checked,
        radio,
      });
      setProducts(data?.products);
    } catch (error) {
    }
  }

  return (
    <Layout title={'Home Page - pizz-app'}>
      <div className="container-fluid row pt-2">
        <div className="col-md-2">
          <h4 className='text-center'>Filter by Category</h4>
          <div className="d-flex flex-column">
            {
              categories?.map((c)=>(
                <Checkbox key={c._id} onChange={(e)=>handleFilter(e.target.checked,c._id)}>
                  {c.name}
                </Checkbox>
              ))
            }
          </div>
          {/* price filter */}
          <h4 className='text-center mt-4'>Filter by Price</h4>
          <div className="d-flex flex-column">
            <Radio.Group onChange={e=>setRadio(e.target.value)}>
            {
              Prices?.map((p)=>(
                <div key={p.id}>
                <Radio value={p.array}>{p.name}</Radio>
                </div>
              ))
            }
            </Radio.Group>
          </div>
          <div className="d-flex flex-column">
            <button className='btn btn-danger' onClick={()=>window.location.reload()}>Cleaar Filter</button>
          </div>
        </div>
        <div className="col-md-10">
          <h1 className="text-center">All products</h1>
          <div className="d-flex flex-wrap">
            {products?.map(p => (
                <div className="card m-2" style={{ maxWidth: '18rem' }}>
                  <img src={require(process.env.REACT_APP_IMAGE_BASE_PATH2 + p.photo)} className="card-img-top" alt={p.name} />
                  {/* <img src={require(`./../../../../uploads/${p.photo}`)}  className="card-img-top" alt="..." /> */}
                  <div className="card-body">
                    <h5 className="card-title">{p.name}</h5>
                    <p className="card-text">{p.description.substring(0, 10)}..</p>
                    <p className="card-text">₹ {p.price}</p>
                    {/* <a href="#" className="btn btn-primary">Go somewhere</a> */}
                    <button
                      className="btn btn-info ms-1"
                      onClick={() => navigate(`/product/${p.slug}`)}
                    >
                      More Details
                    </button>                    
                    <button className='btn btn-secondary ms-1'
                     onClick={()=>{
                      setCart([...cart,p]);
                      localStorage.setItem('cart',JSON.stringify([...cart,p]));
                      toast.success('Item added to cart');
                    }}>Add to cart</button>
                  </div>
                </div>
            ))
            }
          </div>
            <div className='m-2 p-3'>
              {products && products.length < total && (
                <button className='btn btn-warning' onClick={(e)=>{e.preventDefault(); setPage(page+1)}}>
                  {loading ? "Loading..." : "Load more"}
                </button>
              ) }
            </div>
        </div>
      </div>
    </Layout>
  )
}

export default HomePage
