import { useState, useContext } from "react";
import { CartContext } from "./CartContext";
export const useCartContext = () => useContext(CartContext);

export const CartProvider = ({ children }) => {
    const [cart, setCart] = useState([]);

    const clearCart = () => setCart([]);

    const isInCart = (id) => cart.some((info) => info.id === id);

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
    
    const totalPrecio = () => {
        return cart.reduce((prec, act)=> prec + act.cantidad * act.precio, 0);
    }

    const totalProducts = () =>{
        cart.reduce((acumulador, productoActual) => acumulador + productoActual.cantidad, 0);
    }

    console.log('carrito:', cart)
    return (
        <CartContext.Provider value={{ cart, addToCart, clearCart, isInCart, removeProduct, totalPrecio, totalProducts }}>
            {children}
        </CartContext.Provider>
    );
};

export default CartProvider;