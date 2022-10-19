import shop from '../img/cartshop.jpeg';
import { useCartContext } from '../../context/CartProvider';
import '../CartWidget/carrito.css'

const CartWidget = () => {
    const { totalProducts } = useCartContext();
    return (
        <>
            <img src={shop} className="cart" alt="cart" />
            <span className='contador'>{totalProducts() || ''}</span>

        </>
    )
};

export default CartWidget;
