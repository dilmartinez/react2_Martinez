import { Link } from "react-router-dom";
import { useCartContext } from "../../context/CartProvider";
import { useState } from "react";
import '../Cart/Cart.css';
import moment from "moment/moment";
import { collection, addDoc, getFirestore, doc, updateDoc } from "firebase/firestore";

const Cart = () => {
    const { cart, removeProduct, totalPrecio, clearCart } = useCartContext();
    const [order, setOrder] = useState({
        buyer: {
            name: '',
            apellido:'',
            phone: '0',
            email: '',
        },
        items: cart,
        total: cart.reduce((acc, item) => acc + item.precio * item.cantidad, 0),
        date: moment().format('DD/MM/YYYY, h:mm:ss a'),
    });

    const querydb = getFirestore();

    const createOrder = () => {
        const query = collection(querydb, 'orders');
        addDoc(query, order)
            .then(({ id }) => {
                console.log(id);
                updateStockProducts()
                alert('Transacción exitosa, ¡gracias por comprar!');
                clearCart()
            })
            .catch(() =>
                alert('Tu compra no pudo ser procesada, volvé a intentarlo')
            );
    };

    const updateStockProducts = () => {
        cart.forEach((item) => {
            const queryUpdate = doc(querydb, 'items', item.id)
            updateDoc(queryUpdate, {
                tipo: item.tipo,
                description: item.desc,
                image: item.img,
                precio: item.precio,
                nombre: item.nombre,
                stock: item.stock - item.cantidad
            }).then(() => {
                console.log('Stock actualizado');
            }
            ).catch((error)=> alert('no se actualizo el stock', error))
        });
    }

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
                            <p>Cantidad: {info.cant}</p>
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
                    <label>Apellido</label>
                    <input name="apellido" type="text" value={order.buyer.apellido} onChange={handleInputChange} />
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