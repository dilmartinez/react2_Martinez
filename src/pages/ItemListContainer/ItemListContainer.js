import { useEffect, useState } from "react";
import ItemList from "../../components/ItemList/ItemList"
import { useParams } from "react-router-dom";
import '../ItemListContainer/ItemListContainer.css';
import { getFirestore, getDocs, collection, query, where } from 'firebase/firestore';

const ItemListContainer = () => {
  const [prodList, setProdList] = useState([]);

  const { tipoName } = useParams();
  console.log(tipoName)

  const getProducts = () => {
    //inicialización de la base de datos
    const querydb = getFirestore();

    //Inicio de colección, indicando cual deseo traer de la base de datos
    const queryBase = collection(querydb, 'items');
    const querySnapshot = tipoName ? query(queryBase, where('tipo', '==', tipoName)) : queryBase;

    getDocs(querySnapshot).then(response => {
      const data = response.docs.map(product => {
        return { id: product.id, ...product.data() }
      });
      setProdList(data);
    }).catch(error => { console.log(error) })
  };
  
  useEffect(() => {
    getProducts();
    //eslint-disable-next-line react-hooks/exhaustive-deps
  }, [tipoName]);

  return (
    <>
      <ItemList lista={prodList} />
    </>
  );
};

export default ItemListContainer;