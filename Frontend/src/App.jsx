import React, { useEffect } from 'react';
import { BrowserRouter, Route, Routes, useLocation } from 'react-router-dom';
import Header from './Components/Header';
import Footer from './Components/Footer';
import Home from './Pages/Home';
import NotFound from './Components/NotFound';
import OurProduct from './Pages/OurProducts';
import Login from './Pages/Login';
import AiStylist from './Pages/AiStylist';
import About from './Pages/About';
import Contact from './Pages/Contact';
import Orders from './Pages/Order';
import Profile from './Pages/Profile';
import CategoryPage from './Pages/CategoryPage';
import ShippingPolicy from './Pages/ShippingPolicy';
import ReturnsExchanges from './Pages/ReturnsExchanges';
import DiamondEducation from './Pages/DiamondEducation';
import PrivacyPolicy from './Pages/PrivacyPolicy ';
import TermsOfService from './Pages/TermsOfService';
import Wishlist from './Pages/Wishlist';
import ProtectedRoutes from './Components/ProtectedRoutes';
import Layout from './Admin/Layout';
import Dashboard from './Admin/Dashboard/Dashboard';
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { useDispatch, useSelector } from 'react-redux';
import { restoreAuth } from './states/Auth/Action';
// import ProductDetail from './Pages/ProductDetail';


const App = () => {

  const dispatch = useDispatch();
  const location = useLocation();
  const hideLayout = location.pathname === '/auth' || location.pathname.startsWith('/admin');

  const auth = useSelector(state => state.auth);

  useEffect(() => {
    if (auth.jwt && !auth.user) {
      dispatch(restoreAuth());
    }
  }, [dispatch, auth.jwt, auth.user]);


  return (
    <>
       {!hideLayout && <Header cartCount={"0"} />}

      <Routes>
        <Route path='/' element={<Home  />} />
        <Route path='/products' element={<OurProduct  />} />
        {/* <Route path="/product/:id" element={<ProductDetail  />} /> */}
        <Route path='/ai-stylist' element={<AiStylist />} />
        <Route path='/about' element={<About />} />
        <Route path='/contact' element={<Contact />} />
        <Route path='/orders' element={<Orders />} />
        <Route path='/wishlist' element={<Wishlist />} />
        <Route path='/profile' element={<Profile />} />
        <Route path="/shipping-policy" element={<ShippingPolicy />} />
        <Route path="/returns-exchanges" element={<ReturnsExchanges />} />
        <Route path="/diamond-education" element={<DiamondEducation />} />
        <Route path="/privacy-policy" element={<PrivacyPolicy />} />
        <Route path="/terms-of-service" element={<TermsOfService />} />
        <Route path='/category/:category' element={<CategoryPage />} />
        <Route path="/auth" element={<Login />} />
        <Route path="/admin/*" element={
            <ProtectedRoutes requiredRole='ADMIN'>
              <Layout />
            </ProtectedRoutes>
        } >
          <Route path="dashboard" element={<Dashboard />} />

        </Route>
        <Route path='*' element={<NotFound />} />
      </Routes>
<ToastContainer/>
      {!hideLayout && <Footer />}
    </>
  );
};

export default App;