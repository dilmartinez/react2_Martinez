import { Link } from "react-router-dom";
import { useCartContext } from "../../context/CartProvider";
import { useState } from "react";
import '../Cart/Cart.css';
import moment from "moment/moment";
import { collection, addDoc, getFirestore } from "firebase/firestore";

const Cart = () => {
    const { cart, removeProduct, totalPrecio, clearCart } = useCartContext();
    const [order, setOrder] = useState({
        buyer: {
            name: '',
            phone: '0',
            
            email: '',
        },
        items: cart,
        total: cart.reduce((acc, item) => acc + item.precio * item.cantidad, 0),
        date: moment().format(),
    });

    const querydb = getFirestore();

    const createOrder = () => {
        const query = collection(querydb, 'orders');
        addDoc(query, order)
            .then(({ id }) => {
                console.log(id);
                //updateStockProducts(cart)
                alert('Transacción exitosa, ¡gracias por comprar!');
                clearCart()
            })
            .catch(() =>
                alert('Tu compra no pudo ser procesada, volvé a intentarlo')
            );
    };

    //const updateStockProducts = (products) =>

    const handleInputChange = (e) => {
        setOrder({
           ...order,
           
           buyer: {
            ...order.buyer,
            [e.target.name]:e.target.value,
           },
        });
    };

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
            <div className="form">
                <div>
                    <label>Nombre</label>
                    <input name="name" type="text" value={order.buyer.name} onChange={handleInputChange} />
                </div>
                <div>
                    <label>Telefono</label>
                    <input name="phone" type="number" value={order.buyer.phone} onChange={handleInputChange} />
                </div>
                <div>
                    <label>Correo</label>
                    <input name="email" type="text" value={order.buyer.email} onChange={handleInputChange} />
                </div>
            </div>

            <div>
                <button className="order" onClick={createOrder}>Procesar Compra</button>
            </div>

        </>
    );

};

export default Cart;