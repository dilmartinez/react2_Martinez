import { useEffect, useState } from "react";
import ItemList from "../../components/ItemList/ItemList"
import { useParams } from "react-router-dom";
import '../ItemListContainer/ItemListContainer.css';
import { getFirestore, getDocs, collection, query, where } from 'firebase/firestore';

 export const ItemListContainer = () => {
  const [prodList, setProdList] = useState([]);

  const { tipoId } = useParams();
  console.log(tipoId)

  const getProducts = () =>{
    const querydb = getFirestore();
    const querybase = collection(querydb, 'items');
    const queryCollection = tipoId ? query(querybase, where('tipo', '==', tipoId)) : querybase;
   
      getDocs(queryCollection).then((res) => {
        const data = res.docs.map(product => {
          console.log(product.data());
          return {id:product.id, ...product.data()}
        });
        setProdList(data);
  });
};
  useEffect(() => {
    getProducts();
    //eslint-disable-next-line react-hooks/exhaustive-deps
  }, [tipoId]);

  return (
    <>
      <ItemList lista={prodList} />
    </>
  )
};

export default ItemListContainer;