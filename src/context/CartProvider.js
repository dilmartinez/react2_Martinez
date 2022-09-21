import { useState } from "react";
import { CartContext } from "./CartContext";


export const CartProvider = ({ children }) => {
    const [cart, setCart] = useState([]);

    const clearCart = () => setCart([]);

    const isInCart = (id) => cart.find(info => info.id === id) ? true : false;

    const removeProduct = (id) => setCart(cart.filter(info => info.id !== id));

    const addToCart = (info, cantidad) => {
        let newCart;
        let product = cart.find(product => product.id === info.id);
        if (product) {
            product.cantidad += cantidad;
            newCart = [...cart];
        } else {
            product = { ...info, cantidad: cantidad };
            newCart = [...cart, product];
        }
        setCart(newCart);
    }
    console.log('carrito:', cart);

    return (
        <CartContext.Provider value={{ addToCart, clearCart, isInCart, removeProduct }}>
            {children}
        </CartContext.Provider>
    );
};

export default CartProvider;