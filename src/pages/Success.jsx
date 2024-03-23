import React, { useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios'; // Import Axios
import { CartContext } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import successImage from '../assets/4.png'

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

    function SuccessPage() {
        return (
          <section style={{ height: '100vh' }}>
            <Container className="py-5 h-100">
              <Row className="d-flex justify-content-center align-items-center h-100">
                <Col xl={8}>
                  <Card style={{ borderRadius: '2rem', boxShadow: '0 4px 8px 0 rgba(0, 0, 0, 0.2)' }}>
                    <Row className="g-0">
                      {/* Success Icon/Image Column */}
                      <Col md={5} className="d-none d-md-flex justify-content-center align-items-center">
                        <img src={successImage} alt="Success" style={{ width: "80%", height: "auto", borderRadius: '2rem 0 0 2rem' }} />
                      </Col>
                      {/* Message Column */}
                      <Col md={7} className="d-flex align-items-center">
                        <Card.Body className="p-4 p-lg-5 text-black">
                          <div className="d-flex align-items-center mb-3 pb-1">
                            <span className="h1 fw-bold mb-0">Purchase Successful</span>
                          </div>
      
                          <h5 className="fw-normal mb-3 pb-3" style={{ letterSpacing: '1px' }}>Thank you for your purchase!</h5>
                          
      
                          <p style={{ color: '#393f81' }}>Go back to <a href="/" style={{ color: '#393f81' }}>homepage</a>.</p>
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
}

export default Success;
