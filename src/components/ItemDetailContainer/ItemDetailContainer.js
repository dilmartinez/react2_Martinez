import ItemDetail from "../ItemDetail/ItemDetail";
import { useState, useEffect } from "react";
//import data from "../Data";
import { useParams } from "react-router-dom";
import { getFirestore, doc, getDoc } from 'firebase/firestore';


const ItemDetailContainer = () => {
  const [prodList, setProdList] = useState({});
  const { detalleId } = useParams();

  useEffect(() => {
    const querydb = getFirestore();
    const queryDoc = doc(querydb, 'data', detalleId);
    getDoc(queryDoc)
      .then(res => setProdList({id:res.id, ...res.data()}))
    }, [detalleId]);

  return (
    <>
      {prodList && <ItemDetail info={prodList} />}
    </>
  );
}
export default ItemDetailContainer;
