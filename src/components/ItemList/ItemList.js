
import Item from "../Item/Item";
import { Link } from "react-router-dom";

const ItemList = ({ lista }) => {

    return (
        <div className="contenedor">
            {lista.map((product) => (
            <Link  key={product.id}
            to={'/detalle/' + product.id}
            style={{ textDecoration: 'none' }}  >
                
                <Item 
                info={product}
                    nombre={product.nombre}
                    precio={product.precio}
                    img={product.img}
                    desc={product.desc}
                    tipo={product.tipo}
                    id={product.id}
                />
        </Link>
    ))
}
        </div >
    );
};

export default ItemList;