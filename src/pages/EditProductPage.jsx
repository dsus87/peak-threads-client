import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import { Container, Row, Col, Form, Button, Card, Alert } from 'react-bootstrap';
import { useAuth } from '../context/AuthContext';

const EditProductPage = () => {
  const { productId } = useParams();
  const navigate = useNavigate();
  const { token } = useAuth();

  // Product details state
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [gender, setGender] = useState('Unisex');
  const [category, setCategory] = useState('Outerwear');
  const [quantityS, setQuantityS] = useState(0);
  const [quantityM, setQuantityM] = useState(0);
  const [quantityL, setQuantityL] = useState(0);
  const [brand, setBrand] = useState('');
  const [photo, setPhoto] = useState(null);
  // Loading and error state
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProduct = async () => {
      setIsLoading(true);
      try {
        const response = await axios.get(`https://peak-threads.onrender.com/products/${productId}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        const product = response.data;
        setName(product.name);
        setDescription(product.description);
        setPrice(product.price);
        setGender(product.gender);
        setCategory(product.category);
        setQuantityS(product.quantityS);
        setQuantityM(product.quantityM);
        setQuantityL(product.quantityL);
        setBrand(product.brand);
        // Note: For photo, you'll likely need to handle it differently since it's a file
        setIsLoading(false);
      } catch (error) {
        setError('Failed to load product data. Please try again.');
        setIsLoading(false);
      }
    };
    fetchProduct();
  }, [productId, token]);

  const handleUpdate = async (e) => {
    e.preventDefault();
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
      if (photo) {
        formData.append('photo', photo);
      }
      formData.append('brand', brand);

      await axios.put(`https://peak-threads.onrender.com/products/update-products/${productId}`, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'multipart/form-data',
        },
      });

      navigate('/'); // Or to the updated product's page
    } catch (error) {
      setError('Failed to update product. Please try again.');
      setIsLoading(false);
    }
  };

  const handleDelete = async () => {
    if (!window.confirm('Are you sure you want to delete this product?')) return;
    setIsLoading(true);

    try {
      await axios.delete(`https://peak-threads.onrender.com/products/delete-products/${productId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      navigate('/'); // Redirect to a safe page after deletion
    } catch (error) {
      setError('Failed to delete product. Please try again.');
      setIsLoading(false);
    }
  };

  return (
    <Container className="py-5 h-100">
      <Row className="d-flex justify-content-center align-items-center h-100">
        <Col xl={10}>
          <Card style={{ borderRadius: '1rem' }}>
            <Card.Body>
              <h2 className="text-center mb-4">Edit Product</h2>
              {error && <Alert variant="danger">{error}</Alert>}
              <Form onSubmit={handleUpdate}>

                {/* Product Name */}
                <Form.Group className="mb-3">
                  <Form.Label>Product Name</Form.Label>
                  <Form.Control type="text" value={name} onChange={(e) => setName(e.target.value)} required />
                </Form.Group>

                {/* Description */}
                <Form.Group className="mb-3">
                  <Form.Label>Description</Form.Label>
                  <Form.Control as="textarea" rows={3} value={description} onChange={(e) => setDescription(e.target.value)} required />
                </Form.Group>

                {/* Other form fields similar to the above */}

                {/* Photo */}
                <Form.Group className="mb-3">
                  <Form.Label>Photo</Form.Label>
                  <Form.Control type="file" accept="image/*" onChange={(e) => setPhoto(e.target.files[0])} />
                </Form.Group>

                <Button variant="primary" type="submit" disabled={isLoading}>
                  {isLoading ? 'Updating...' : 'Update Product'}
                </Button>
                <Button variant="danger" onClick={handleDelete} disabled={isLoading} className="ms-2">
                  Delete Product
                </Button>

              </Form>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default EditProductPage;
