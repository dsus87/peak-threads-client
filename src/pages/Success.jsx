
import React, { useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { CartContext } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';

function Success () {
    const navigate = useNavigate();
    const { items, getTotalCost, clearCart } = useContext(CartContext);
    const { userId } = useAuth(); 

    useEffect(() => {
        if (items.length > 0) {
            const createOrder = async () => {
                try {
                    const orderData = {
                        user: userId,
                        items: items.map(item => ({
                            product: item._id,
                            quantity: item.quantity,
                            price: item.price, // Assuming each item has a price field
                        })),
                        totalCost: getTotalCost(),
                    };

                    const response = await fetch('https://peak-threads.onrender.com/create', {
                        method: "POST",
                        headers: {
                            'Content-Type': 'application/json',
                            'Authorization': `Bearer ${token}`, // Include the token if your backend requires authentication
                        },
                        body: JSON.stringify(orderData)
                    });

                    const data = await response.json();
                    if (response.ok) {
                        console.log('Order created successfully', data);
                        clearCart(); // Clear the cart after successful order creation
                        // Redirect or show a success message
                        navigate('/order-success'); // Redirect to an order success page
                    } else {
                        throw new Error(data.message || "Failed to create order");
                    }
                } catch (error) {
                    console.error('Error creating order:', error);
                    // Handle error (e.g., show an error message)
                }
            };

            createOrder();
        } else {
            // Redirect if there are no items in the cart, indicating this page was accessed in error
            navigate('/');
        }
    }, [items, userId, getTotalCost, navigate, clearCart]);

    return (
        <div>
            <h1>Thank you for your purchase!</h1>
            {/* Additional content or messages */}
        </div>
    );
};
export default Success;