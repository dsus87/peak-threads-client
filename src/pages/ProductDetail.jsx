import React, { useEffect, useState, useContext } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { CartContext } from '../context/CartContext'; // Adjust the import path as necessary
import { Button, Form } from 'react-bootstrap';

function ProductDetailPage() {
  const { productId } = useParams();
  const [product, setProduct] = useState(null);
  const [selectedSize, setSelectedSize] = useState('');
  const [error, setError] = useState('');
  const cart = useContext(CartContext);

  useEffect(() => {
    const fetchProductDetails = async () => {
      try {
        const response = await axios.get(`http://localhost:5005/products/${productId}`);
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

  return (
    <div>
      <h1>{product.name}</h1>
      <img src={product.photo} alt={product.name} style={{ maxWidth: "100%", maxHeight: "300px" }} />

      <p>Description: {product.description}</p>
      <p>Price: ${product.price}</p>
      <Form.Group controlId="sizeSelect">
        <Form.Label>Select Size</Form.Label>
        <Form.Control as="select" value={selectedSize} onChange={e => setSelectedSize(e.target.value)}>
          <option value="">Select a size</option>
          {Object.keys(product.quantity).map(size => (
            <option key={size} value={size}>{size} ({product.quantity[size]} available)</option>
          ))}
        </Form.Control>
      </Form.Group>
      {product.sellerId && (
        <div>
          <h4>Seller Information</h4>
          <p>Name: {product.sellerId.name}</p>
        </div>
      )}
      <Button variant="primary" onClick={handleAddToCart}>Add to Cart</Button>
    </div>
  );
}

export default ProductDetailPage;
