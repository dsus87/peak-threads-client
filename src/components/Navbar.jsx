import { Navbar, Nav, NavDropdown, Modal, Button } from 'react-bootstrap';
import { useState, useContext } from 'react';
import { CartContext } from '../context/CartContext';
import CartProduct from '../components/CartProduct'; 
import { Link } from 'react-router-dom'; 
import Account from '../pages/Account';
import { useAuth } from '../context/AuthContext';
import Peakthreads from '../assets/Peakthreads.svg'



function NavbarComponent() {
    const cart = useContext(CartContext);     // Access cart context and authentication context states and functions.
    const { isLoggedIn, logout } = useAuth();

    // `show` state to control the visibility of the cart modal. It's initially set to false.
    const [show, setShow] = useState(false);     

    // Handlers to show and hide the cart modal. They update the `show` state accordingly.

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    // Calculate the total number of items in the cart by summing up the quantities of all items.
    const productsCount = cart.items.reduce((sum, product) => sum + product.quantity, 0);

    return (
        <>
           <Navbar expand="sm" bg="light">
                <Navbar.Brand href="/">
                
                <img src={Peakthreads} style={{ width: '60px', height: '60px' }} alt="Peakthreads"></img>
                </Navbar.Brand>
                <Navbar.Toggle />
                <Navbar.Collapse className="justify-content-end">
                   
        
                    <Link to={isLoggedIn ? "/auth/:_id" : "/auth/login"} className="btn btn-outline-primary mr-2">Account</Link>

                    {isLoggedIn ? (
                        <>

                            <Button onClick={logout} className="btn btn-primary mr-2">Sign Out</Button>
                        </>
                    ) : (
                        <>
                            {/* Redirect to the sign-in page if not logged in */}
                            <Link to="/auth/login" className="btn btn-outline-primary mr-2">Sign In</Link>
                        </>
                    )}
                    <Button onClick={handleShow} className="ml-3">Cart {productsCount} Items</Button>
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
