import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Container, Row, Col, Form, Button, Card, Alert } from 'react-bootstrap';
import { useAuth } from '../context/AuthContext'; 
import { Link } from 'react-router-dom';

function SignIn() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://localhost:5005/auth/login', { email, password });
      const { authToken, userId, isAdmin } = response.data;
      login(authToken, userId, isAdmin);
      navigate('/');
    } catch (err) {
      setError(err.response ? err.response.data.message : 'Login failed');
    }
  }

  return (
    <section >
      <Container className="py-5 h-100">
        <Row className="d-flex justify-content-center align-items-center h-100">
          <Col xl={10}>
            <Card style={{ borderRadius: '1rem' }}>
              <Row className="g-0">
                <Col md={6} lg={5} className="d-none d-md-block">
              
                </Col>
                <Col md={6} lg={7} className="d-flex align-items-center">
                  <Card.Body className="p-4 p-lg-5 text-black">
                    <Form onSubmit={handleSubmit}>
                      <div className="d-flex align-items-center mb-3 pb-1">
                        <span className="h1 fw-bold mb-0">Peak Threads</span>
                      </div>

                      <h5 className="fw-normal mb-3 pb-3" style={{ letterSpacing: '1px' }}>Sign into your account</h5>

                      {error && <Alert variant="danger">{error}</Alert>}

                      <Form.Group className="form-outline mb-4">
                        <Form.Control type="email" id="form2Example17" className="form-control form-control-lg" value={email} onChange={(e) => setEmail(e.target.value)} />
                        <Form.Label>Email address</Form.Label>
                      </Form.Group>

                      <Form.Group className="form-outline mb-4">
                        <Form.Control type="password" id="form2Example27" className="form-control form-control-lg" value={password} onChange={(e) => setPassword(e.target.value)} />
                        <Form.Label>Password</Form.Label>
                      </Form.Group>

                      <Button variant="dark" type="submit" className="btn-lg btn-block">Login</Button>

                      <div className="mt-4">
                        <Link to="#!" className="small text-muted">Forgot password?</Link>
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