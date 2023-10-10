import React, { useState, useEffect } from 'react'
import Layout from '../components/Layout/Layout'
import { useCart } from '../context/cart'
import { useAuth } from '../context/auth'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const CartPage = () => {
  const [auth, setAuth] = useAuth();
  const [loading, setLoading] = useState(false)
  const [cart, setCart] = useCart();
  const navigate = useNavigate();
  // const [isLoading, setIsLoading] = useState(false);


  //total price
  const totalPrice = () => {
    try {
      let total = 0;
      cart?.map((item) => {
        total = total + item.price;
      });
      return total.toLocaleString("en-US", {
        style: "currency",
        currency: "INR",
      });
    } catch (error) {
    }
  };
  //detele item
  const removeCartItem = (pid) => {
    try {
      let myCart = [...cart];
      let index = myCart.findIndex((item) => item._id === pid);
      myCart.splice(index, 1);
      setCart(myCart);
      localStorage.setItem("cart", JSON.stringify(myCart));
    } catch (error) {
    }
  };
  const handleCheckout = async () => {
    try {
      setLoading(true)
      const { data: { key } } = await axios.get(`${process.env.REACT_APP_API}/api/payment/getkey`);
      const { data: { order } } = await axios.post(`${process.env.REACT_APP_API}/api/payment/checkout`, {
        cart,
      });
      var options = {
        key: key, // Enter the Key ID generated from the Dashboard
        amount: order.amoutn, // Amount is in currency subunits. Default currency is INR. Hence, 50000 refers to 50000 paise
        currency: "INR",
        name: "Pizzapp",
        description: "Test Transaction",
        image: "https://www.shutterstock.com/shutterstock/photos/1901059681/display_1500/stock-vector-pizza-daily-fresh-vector-emblem-on-blackboard-pizza-logo-template-vector-emblem-for-cafe-1901059681.jpg",
        order_id: order.id, //This is a sample Order ID. Pass the `id` obtained in the response of Step 1
        callback_url: `${process.env.REACT_APP_API}/api/payment/verify`,
        prefill: {
          name: cart.name
        },
        notes: {
          "address": "Razorpay Corporate Office"
        },
      };
      const rzpor = new window.Razorpay(options);
      rzpor.open();
      // e.preventDefault();


        localStorage.removeItem("cart");
        setCart([]);
    } catch (error) {
      setLoading(false)
      if (error.response && error.response.status >= 400 && error.response.status <= 500) {
        toast.error(error.response.data.message); 
      }
    }
  }
  return (
    <Layout>
      <div className="container">
        <div className="row">
          <div className="col-md-12">
            <h1 className="text-center bg-light p-2 mb-1">
              {`Hello ${auth?.token && auth?.user?.name}`}
            </h1>
            <h4 className="text-center">
              {cart?.length
                ? `You Have ${cart.length} items in your cart ${auth?.token ? "" : "please login to checkout"
                }`
                : " Your Cart Is Empty"}
            </h4>
          </div>
        </div>
        <div className="row">
          <div className="col-md-8">
            {cart?.map((p) => (
              <div className="row mb-2 p-3 card flex-row">
                <div className="col-md-4">
                  <img src={require(process.env.REACT_APP_IMAGE_BASE_PATH2 + p.photo)} className="card-img-top" alt={p.name} />
                </div>
                <div className="col-md-8">
                  <p>{p.name}</p>
                  <p>{p.description.substring(0, 30)}</p>
                  <p>Price : {p.price}</p>
                  <button
                    className="btn btn-danger"
                    onClick={() => removeCartItem(p._id)}
                  >
                    Remove
                  </button>
                </div>
              </div>
            ))}
          </div>
          <div className="col-md-4 text-center">
            <h2>Cart Summary</h2>
            <p>Total | Checkout | Payment</p>
            <hr />
            <h4>Total : {totalPrice()} </h4>
            {auth?.user?.address ? (
              <>
                <div className="mb-3">
                  <h4>Current Address</h4>
                  <h5>{auth?.user?.address}</h5>
                  <button
                    className="btn btn-outline-warning"
                    onClick={() => navigate("/dashboard/user/profile")}
                  >
                    Update Address
                  </button>
                </div>
              </>
            ) : (
              <div className="mb-3">
                {auth?.token ? (
                  <button
                    className="btn btn-outline-warning"
                    onClick={() => navigate("/dashboard/user/profile")}
                  >
                    Update Address
                  </button>
                ) : (
                  <button
                    className="btn btn-outline-warning"
                    onClick={() =>
                      navigate("/login", {
                        state: "/cart",
                      })
                    }
                  >
                    Plase Login to checkout
                  </button>
                )}
              </div>
            )}
          </div>
          <div className="mt-2">
            <button
              className="btn btn-primary"
              onClick={handleCheckout}
              disabled={ !auth?.user?.address}
            >
              {loading ? "Processing ...." : "Make Payment"}
            </button>
            <h4 className='text-center'>
            {loading ? "please do not refresh page" : ""}</h4>
          </div>
        </div>
      </div>
    </Layout>
  )
}

export default CartPage
