import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { useAuth } from '../context/AuthContext'; 
import { Table } from 'react-bootstrap';




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
        const response = await axios.get('https://peak-threads.onrender.com/order/all-orders', config);
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
       
<h2 style={{ textAlign: 'center', padding: '50px' }}>Order History</h2>      {orders.length === 0 ? (
        <p>No orders found.</p>
      ) : (
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>Order Number</th>
              <th>Order Date</th>
              <th>Total Price</th>
              <th>Status</th>
              <th>Products (ID, Quantity, Price)</th>
            </tr>
          </thead>
          <tbody>
            {orders.map(order => (
              <tr key={order._id}>
                <td>{order._id}</td>
                <td>{new Date(order.orderDate).toLocaleDateString()}</td>
                <td>€{order.totalCost}</td>
                <td>{order.status}</td>
                <td>
                  {order.items.map((item, index) => (
                    <div key={index}>
                      Product ID: {item._id}, Quantity: {item.quantity}, Price: €{item.price}
                      {index < order.items.length - 1 ? '; ' : ''}
                    </div>
                  ))}
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      

        
      )}
     
  



    </div>

    
  );

  
};

export default OrderHistory;
