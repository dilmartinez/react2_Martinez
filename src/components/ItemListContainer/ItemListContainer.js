import data from "../Data";
import { useEffect, useState } from "react";
import ItemList from "../ItemList/ItemList"
import { useParams } from "react-router-dom";

const ItemListContainer = ({ }) => {

  const [prodList, setProdList] = useState([]);

  const { tipoId } = useParams();

  useEffect(() => {
    const getProdList = new Promise(resolve => {
      setTimeout(() => {
        resolve(data)
      }, 2000);
    });
    if (tipoId) {
      getProdList.then(response => setProdList(response.filter(churros => churros.tipo === tipoId)))
    } else {
      getProdList.then(response => setProdList(response));
    }
  }, [tipoId])

  
  return (
    <>
      
      <ItemList lista={prodList} />
    </>
  )
};

export default ItemListContainer;