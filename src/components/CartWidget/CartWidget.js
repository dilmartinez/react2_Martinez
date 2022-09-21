import cart from '../img/cartshop.jpeg';

const CartWidget = () => {
    console.log(CartWidget)
    return (
        <div>
            <img src={cart} className="cart" alt="cart" />
           
        </div>
    )
};

export default CartWidget;
