import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Container, Row, Col, Form, Button, Card, Alert } from 'react-bootstrap';
import { useAuth } from '../context/AuthContext';


const RegisterProduct = () => {
      // State variables for product information

  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [gender, setGender] = useState('Unisex');
  const [category, setCategory] = useState('Outerwear');
  const [photo, setPhoto] = useState(null);
  const [brand, setBrand] = useState('');
  const [stripeId, setStripeId] = useState('');
  const [quantityS, setQuantityS] = useState(0);
  const [quantityM, setQuantityM] = useState(0);
  const [quantityL, setQuantityL] = useState(0);

  // State variables for form handling
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  // Get user context and navigation functionality
  const { token, userId, isAdmin } = useAuth(); 
  const navigate = useNavigate();

  console.log("isAdmin before request:", isAdmin);
  console.log("UserID", userId);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!isAdmin) {
      setError('Only admins are allowed to register a product.');
      return; // Stop the form submission if not an admin
    }

    setIsLoading(true);


    try {
      const formData = new FormData();
      formData.append('name', name);   
      formData.append('description', description);
      formData.append('price', price);
      formData.append('gender', gender);
      formData.append('category', category);
      formData.append('quantity[S]', quantityS);
      formData.append('quantity[M]', quantityM);
      formData.append('quantity[L]', quantityL);
      formData.append('stripeId', stripeId);
      formData.append('photo', photo);
      formData.append('brand', brand);
     
      console.log('Form data:')
      const config = {
        headers: {
          Authorization: `Bearer ${token}`, 
          'Content-Type': 'multipart/form-data', 
        },
      };

      const response = await axios.post(
        `https://peak-threads.onrender.com/products/register-products`,
        formData,
        config
      );
      console.log('Axios config:', config);

      console.log(response.data);
      setIsLoading(false);
      navigate('/'); // Redirect to products list on success
    } catch (error) {
      console.error('Error registering product:', error);
      setIsLoading(false);
      setError('Failed to register product. Please try again.');
    }
  };

  return (
    <section style={{ height: '100vh' }}>
      <Container className="py-5 h-100">
        <Row className="d-flex justify-content-center align-items-center h-100">
          <Col xl={10}>
            <Card style={{ borderRadius: '1rem' }}>
              <Card.Body>
                <h2 className="text-center mb-4">Register Product</h2>
                {error && <Alert variant="danger">{error}</Alert>}
                <Form onSubmit={handleSubmit}>

                  <Form.Group className="mb-3">
                    <Form.Label>Product Name:</Form.Label>
                    <Form.Control type="text" value={name} onChange={(e) => setName(e.target.value)} required />
                  </Form.Group>

                  <Form.Group className="mb-3">
                    <Form.Label>Description:</Form.Label>
                    <Form.Control as="textarea" rows={3} value={description} onChange={(e) => setDescription(e.target.value)} required />
                  </Form.Group>

                  <Form.Group className="mb-3">
                    <Form.Label>Price:</Form.Label>
                    <Form.Control type="number" value={price} onChange={(e) => setPrice(e.target.value)} required />
                  </Form.Group>

                  <Form.Group className="mb-3">
                    <Form.Label>Gender:</Form.Label>
                    <Form.Select value={gender} onChange={(e) => setGender(e.target.value)}>
                      <option value="Male">Male</option>
                      <option value="Female">Female</option>
                      <option value="Unisex">Unisex</option>
                    </Form.Select>
                  </Form.Group>

                  <Form.Group className="mb-3">
                    <Form.Label>Category:</Form.Label>
                    <Form.Select value={category} onChange={(e) => setCategory(e.target.value)}>
                      <option value="Shoes">Shoes</option>
                      <option value="T-shirt">T-shirt</option>
                      <option value="Outerwear">Outerwear</option>
                    </Form.Select>
                  </Form.Group>

                  <Form.Group className="mb-3">
                    <Form.Label>Brand:</Form.Label>
                    <Form.Control type="text" value={brand} onChange={(e) => setBrand(e.target.value)} required />
                  </Form.Group>

                  <Form.Group className="mb-3">
                    <Form.Label>Stripe Id</Form.Label>
                    <Form.Control type="text" value={stripeId} onChange={(e) => setStripeId(e.target.value)} required />
                  </Form.Group>

                  <Form.Group className="mb-3">
                    <Form.Label>Quantity S:</Form.Label>
                    <Form.Control type="number" value={quantityS} onChange={(e) => setQuantityS(e.target.value)} required />
                  </Form.Group>

                  <Form.Group className="mb-3">
                    <Form.Label>Quantity M:</Form.Label>
                    <Form.Control type="number" value={quantityM} onChange={(e) => setQuantityM(e.target.value)} required />
                  </Form.Group>

                  <Form.Group className="mb-3">
                    <Form.Label>Quantity L:</Form.Label>
                    <Form.Control type="number" value={quantityL} onChange={(e) => setQuantityL(e.target.value)} required />
                  </Form.Group>

                  <Form.Group className="mb-3">
                    <Form.Label>Photo:</Form.Label>
                    <Form.Control type="file" accept="image/*" onChange={(e) => setPhoto(e.target.files[0])} />
                  </Form.Group>

                  <Button variant="primary" type="submit" disabled={isLoading}>
                    {isLoading ? 'Registering...' : 'Register Product'}
                  </Button>

                </Form>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default RegisterProduct;
