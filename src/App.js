
import NavBar from './components/NavBar/NavBar';
import './components/NavBar/NavBar.css';
import './components/CartWidget/carrito.css';
import './App.css';
import ItemDetailContainer from './components/ItemDetailContainer/ItemDetailContainer';
import ItemListContainer from './components/ItemListContainer/ItemListContainer';
import './components/ItemListContainer/ItemListContainer.css'
import './components/Item/Item.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import CartWidget from './components/CartWidget/CartWidget';
import CartProvider from './context/CartProvider';



function App() {

  return (
    <>
    <CartProvider>
      <BrowserRouter>
        <NavBar />
        <Routes>
          <Route path='/' element={<ItemListContainer />} />
          <Route path='/tipo/:tipoId' element={<ItemListContainer />} />
          <Route path='/cart' element={<CartWidget />} />
          <Route path='/detalle/:detalleId' element={<ItemDetailContainer />} />
        </Routes>
      </BrowserRouter>
      </CartProvider>
    </>
  )
}
export default App;
