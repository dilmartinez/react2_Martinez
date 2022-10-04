import { useEffect, useState } from "react";
import ItemList from "../../components/ItemList/ItemList"
import { useParams } from "react-router-dom";
import '../ItemListContainer/ItemListContainer.css';
import { getFirestore, getDocs, collection, query, where } from 'firebase/firestore';

 export const ItemListContainer = () => {
  const [prodList, setProdList] = useState([]);

  const { tipoId } = useParams();
  console.log(tipoId)

  useEffect(() => {
    const querydb = getFirestore();
    const queryCollection = collection(querydb, 'items');
    if (tipoId) {
      const queryFilter = query(queryCollection, where('tipo', '==', tipoId))
      getDocs(queryFilter)
        .then(res => setProdList(res.docs.map(product => ({ id:product.id, ...product.data()}))))
    } else {
      getDocs(queryCollection)
      .then(res => setProdList(res.docs.map(product => ({id:product.id, ...product.data()}))))
    }
  }, [tipoId])


  return (
    <>
      <ItemList lista={prodList} />
    </>
  )
};

export default ItemListContainer;