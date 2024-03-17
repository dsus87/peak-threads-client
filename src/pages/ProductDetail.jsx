import React, { useEffect, useState, useContext } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { CartContext } from '../context/CartContext';
import { Button, Form, Container, Row, Col, Card } from 'react-bootstrap';
import { useAuth } from '../context/AuthContext'; // Importing the Auth context
import { useNavigate } from 'react-router-dom'; 



function ProductDetailPage() {
  const { productId } = useParams();
  console.log("productId", productId);
  const [product, setProduct] = useState(null);
  const [selectedSize, setSelectedSize] = useState('');
  const [error, setError] = useState('');
  const cart = useContext(CartContext);
  const navigate = useNavigate(); 


  const {token, userId, isAdmin  } = useAuth(); 
  console.log("isAdmin before request:", isAdmin);
  console.log("UserID", userId);


  useEffect(() => {
    const fetchProductDetails = async () => {
      try {
        const response = await axios.get(`https://peak-threads.onrender.com/products/${productId}`);
        setProduct(response.data);
      } catch (err) {
        setError('Failed to fetch product details. Please try again later.');
        console.error(err);
      }
    };

    fetchProductDetails();
  }, [productId]);

  const handleAddToCart = () => {
    if (!selectedSize) {
      alert('Please select a size.');
      return;
    }
    cart.addOneToCart(productId, selectedSize);
  };

  if (error) return <div>{error}</div>;
  if (!product) return <div>Loading...</div>;

  const handleDeleteProduct = async () => {
    if (window.confirm('Are you sure you want to delete this product?')) {
      try {
        await axios.delete(`https://peak-threads.onrender.com/products/delete-products/${productId}`, {
          headers: {
            'Authorization': `Bearer ${token}`        
          },
        });
        alert('Product successfully deleted.');
        navigate('/');

      } catch (error) {
        alert('Failed to delete the product.');
        console.error(error);
      }
    }
  };

  return (
    <section style={{ minHeight: '100vh' }}>
      <Container className="py-5">
        <Row className="d-flex justify-content-center">
          <Col xl={12}>
            <Card style={{ borderRadius: '2rem' }}>
              <Row className="g-0">
                <Col xs={12} md={5} lg={8} className=" order-md-0" >    

                  <img src={product.photo} alt={product.name} style={{ width: "100%", height: "auto", borderRadius: '2rem 2rem 2rem 2rem' }} />
                </Col>
                <Col md={4} lg={4} className="d-flex align-items-center">
                  <Card.Body className="p-4 p-lg-5 text-black">
                    <h2 className="fw-bold mb-0">{product.name}</h2>
                    <br></br>
                    <p>{product.description}</p>
                    <p style={{ fontWeight: 'bold', fontSize: '2rem' }}>{product.price} €</p>

                    <Form.Group as={Row} className="mb-3" controlId="sizeSelect">
                      <Form.Label column sm={2}>Size</Form.Label>
                      <Col sm={10}>
                        <Form.Control as="select" value={selectedSize} onChange={e => setSelectedSize(e.target.value)}>
                          <option value="">Select a size</option>
                          {Object.keys(product.quantity).map(size => (
                            <option key={size} value={size}>{size} ({product.quantity[size]} available)</option>
                          ))}
                        </Form.Control>
                      </Col>
                    </Form.Group>

                    {/* {product.sellerId && (
                      <div>
                        <h4>Seller Information</h4>
                        <p>Name: {product.sellerId.name}</p>
                      </div>
                    )} */}
                      <Button variant="dark" onClick={handleAddToCart}>Add to Cart</Button>
                    {isAdmin && (
                      <Button variant="danger" onClick={handleDeleteProduct} style={{ marginLeft: '10px' }}>Delete Product</Button>
                    )}               
                    
                    </Card.Body>
                </Col>
              </Row>
            </Card>
          </Col>
        </Row>
      </Container>
    </section>
  );
}

export default ProductDetailPage;
