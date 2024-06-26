import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import NavbarComponent from './components/Navbar';
import { Container } from 'react-bootstrap';
import {BrowserRouter, Routes, Route} from "react-router-dom";
import Cancel from './pages/Cancel';
import Store from './pages/Store';
import Success from './pages/Success';
import CartProvider from './context/CartContext';
import ProductDetailPage from './pages/ProductDetail';
import SignIn from './pages/SignIn';
import Account from './pages/Account';
import SignUp from './pages/Signup';
import Footer from './components/Footer';
import OrderHistory from './pages/OrderHistory'
import RegisterProduct from './pages/RegisterProduct';
import { AuthProvider } from './context/AuthContext';
import EditProductPage from './pages/EditProductPage';
import { useAuth } from './context/AuthContext';



function App() {  

  return (
    <AuthProvider> 
    <CartProvider>
    <Container>
    <BrowserRouter>
   
      <NavbarComponent > </NavbarComponent>

   
          <Routes>
            <Route index element={<Store/>} ></Route>
            <Route path = "success" element = {<Success/>} ></Route>
            <Route path = "cancel" element = {<Cancel/>} ></Route>
            <Route path="products/:productId" element={<ProductDetailPage />} />
            <Route path="auth/login" element={<SignIn />} />
            <Route path="auth/signup" element={<SignUp />} />
            <Route path={`auth/profile`} element={<Account />} />
            <Route path="register-product" element={<RegisterProduct />} />
            <Route path="orders/all-orders" element={<OrderHistory />} />
            <Route path="update-products/:productId" element={<EditProductPage />} />
          
          </Routes>
         
         <Footer> </Footer>
      </BrowserRouter>
    </Container>
    </CartProvider>
    
    </AuthProvider> 
  );
}

export default App
