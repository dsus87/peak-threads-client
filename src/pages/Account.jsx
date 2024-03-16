import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Container, Row, Col, Form, Button, Card, Alert } from 'react-bootstrap';
import { useAuth } from '../context/AuthContext';
import { Link } from 'react-router-dom';

function Account() {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [photo, setPhoto] = useState(null);
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const { token, userId } = useAuth(); // Access the token and userId from the context

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('username', username);
    formData.append('email', email);
    formData.append('name', name);
    if (password) formData.append('password', password);
    if (photo) formData.append('photo', photo);

    try {
      await axios.put(`https://peak-threads.onrender.com/auth/${userId}`, formData, {
        headers: {
          'Authorization': `Bearer ${token}`, // Include the token in the request header
        },
      });

      setFeedback('Profile updated successfully!'); // Set success message
    } catch (err) {
      setError(err.response ? err.response.data.message : 'Failed to update profile.');
    }
  };

  return (
    <section style={{ height: 'auto' }}>
      <Container className="py-5 h-100">
        <Row className="d-flex justify-content-center h-100">
          <Col xl={10}>
            <Card style={{ borderRadius: '1rem' }}>
              <Card.Body>
                <h2 className="text-center mb-4">Update Profile</h2>
                {error && <Alert variant="danger">{error}</Alert>}
                <Form onSubmit={handleSubmit}>
                  <Form.Group className="mb-3">
                    <Form.Label>Username</Form.Label>
                    <Form.Control type="text" placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)} />
                  </Form.Group>
                  
                  {/* <Form.Group className="mb-3">
                    <Form.Label>Email address</Form.Label>
                    <Form.Control type="email" placeholder="Enter email" value={email} onChange={(e) => setEmail(e.target.value)} />
                  </Form.Group> */}

                  <Form.Group className="mb-3">
                    <Form.Label>Name</Form.Label>
                    <Form.Control type="text" placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} />
                  </Form.Group>
{/* 
                  <Form.Group className="mb-3">
                    <Form.Label>New Password (optional)</Form.Label>
                    <Form.Control type="password" placeholder="New Password" onChange={(e) => setPassword(e.target.value)} />
                  </Form.Group>     */}

                  <Form.Group className="mb-3">
                    <Form.Label>Photo (optional)</Form.Label>
                    <Form.Control type="file" onChange={(e) => setPhoto(e.target.files[0])} />
                  </Form.Group>

                  <Button variant="dark" type="submit" className="btn-lg btn-block" >
                    Update Profile
                  </Button>
                </Form>
              
              </Card.Body>
            
          
            </Card>

            

          </Col>
       
        </Row>
      
      </Container>

      <Container className="h-100">
      <Row className="d-flex justify-content-center h-100">
        <Col xl={5}>
          <Card style={{ borderRadius: '1rem' }}>
            <Card.Body>
              <h2 className="text-center mb-4">Products</h2>

              <div className="mt-3 text-center">
                  <Link to="/register-product">Register Product</Link>
                </div>

                <div className="mt-3 text-center">
                  <Link to="/update-products/:productId">Edit and Delete </Link>
                </div>
              
            </Card.Body>


            
          </Card>

        </Col>

        <Col xl={5}>
          <Card style={{ borderRadius: '1rem' }}>
            <Card.Body>
              <h2 className="text-center mb-4">Order History</h2>
              <div className="mt-3 text-center">
              <Link to="/orders/all-orders">Order History</Link>
                </div>
            </Card.Body>


            
          </Card>

        </Col>
        
      </Row>
    </Container>
    

    
    
 
      
    </section>
  );
}

export default Account;
