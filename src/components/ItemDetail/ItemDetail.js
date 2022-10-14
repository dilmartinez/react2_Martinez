import Counter from '../Counter/Counter';
import './ItemDetail.css';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useCartContext } from '../../context/CartProvider';


const ItemDetail = ({ info }) => {
  const [count, setCount] = useState(1);

  //const [goTocart, setGoTocard] = useState(false)
  const { addToCart } = useCartContext();

  const onAdd = (info) => {
    //setGoTocard(goTocart);
    addToCart(info, count)
  }

  return (
    <>
      <div className='contenedor-detail'>
        <div className='equis-detail'>
          <img src={info.img} className="img-producto" alt="img" />
          <div className="nombre-producto-det">{info.nombre}</div>
          <div className="desc-det">{info.desc}</div>
          <div className="precio-producto-det">Precio {info.precio} $</div>
          
          <Counter stock={info.stock} count={count} setCount={setCount} />
          
          <button onClick={() => {onAdd(info); alert('producto agregado al carrito')}}> Agregar al carrito</button>
          <div>
          <div className="stock">Unidades disponibles {info.stock}</div>
            <Link className='volver' to='/'>Volver</Link><span></span><Link className='terminar-compra' to='/Cart'>Terminar mi compra</Link></div>

        </div>

      </div>

    </>
  )
}

export default ItemDetail;