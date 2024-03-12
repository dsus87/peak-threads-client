import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { useAuth } from '../context/AuthContext'; 
const OrderHistory = () => {
  const [orders, setOrders] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const { token } = useAuth(); //  auth context provides the token

  useEffect(() => {
    const fetchOrders = async () => {
      setIsLoading(true);
      try {
        const config = {
          headers: { Authorization: `Bearer ${token}` },
        };
        const response = await axios.get('http://localhost:5005/order/all-orders', config);
        console.log(response.data)
        setOrders(response.data);
      
      } catch (error) {
        console.error('Failed to fetch orders:', error);
        setError('Failed to fetch orders. Please try again later.');
      } finally {
        setIsLoading(false);
      }
    };

    fetchOrders();
  }, [token]); // Dependency array ensures useEffect runs once or when token changes

  if (isLoading) return <p>Loading orders...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div>
      <h2>Order History</h2>
      {orders.length === 0 ? (
        <p>No orders found.</p>
      ) : (
        orders.map(order => (
          <div key={order._id} style={{ marginBottom: '20px' }}>
            <p>Order Number: {order._id}</p>
            <p>Order Date: {new Date(order.orderDate).toLocaleDateString()}</p>
            
            <p>Total Price: ${order.totalPrice}</p>
            <p>Status: {order.status}</p>
            <div>
              <h4>Products:</h4>
              <ul>
                {order.products.map(product => (
                  <li key={product.productId}>
                    Name {product.name}, 
                    Quantity: {product.quantity}, 
                    Size: {product.size}, 
                  </li>
                ))}
              </ul>
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default OrderHistory;
