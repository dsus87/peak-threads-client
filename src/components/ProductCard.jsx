import { Card, Button } from 'react-bootstrap';
import { CartContext } from '../context/CartContext';
import { useContext } from 'react';
import { Link } from 'react-router-dom'; 


function ProductCard(props) {
    const { product } = props;
    const cart = useContext(CartContext);

    const productQuantity = cart.getProductQuantity(product._id);
    
    console.log(cart.items); 
    return (
        <Card style={{ border: 'none', width: '100%', margin: 'auto' }}>
            <Card.Body>
         


                <Link to={`/products/${product._id}`}> 
                <Card.Img variant="top" src={product.photo} alt={product.name} style={{ width: "100%", height: "auto" }} />
                </Link>

                <Card.Title style={{ paddingTop: "0.8rem" }}>{product.name}</Card.Title>
                
                <Card.Text>€{product.price}</Card.Text>
              
            </Card.Body>
        </Card>
    );
}

export default ProductCard;
