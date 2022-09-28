import { Link } from "react-router-dom";
import { useCartContext } from "../../context/CartProvider";
import '../Cart/Cart.css';

const Cart = () => {
    const { cart, addToCart, removeProduct, totalPrecio } = useCartContext();
    console.log('carrito', cart)
    if (cart.length === 0) {
        return (
            <>
                <p>No hay productos en el carrito</p>
                <Link to='/'>Ir a comprar</Link>
            </>
        )
    }
    return (
        <>
            <div className="productos-cart">
                {cart.map((info) => (
                    <div
                        key={info.id}>
                        <div>
                            <img src={info.img} className="img-producto-cart" alt={info.nombre} />
                            <h3>{info.nombre}</h3>
                            <p>Cantidad: {info.cantidad}</p>
                            <p>Precio: $ {info.precio} </p>
                            <p>Subtotal: ${info.cantidad * info.precio}</p>
                            <button className="eliminar-item-cart" onClick={() => removeProduct(info.id)}>Eliminar Producto</button>
                            <hr />
                        </div>

                    </div>
                ))}
                <hr />
                <div className="monto-pagar">Monto a abonar: ${totalPrecio()}</div>
                <hr />
            </div>

        </>

    );

};

export default Cart;