import React, { useContext } from "react";
import Button from "react-bootstrap/Button";
import { CartContext } from "../context/CartContext";

function CartProduct(props) {
    const { _id, size, quantity, stripeId } = props;
    console.log(`CartProduct Props:`, props); // Debug: Log to confirm props include size

    const cart = useContext(CartContext);
    const productData = cart.getProductData(_id);

    if (!productData) return <p>Loading product details...</p>;

    return (
        <>
            <h3>{productData.name}</h3>
            <p>{quantity} total</p>
            <p>{(quantity * productData.price).toFixed(2)} €</p>
            <Button size="sm" onClick={() => cart.removeOneFromCart(_id, size)}>Remove</Button>
            <hr />
        </>
    );
}
export default CartProduct;
