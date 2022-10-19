import { Link } from "react-router-dom";
import { useCartContext } from "../../context/CartProvider";
import { useState } from "react";
import '../Cart/Cart.css';
import moment from "moment/moment";
import { collection, addDoc, getFirestore, doc, updateDoc } from "firebase/firestore";

const Cart = () => {
    const { cart, removeProduct, totalPrecio, clearCart } = useCartContext();
    const [botonActivo, setBotonActivo] = useState(false);
    const [order, setOrder] = useState({
        buyer: {
            name: '',
            apellido: '',
            phone: '',
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
                alert('Transacción exitosa, ¡gracias por tu compra! TU NÚMERO  DE ORDEN ES : ' + id);
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
            ).catch((error) => alert('no se actualizo el stock', error))
        });
    }

    const [inputescrito, setInputEscrito] = useState([]);

    const handleInputChange = (e) => {
        const val = e.target.value;
        console.log(val)

        var auxiliar = null;

        (inputescrito.includes(val)) ? auxiliar = inputescrito.filter(element => element === val) : auxiliar = inputescrito.concat(e.target.value)

        setInputEscrito(auxiliar);

        (auxiliar.length === 4) ? setBotonActivo(true) : setBotonActivo(false)

        setOrder({
            ...order,

            buyer: {
                ...order.buyer,
                [e.target.name]: e.target.value,
            },
        });
    };

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
                            <h4>{info.nombre}</h4>
                            <p>Cantidad: {info.cantidad}</p>
                            <p>Precio: $ {info.precio} </p>
                            <p>Subtotal: ${info.cantidad * info.precio}</p>
                            <button className="eliminar-item-cart" onClick={() => removeProduct(info.id)}>Eliminar Producto</button>
                            <hr />
                        </div>
                    </div>
                ))}
                <div className="monto-pagar">Monto a abonar: ${totalPrecio()}</div>
            </div>
            <div>
                <h3>Para avanzar con tu compra por favor llena TODOS los campos, gracias:</h3>

                <div className="form">
                    <div>
                        <label>Nombre</label>
                        <input name="name" type="text" value={order.buyer.name} onChange={handleInputChange} required={true} placeholder='Este campo no puede contener números' />    
                    </div>
                    <div>
                        <label>Apellido</label>
                        <input name="apellido" type="text" value={order.buyer.apellido} onChange={handleInputChange} required={true} placeholder='Este campo no puede contener números' />
                    </div>
                        <div>
                            <label>Correo</label>
                            <input name="email" type="text" value={order.buyer.email} onChange={handleInputChange} required={true} placeholder='Coloca una dirección de correo válida' />
                        </div>
                    <div>
                        <label>Teléfono</label>
                        <input name="phone" type="number" value={order.buyer.phone} onChange={handleInputChange} required={true} placeholder='+54 1 23 45678900' />
                    </div>
                    <input name="order" className="order" type="submit" onClick={createOrder} disabled={!botonActivo} />
                </div>
            </div>
        </>
    );

};

export default Cart;