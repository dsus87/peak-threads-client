import React, { useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios'; // Import Axios
import { CartContext } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';

function Success() {
    const navigate = useNavigate();
    const { items, getTotalCost, clearCart } = useContext(CartContext);
    const { userId, token } = useAuth();
    console.log(token)

    useEffect(() => {
        if (items.length > 0 && token) {
            const createOrder = async () => {
                try {
                    const orderData = {
                        user: userId,
                        items: items.map(item => ({
                            product: item._id,
                            quantity: item.quantity,
                            price: item.price,
                        })),
                        totalCost: getTotalCost(),
                    };

                    console.log(token)
                    await axios.post('https://peak-threads.onrender.com/create', orderData, {
                        headers: {
                            'Content-Type': 'application/json',
                            'Authorization': `Bearer ${token}`,
                        },
                    });

                    console.log('Order created successfully');
                    clearCart(); // Clear the cart after successful order creation
                    navigate('/order-success'); // Redirect to an order success page
                } catch (error) {
                    console.error('Error creating order:', error.response ? error.response.data.message : error.message);
                    // Redirect to an error page or show an error message
                }
            };

            createOrder();
        } else {
            navigate('/'); // Redirect to home if no items or no token available
        }
    }, [items, userId, token, getTotalCost, navigate, clearCart]);

    return (
        <div>
            <h1>Thank you for your purchase!</h1>
        </div>
    );
}

export default Success;
