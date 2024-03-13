import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Container, Row, Col, Form, Button, Card, Alert } from 'react-bootstrap';
import { Link } from 'react-router-dom';

function SignUp() {
  const [username, setUsername] = useState('');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isAdmin, setIsAdmin] = useState(false);
  const [error, setError] = useState('');

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await axios.post('https://peak-threads.onrender.com/auth/signup', {
        username,
        name,
        email,
        password,
        isAdmin,
      });

      // Redirect to login page or home page after successful signup
      navigate('/');
    } catch (err) {
      setError(err.response ? err.response.data.message : 'Signup failed');
    }
  };

  return (
    <section style={{ height: '100vh' }}>
      <Container className="py-5 h-100">
        <Row className="d-flex justify-content-center h-100">
          <Col xl={10}>
            <Card style={{ borderRadius: '2rem' }}>
              <Row className="g-0">
                <Col md={6} lg={5} className="d-none d-md-block">
                  {/* Placeholder for potential imagery or additional content */}
                </Col>
                <Col md={6} lg={7} className="d-flex align-items-center">
                  <Card.Body className="p-4 p-lg-5 text-black">
                    <Form onSubmit={handleSubmit}>
                      <div className="d-flex align-items-center mb-3 pb-1">
                        <span className="h1 fw-bold mb-0">Sign Up</span>
                      </div>
                      {error && <Alert variant="danger">{error}</Alert>}
                      {/* Form inputs for sign up */}
                      <Form.Group className="form-outline mb-4">
                        <Form.Control type="text" value={username} onChange={(e) => setUsername(e.target.value)} />
                        <Form.Label>Username</Form.Label>
                      </Form.Group>

                      <Form.Group className="form-outline mb-4">
                        <Form.Control type="text" value={name} onChange={(e) => setName(e.target.value)} />
                        <Form.Label>Name</Form.Label>
                      </Form.Group>

                      <Form.Group className="form-outline mb-4">
                        <Form.Control type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
                        <Form.Label>Email address</Form.Label>
                      </Form.Group>

                      <Form.Group className="form-outline mb-4">
                        <Form.Control type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
                        <Form.Label>Password</Form.Label>
                      </Form.Group>

                      <Button variant="dark" type="submit" className="btn-lg btn-block">Sign Up</Button>

                      <div className="mt-4">
                        <p className="mb-5 pb-lg-2" style={{ color: '#393f81' }}>Already have an account? <Link to="/auth/login" style={{ color: '#393f81' }}>Login here</Link></p>
                      </div>
                    </Form>
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

export default SignUp;