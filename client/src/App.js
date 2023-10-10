import './App.css';
import {Routes,Route} from 'react-router-dom'
import HomePage from './pages/HomePage';
import About from './pages/About';
import Policy from './pages/Policy';
import Pagenotfound from './pages/Pagenotfound';
import Contact from './pages/Contact';
import Register from './pages/Auth/Register';
import Login from './pages/Auth/Login';
import EmailVerify from './pages/Auth/EmailVerify/index';
import PrivateRoute from './components/Routes/Private';
import Dashboard from './pages/user/Dashboard';
import ForgotPasssword from './pages/Auth/ForgotPassword';
import AdminDashboard from './pages/Admin/AdminDashboard';
import AdminRoute from './components/Routes/AdminRoute';
import Users from './pages/Admin/Users';
import CreateCategory from './pages/Admin/CreateCategory';
import CreateProduct from './pages/Admin/CreateProduct';
import Profile from './pages/user/Profile';
import Orders from './pages/user/Orders';
import StockPizza from './pages/Admin/StockPizza';
import Products from './pages/Admin/Products';
import UpdateProduct from './pages/Admin/UpdateProduct';
import ProductDetails from './pages/ProductDetails';
import Categories from './pages/Categories';
import CategoryProduct from './pages/CategoryProduct';
import CustomPizza from './pages/CustomPizza';
import CreateBase from './pages/Admin/Stocks/CreateBase';
import CreateSauce from './pages/Admin/Stocks/CreateSauce';
import CreateCheese from './pages/Admin/Stocks/CreateCheese';
import CreateVeggies from './pages/Admin/Stocks/CreateVeggies';
import CartPage from './pages/CartPage';
import PaymentSuccess from './pages/PaymentSuccess';
import AdminOrders from './pages/Admin/AdminOrders';


function App() {
    return (
    <>
      <Routes>
        <Route exact path='/' element={<HomePage/>}/>
        <Route exact path='/paymentSuccess/:razorpay_payment_id' element={<PaymentSuccess/>}/>
        <Route exact path='/product/:slug' element={<ProductDetails/>}/>
        <Route exact path='/product/custom' element={<CustomPizza/>}/>
        <Route exact path='/categories' element={<Categories/>}/>
        <Route exact path='/cart' element={<CartPage/>}/>
        <Route exact path='/category/:slug' element={<CategoryProduct/>}/>
        <Route exact path='/register' element={<Register/>}/>
        <Route exact path='/login' element={<Login/>}/>
        <Route exact path='/about' element={<About/>}/>
        <Route exact path='/forgot-password' element={<ForgotPasssword/>}/>
        <Route exact path='/contact' element={<Contact/>}/>
        <Route exact path='/Policy' element={<Policy/>}/>
        <Route exact path='/:id/verify/:token' element={<EmailVerify/>}/>
        <Route exact path='/*' element={<Pagenotfound/>}/>
        <Route exact path='/dashboard' element={<PrivateRoute/>}>
          <Route path='user' element={<Dashboard/>}/>
          <Route path='user/profile' element={<Profile/>}/>
          <Route path='user/orders' element={<Orders/>}/>
        </Route>
        <Route exact path='/dashboard' element={<AdminRoute/>}>
          <Route path='admin' element={<AdminDashboard/>}/>
          <Route path='admin/add-product' element={<CreateProduct/>}/>
          <Route path='admin/product/:slug' element={<UpdateProduct/>}/>
          <Route path='admin/products' element={<Products/>}/>
          <Route path='admin/add-category' element={<CreateCategory/>}/>
          <Route path='admin/add-stock' element={<StockPizza/>}/>
          <Route path='admin/stock/base' element={<CreateBase/>}/>
          <Route path='admin/stock/sauce' element={<CreateSauce/>}/>
          <Route path='admin/stock/cheese' element={<CreateCheese/>}/>
          <Route path='admin/stock/veggies' element={<CreateVeggies/>}/>
          <Route path='admin/users' element={<Users/>}/>
          <Route path='admin/orders' element={<AdminOrders/>}/>
        </Route>
      </Routes>
    </>
    );
}

export default App;
