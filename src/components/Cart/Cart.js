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
            apellido: '',
            phone: '',
            email: '',
        },
        items: cart,
        total: cart.reduce((acc, item) => acc + item.precio * item.cantidad, 0),
        date: moment().format('DD/MM/YYYY, h:mm:ss a'),
    });

    const [errors, setError] = useState(0);

    const querydb = getFirestore();

    const createOrder = () => {
        const query = collection(querydb, 'orders');
        addDoc(query, order)
            .then(({ id }) => {
                console.log(id);
                updateStockProducts()
                alert('Transacción exitosa, ¡gracias por comprar! SU NÚMERO  DE ORDEN ES : ' + id);
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

    const handleInputChange = (e) => {
        const value = e.target.value;
        console.log(value
            )
        const onliLet = /^[a-zA-Z\s]*$/g.test(value);
        const minValue = value.length > 1;
        const maxValue=value.length<12;
        const maxphone=value.length<14

        if (onliLet === false) {
            setError(1);
        } else if (!minValue) {
            setError(2)
        }else if (!maxValue){
            setError(3);
        }
        if (onliLet === true && minValue) {
            setError(0);
        }
        setOrder({
            ...order,

            buyer: {
                ...order.buyer,
                [e.target.name]: e.target.value,
            },
        });

    };

    const handleBlur = (e) => {
        handleInputChange(e);

    };

    /* const validateForm = (order) => {
         let errors = {}
        
         let regexName = /^[a-zA-Z\s]*$/g;
         let regexEmail =  /^[-\w.%+]{1,64}@(?:[A-]{1,63}\.){1,125}[A-Z]{2,63}$/i;
 
         if (!order.name) {
             errors.name = 'El campo NOMBRE es requerido';
         } else if (!regexName(order.name.test())) {
             errors.name = 'El campo nombre sólo acepta letras y espacios en blanco';
         }
 
         if (!order.apellido) {
             errors.apellido = 'El campo APELLIDO es requerido';
         }else if (!regexName.test(order.apellido)) {
             errors.apellido = 'El campo apellido sólo acepta letras y espacios en blanco';
         };
 
         if (!order.email) {
             errors.email = 'El campo Email es requerido';
         }else if (!regexEmail.test(order.email)) {
             errors.email = 'El email es incorrecto';
         };
 
         if (!order.email) {
             errors.email = 'El campo Email es requerido';
         }else if (!regexEmail.test(order.email)) {
             errors.email = 'El email es incorrecto';
         };
 
         if (!order.phone) {
             errors.phone = 'El campo teléfono es requerido';
         }
         
 
         return errors
     }*/

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
                <h3>Completá los siguientes datos para continuar:</h3>

                <div className="form">
                    <div>
                        <label>Nombre</label>
                        <div>
                            <input name="name" type="text" value={order.buyer.name} onChange={handleInputChange} onBlur={handleBlur} required />
                            {(errors === 1) && (
                                <p className="error">El nombre solo puede tener letras</p>)}
                            {(errors === '') && (
                                <p className="error">Debes colocar un nombre, el campo no puede estar vacio</p>)}

                        </div>
                    </div>
                    <div>
                        <label>Apellido</label>
                        <div>
                            <input name="apellido" type="text" value={order.buyer.apellido} onChange={handleInputChange} onBlur={handleBlur} required />
                            {errors.apellido && <p className="error">{errors.apellido}</p>}
                        </div>
                    </div>

                    <div>
                        <label>Correo</label>
                        <input name="email" type="text" value={order.buyer.email} onChange={handleInputChange} onBlur={handleBlur} />
                        {errors.email && <p className="error">{errors.email}</p>}
                    </div>

                    <div>
                        <label>Repite tu correo</label>
                        <input name="email" type="text" value={order.buyer.email} onChange={handleInputChange} onBlur={handleBlur} />
                        {errors.email && <p className="error">{errors.email}</p>}

                    </div>


                    <div>
                        <label>Teléfono</label>
                        <input name="phone" type="number" value={order.buyer.phone} onChange={handleInputChange} onBlur={handleBlur} required />
                        {errors.phone && <p className="error">{errors.phone}</p>}
                    </div>

                </div>

                <div>
                    <button className="order" onClick={createOrder}>Procesar Compra</button>
                </div>
            </div>
        </>
    );

};

export default Cart;