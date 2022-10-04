import { Link } from "react-router-dom";
import { useCartContext } from "../../context/CartProvider";
import '../Cart/Cart.css';
import moment from "moment/moment";
import { collection, addDoc, getFirestore } from "firebase/firestore";

const Cart = () => {
    const { cart, addToCart, removeProduct, totalPrecio } = useCartContext();

    const createOrder = () => {
        const querydb = getFirestore();
        const order = {
            buyer: {
                name: 'Juan',
                phone: '123456789',
                email: 'test@test.com'
            },
            data: cart,
            total: cart.reduce((valorPasado, valorActual) => valorPasado + (valorActual.precio * valorActual.cantidad), 0),
            date: moment().format(),
        };
        const query = collection(querydb, 'orders');
        addDoc(query, order)
            .then(({ id }) => {
                console.log(id);
                alert('Transacción exitosa, gracias por comprar');
            })
            .catch(() =>
                alert('Tu compra no pudo ser procesada, volvé a intentarlo')
            );
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
            <div>
                <button className="order" onClick={createOrder}>Procesar Compra</button>
            </div>

        </>
    );

};

export default Cart;