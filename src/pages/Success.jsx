import React, { useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { CartContext } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';

function Success() {
    const navigate = useNavigate();
    const { items, getTotalCost, clearCart } = useContext(CartContext);
    const { userId, token } = useAuth();
    console.log(token)


    return (
        <div className="d-flex justify-content-center align-items-center" style={{ height: '50vh' }}>
            <div className="text-center">
                <h1>Thank you for your purchase!</h1>
                <button
                    style={{ marginTop: '150px', padding: '10px 20px', fontSize: '16px' }}
                    className="btn btn-dark"
                    onClick={() => navigate('/')}
                >
                   Continue Shopping
                </button>
            </div>
        </div>
    );
}

export default Success;
