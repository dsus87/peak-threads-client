import { Navbar, Nav, Modal, Button } from 'react-bootstrap';
import { useState, useContext } from 'react';
import { CartContext } from '../context/CartContext';
import CartProduct from '../components/CartProduct';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import Peakthreads from '../assets/Peakthreads.svg';
import PTlogo from '../assets/PTlogo.png'
import { useNavigate } from 'react-router-dom'; 

function NavbarComponent() {
    const cart = useContext(CartContext); // Access cart context and authentication context states and functions.
    const { isLoggedIn, logout, userId, token  } = useAuth();

    const checkout = async () => {
        const checkoutItems = cart.items.map(item => ({
            stripeId: item.stripeId,
            quantity: item.quantity,
            size: item.size,

        }));


    const totalPrice = cart.getTotalCost(); 

        // Construct the order object
        const orderData = {
            items: cartItems,
            totalPrice,
            paymentMethod: 'Credit Card', // Place holder
            shippingDetails: {
                name: 'test ',  
                address: '7 test st at trial and error ',
                city: 'Berlin'
            }
        };

     


    
        await fetch('https://peak-threads.onrender.com/checkout/checkout', {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify({items: checkoutItems})
        })
        .then(response => response.json())
        .then(response => {
            if(response.url) {
                window.location.assign(response.url); // Forwarding user to Stripe
            }
        }).catch(error => console.error("Checkout Error:", error));
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
