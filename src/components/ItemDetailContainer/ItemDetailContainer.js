import ItemDetail from "../ItemDetail/ItemDetail";
import { useState, useEffect } from "react";
import data from "../Data";
import { useParams } from "react-router-dom";


const ItemDetailContainer = () => {

  const [prodList, setProdList] = useState({});

  const { detalleId} = useParams();

  useEffect(() => {
    const getProdList = new Promise(resolve => {
      setTimeout(() => {
        resolve(data)
      }, 2000);
    });
    const dataFiltrada = data.filter((prodList) => prodList.id === detalleId);
    //console.log(dataFiltrada)
    setProdList(...dataFiltrada)
    
  }, []);

  

  return (
    <>
      {prodList && <ItemDetail info={prodList} />}
    </>
  );
}

export default ItemDetailContainer;
