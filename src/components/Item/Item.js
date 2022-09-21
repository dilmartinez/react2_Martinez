import '../Item/Item.css';


const Item = ({info}) => {
  return (
    
      < div className="info-product">
        <img src={info.img} className="img-producto" alt="img"/>
        <div className="nombre-producto">{info.nombre}</div>
        <div className="precio-producto">{info.precio} $</div>
        <div className="detalle">Ver detalles del producto</div>
      </div>
  )
}

export default Item;