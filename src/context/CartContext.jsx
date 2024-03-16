import React, { createContext, useState, useEffect } from "react";
import axios from 'axios';

export const CartContext = createContext({
    items: [],
    getProductQuantity: () => {},
    addOneToCart: () => {},
    removeOneFromCart: () => {},
    deleteFromCart: () => {},
    getTotalCost: () => {},
    getProductData: () => {}
});

// Define the CartProvider component. It takes children components as props.
export const CartProvider = ({ children }) => {
    // State for storing the list of products. Initialized as an empty array.

    const [products, setProducts] = useState([]);

    // State for storing items in the cart. Initialized from local storage if available, otherwise an empty array.
    const [items, setItems] = useState(() => {
        const savedCartItems = localStorage.getItem('cartItems');
        return savedCartItems ? JSON.parse(savedCartItems) : [];
    });


    // useEffect to fetch product data from the server when the component mounts.

    useEffect(() => {
         // Define an async function to fetch products from the backend.

        const fetchProducts = async () => {
            try {
                const response = await axios.get('https://peak-threads.onrender.com/products/products');
                
                const mappedProducts = response.data.map(product => ({    // Map through each product to ensure it has a proper 'id' field.

                    ...product,
                    id: product._id, // Ensure each product has an 'id' field
                }));
            
                // Update the products state with the fetched and processed product list.

                setProducts(mappedProducts);
            } catch (error) {
                console.error("There was an error fetching the products: ", error);
            }
        };
                // Call the fetchProducts function.

        fetchProducts();
    }, []); // Empty dependency array means this effect runs once after the initial render.


    // useEffect to save the cart items to local storage whenever they change.

    useEffect(() => {
        // Convert items array to JSON string and save it in local storage under 'cartItems'.
        localStorage.setItem('cartItems', JSON.stringify(items));
    }, [items]);  // This effect runs whenever the 'items' state changes.


    const getProductQuantity = (productId, size) => {
        const product = items.find(item => item._id === productId && item.size === size);
        return product ? product.quantity : 0;
    };


    const addOneToCart = (_id, size) => {
        const productInCart = items.find(item => item._id === _id && item.size === size);
        const productInStock = products.find(product => product._id === _id);
    
        if (!productInStock) {
            console.error("Product not found in stock");
            return;
        }
    
        // Assuming stock levels are in the 'quantity' field of the productInStock,
        // and they are keyed by size (e.g., productInStock.quantity['M'] for medium)
        const availableStock = productInStock.quantity[size];
    
        const currentQuantityInCart = productInCart ? productInCart.quantity : 0;
    
        if (currentQuantityInCart < availableStock) {
            if (!productInCart) {
                setItems(prevItems => [...prevItems, { 
                    _id: _id, 
                    size: size, 
                    quantity: 1,
                    stripeId: stripeId  
                }]);
            } else {
                setItems(items => 
                    items.map(item =>
                        item._id === _id && item.size === size ? { ...item, quantity: item.quantity + 1 } : item
                    )
                );
            }
        } else {
            // Optionally notify the user that no more stock is available for this product size
            console.error("No more stock available for this product size");
        }
    };

    const removeOneFromCart = (_id, size) => {
        setItems(items =>
            items.map(item => {
                if (item._id === _id && item.size === size) {
                    return { ...item, quantity: item.quantity - 1 };
                }
                return item;
            }).filter(item => item.quantity > 0) // Remove item if quantity becomes 0
        );
    };

    const deleteFromCart = (_id, size) => {
        setItems(items => items.filter(item => !(item._id === _id && item.size === size)));
    };

    const getTotalCost = () => {
        return items.reduce((totalCost, cartItem) => {
            const productData = products.find(product => product._id === cartItem._id);
            return productData ? totalCost + productData.price * cartItem.quantity : totalCost;
        }, 0);
    };

    const getProductData = _id => products.find(product => product._id === _id);

    const contextValue = {
        items,
        getProductQuantity,
        addOneToCart,
        removeOneFromCart,
        deleteFromCart,
        getTotalCost,
        getProductData,
    };

    //    Return the children components, allowing them to access the cart context.

    return (
        <CartContext.Provider value={contextValue}>
            {children}    
        </CartContext.Provider>
    );
};

export default CartProvider;
