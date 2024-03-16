import React, { useState, useEffect } from 'react';
import { Row, Col } from 'react-bootstrap';
import axios from 'axios';
import ProductCard from '../components/ProductCard';
import MainCarousel from '../components/Carousel';

function Store() {
    const [products, setProducts] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState(''); 

    const fetchProducts = async () => {
        try {
            const response = await axios.get('https://peak-threads.onrender.com/products/products'); 

            setProducts(response.data);
        } catch (error) {
            console.error("There was an error fetching the products: ", error);
        }
    };

    // useEffect to run fetchProducts on component 
    useEffect(() => {
        fetchProducts();
    }, []); 

    return (
    
<>
  <div className="container">
    <MainCarousel />
  </div>

  <div className="container">
    <div className="row pt-3">
      <div className="col-4">
        <button className="btn btn-dark w-100 btn-lg  font-weight-bold" onClick={() => setSelectedCategory('Outerwear')}>Outerwear</button>
      </div>
      <div className="col-4">
        <button className="btn btn-dark w-100 btn-lg  font-weight-bold" onClick={() => setSelectedCategory('T-shirts')}>T-shirts</button>
      </div>

      <div className="col-4">
        <button className="btn btn-dark w-100 btn-lg  font-weight-bold" onClick={() => setSelectedCategory('T-shirts')}>Shoes</button>
      </div>
      
    </div>
  </div>

  <br />

  <div className="container">
    <Row xs={1} md={3} className="g-4">
      {products
        .filter(product => selectedCategory === '' || product.category === selectedCategory)
        .map((product, index) => (
          <Col key={index} align="center">
            <ProductCard product={product}/>
          </Col>
        ))}
    </Row>
  </div>
</>
    );
}

export default Store;
