import { Navbar, Nav, Modal, Button } from 'react-bootstrap';
import { useState, useContext } from 'react';
import { CartContext } from '../context/CartContext';
import CartProduct from '../components/CartProduct';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import Peakthreads from '../assets/Peakthreads.svg';
import PTlogo from '../assets/PTlogo.png'
import { useNavigate } from 'react-router-dom'; 
import axios from 'axios';

function NavbarComponent() {
    const navigate = useNavigate(); 

    const cart = useContext(CartContext); // Access cart context and authentication context states and functions.
    const { isLoggedIn, logout, userId, token  } = useAuth();


    const checkout = async () => {
        let checkoutToken; 
        
        if (isLoggedIn) {
            checkoutToken = token; 
        } else {
            const existingGuestToken = localStorage.getItem('guestToken');
            if (!existingGuestToken) {
                try {
                    const { data } = await axios.get('https://peak-threads.onrender.com/auth/generate-guest-token');
                    localStorage.setItem('guestToken', data.guestToken);
                    checkoutToken = data.guestToken;
                } catch (error) {
                    console.error("Failed to generate guest token:", error);
                    return; 
                }
            } else {
                checkoutToken = existingGuestToken; 
            }
        }
    
        // Prepare items in the format expected by the backend
        const itemsForCheckout = cart.items.map(item => {
            const productData = cart.getProductData(item._id); // Ensure this function correctly retrieves product data
            return {
                product: item._id, // Use the product's _id from the cart item
                stripeId: item.stripeId,
                quantity: item.quantity,
                price: productData.price, // Assuming productData correctly includes the price
            };
        });
    
        const totalCost = cart.getTotalCost();
    
        // Log the request payload for debugging
        console.log('Checkout request payload:', {
            user: isLoggedIn ? userId : null, // Send userId only if logged in, null otherwise
            guestToken: !isLoggedIn ? checkoutToken : null, // Send guestToken only if not logged in
            items: itemsForCheckout,
            totalCost: totalCost,
        });
    
        // Attempt to perform the checkout operation
        try {
            const response = await axios.post('https://peak-threads.onrender.com/checkout', {
                user: isLoggedIn ? userId : null, // Conditionally include the user ID
                guestToken: !isLoggedIn ? checkoutToken : null, // Include the guestToken for guests
                items: itemsForCheckout,
                totalCost: totalCost,
            }, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${checkoutToken}` // Use the determined token for the request
                }
            });
    
            if (response.data.url) {
                // Forwarding user to Stripe for payment
                window.location.assign(response.data.url);
            }
        } catch (error) {
            console.error("Checkout failed:", error);
            // Handle checkout failure appropriately
        }
    };




    // `show` state to control the visibility of the cart modal. It's initially set to false.
    const [show, setShow] = useState(false);

    // Handlers to show and hide the cart modal. They update the `show` state accordingly.
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    // Calculate the total number of items in the cart by summing up the quantities of all items.
    const productsCount = cart.items.reduce((sum, product) => sum + product.quantity, 0);

    let _id = userId;


    return (
        <>
            <Navbar expand="lg" bg="white">
                <Navbar.Brand style={{ padding: '10px 10px 10px' }} href="/">
                    <img src={PTlogo} style={{ width: 'auto', height: '80px' }} alt="Peakthreads" />
                </Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="me-auto">
                        {isLoggedIn ? (
                            <>
                             <Nav.Link as={Link} to="auth/profile" style={{  fontSize: '1.3em' }}>Account</Nav.Link>
                            <Nav.Link as={Link} to="/" onClick={logout} style={{  fontSize: '1.3em' }}>Sign Out</Nav.Link>

                            </>
                        ) : (
                            <Nav.Link as={Link} to="/auth/login"  style={{  fontSize: '1.3em' }}>Sign In</Nav.Link>
                        )}
                        
                    
                  
                    </Nav>
                    <Button onClick={handleShow} className="ml-auto btn-dark" style={{  fontSize: '1.3em' }}>Cart {productsCount} Items</Button>
                </Navbar.Collapse>
            </Navbar>

            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Shopping Cart</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {productsCount > 0 ? (
                        <>
                            <p>Items in your cart:</p>
                            {cart.items.map((item) => (
                                <CartProduct key={`${item._id}-${item.size}`} _id={item._id} size={item.size} quantity={item.quantity} />
                            ))}
                            <h4>Total: €{cart.getTotalCost().toFixed(2)}</h4>
                            <>
                                <div className="row">

                                <div className="col">
                                        <Button variant="success" onClick={checkout} className="mb-2 p-2 w-100">Purchase items</Button>
                                    </div>
                                    <div className="col">
                                        <Button variant="danger" onClick={() => cart.deleteFromCart()} className="mb-2 p-2 w-100">Empty Cart</Button>
                                    </div>
                                
                                </div>
                            </>
                        </>
                    ) : (
                        <h5>There are no items in your cart.</h5>
                    )}
                </Modal.Body>
            </Modal>
        </>
    );
}

export default NavbarComponent;
