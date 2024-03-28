import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Container, Row, Col, Form, Button, Card, Alert } from 'react-bootstrap';
import { useAuth } from '../context/AuthContext'; 
import { Link } from 'react-router-dom';
import signup from '../assets/signup.png'

function SignIn() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('https://peak-threads.onrender.com/auth/login', { email, password });
      const { authToken, userId, isAdmin } = response.data;
      login(authToken, userId, isAdmin);
      navigate('/');
    } catch (err) {
      setError(err.response ? err.response.data.message : 'Login failed');
    }
  }

  return (
    <section style={{ height: '100vh' }}>
      <Container className="py-5 h-100">
        <Row className="d-flex justify-content-center h-100">
          <Col xl={10}>
            <Card style={{ borderRadius: '2rem' }}>
              <Row className="g-0">
                {/* Image Column */}
                <Col md={5} lg={5} className="d-none d-md-block">
                  <img src={signup} alt="Login" style={{ width: "100%", height: "100%", borderRadius: '2rem 0 0 2rem' }} />
                </Col>
                {/* Form Column */}
                <Col md={7} lg={7} className="d-flex align-items-center">
                  <Card.Body className="p-4 p-lg-5 text-black">
                    <Form onSubmit={handleSubmit}>
                      <div className="d-flex align-items-center mb-3 pb-1">
                        <span className="h1 fw-bold mb-0">Peak Threads</span>
                      </div>

                      <h5 className="fw-normal mb-3 pb-3" style={{ letterSpacing: '1px' }}>Sign into your account</h5>

                      {error && <Alert variant="danger">{error}</Alert>}

                      {/* Email */}
                      <Form.Group className="form-outline mb-4">
                        <Form.Control type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
                        <Form.Label>Email address</Form.Label>
                      </Form.Group>

                      {/* Password */}
                      <Form.Group className="form-outline mb-4">
                        <Form.Control type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
                        <Form.Label>Password</Form.Label>
                      </Form.Group>

                      <Button variant="dark" type="submit" className="btn-lg btn-block">Login</Button>

                      <div className="mt-4">
                        <p className="mb-5 pb-lg-2" style={{ color: '#393f81' }}>Don't have an account? <Link to="/auth/signup" style={{ color: '#393f81' }}>Register here</Link></p>
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

export default SignIn;