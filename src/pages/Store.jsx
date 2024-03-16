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
        
            <MainCarousel> </MainCarousel>

            <div> 
                <button onClick={() => setSelectedCategory('Outerwear')}>Outerwear</button>
                <button onClick={() => setSelectedCategory('T-shirt')}>T-shirts</button>
                <button onClick={() => setSelectedCategory('Shoes')}>Shoes</button>
            </div>


            <br></br>
            <Row xs={1} md={3} className='g-1'>
        {products
            .filter(product => selectedCategory === '' || product.category === selectedCategory) 
            .map((product, index) => (
                <Col key={index} align="center">
                    <ProductCard product={product}/>    
                </Col>
            ))}
    </Row>
        </>
    );
}

export default Store;
