import { Navbar, Nav, Modal, Button } from 'react-bootstrap';
import { useState, useContext } from 'react';
import { CartContext } from '../context/CartContext';
import CartProduct from '../components/CartProduct';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import Peakthreads from '../assets/Peakthreads.svg';

function NavbarComponent() {
    const cart = useContext(CartContext); // Access cart context and authentication context states and functions.
    const { isLoggedIn, logout, userId  } = useAuth();

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
                    <img src={Peakthreads} style={{ width: '50px', height: '50px' }} alt="Peakthreads" />
                </Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="me-auto">
                        {isLoggedIn ? (
                            <>
                                <Nav.Link as={Link} to="auth/profile">Account</Nav.Link>
                                <Nav.Link as={Link} onClick={logout}>Sign Out</Nav.Link>
                            </>
                        ) : (
                            <Nav.Link as={Link} to="/auth/login" className="btn btn-outline-primary mr-2">Sign In</Nav.Link>
                        )}
                        
                        <Nav.Link as={Link} to="/outerwear">Outerwear</Nav.Link>
                        <Nav.Link as={Link} to="/t-shirts">T-shirts</Nav.Link>
                        <Nav.Link as={Link} to="/shoes">Shoes</Nav.Link>
                    </Nav>
                    <Button onClick={handleShow} className="ml-auto">Cart {productsCount} Items</Button>
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
                            <Button variant="success">Purchase Items!</Button>
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
