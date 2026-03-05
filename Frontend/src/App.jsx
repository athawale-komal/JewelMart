import React, { useEffect } from 'react';
import { BrowserRouter, Route, Routes, useLocation } from 'react-router-dom';
import Header from './Components/Header';
import Footer from './Components/Footer';
import Home from './Pages/Home';
import NotFound from './Components/NotFound';
import OurProduct from './Pages/OurProducts';
import Login from './Pages/Login';
import ForgotPassword from './Pages/ForgotPassword';
import ResetPassword from './Pages/ResetPassword';
import AiStylist from './Pages/AiStylist';
import About from './Pages/About';
import Contact from './Pages/Contact';
import Orders from './Pages/Order';
import OrderHistory from './Pages/OrderHistory';
import Profile from './Pages/Profile';
import CategoryPage from './Pages/CategoryPage';
import ShippingPolicy from './Pages/ShippingPolicy';
import ReturnsExchanges from './Pages/ReturnsExchanges';
import DiamondEducation from './Pages/DiamondEducation';
import PrivacyPolicy from './Pages/PrivacyPolicy ';
import TermsOfService from './Pages/TermsOfService';
import Wishlist from './Pages/Wishlist';
import Cart from './Pages/Cart';
import Checkout from './Pages/Checkout';
import OrderSuccess from './Pages/OrderSuccess';
import PaymentSuccess from './Pages/PaymentSuccess';
import ProtectedRoutes from './Components/ProtectedRoutes';
import Layout from './Admin/Layout';
import Dashboard from './Admin/Dashboard/Dashboard';
import AdminProducts from './Admin/Products/AdminProducts';
import AdminOrders from './Admin/Orders/AdminOrders';
import AdminUsers from './Admin/Users/AdminUsers';
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { useDispatch, useSelector } from 'react-redux';
import { restoreAuth } from './States/Auth/Action';
import ProductDetail from './Pages/ProductDetails';
import { getCart } from './States/Cart/Action';
import { getWishlist } from './States/Wishlist/Action';


const App = () => {

  const dispatch = useDispatch();
  const location = useLocation();
  const authPages = ['/auth', '/forgot-password'];
  const isResetPassword = location.pathname.startsWith('/reset-password');
  const isSuccess = location.pathname === '/success' || location.pathname === '/payment-success';
  const isAdmin = location.pathname.startsWith('/admin');

  const hideLayout = authPages.includes(location.pathname) || isResetPassword || isSuccess || isAdmin;

  const auth = useSelector(state => state.auth);

  useEffect(() => {
    if (auth.jwt && !auth.user) {
      dispatch(restoreAuth());
    }
  }, [dispatch, auth.jwt, auth.user]);

  useEffect(() => {
    if (auth.user) {
      dispatch(getCart());
      dispatch(getWishlist());
    }
  }, [dispatch, auth.user]);

  return (
    <>
      {!hideLayout && <Header />}

      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/products' element={<OurProduct />} />
        {/* <Route path="/product/:id" element={<ProductDetail  />} /> */}
        <Route path='/ai-stylist' element={<AiStylist />} />
        <Route path='/about' element={<About />} />
        <Route path='/contact' element={<Contact />} />
        <Route path='/orders' element={<Orders />} />
        <Route path='/order-history' element={<OrderHistory />} />
        <Route path='/wishlist' element={<Wishlist />} />
        <Route path='/cart' element={<Cart />} />
        <Route path='/checkout' element={<Checkout />} />
        <Route path='/success' element={<OrderSuccess />} />
        <Route path='/payment-success' element={<PaymentSuccess />} />
        <Route path='/profile' element={<Profile />} />
        <Route path="/shipping-policy" element={<ShippingPolicy />} />
        <Route path="/returns-exchanges" element={<ReturnsExchanges />} />
        <Route path="/diamond-education" element={<DiamondEducation />} />
        <Route path="/privacy-policy" element={<PrivacyPolicy />} />
        <Route path="/terms-of-service" element={<TermsOfService />} />
        <Route path='/category/:category' element={<CategoryPage />} />
        <Route path="/auth" element={<Login />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/reset-password/:token" element={<ResetPassword />} />
        <Route path="/product/:id" element={<ProductDetail />} />
        <Route path="/admin/*" element={
          <ProtectedRoutes requiredRole='ADMIN'>
            <Layout />
          </ProtectedRoutes>
        } >
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="jwellery" element={<AdminProducts />} />
          <Route path="orders" element={<AdminOrders />} />
          <Route path="users" element={<AdminUsers />} />

        </Route>
        <Route path='*' element={<NotFound />} />
      </Routes>
      <ToastContainer />
      {!hideLayout && <Footer />}
    </>
  );
};

export default App;