import NavBar from './components/NavBar/NavBar';
import './App.css';
import ItemDetailContainer from './components/ItemDetailContainer/ItemDetailContainer';
import ItemListContainer from './components/ItemListContainer/ItemListContainer';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import CartProvider from './context/CartProvider';
import Cart from './components/Cart/Cart';

function App() {

  return (
    <>
    <CartProvider>
      <BrowserRouter>
        <NavBar />
        <Routes>
          <Route path='/' element={<ItemListContainer />} />
          <Route path='/tipo/:tipoId' element={<ItemListContainer />} />
          <Route path='/Cart' element={<Cart />} />
          <Route path='/detalle/:detalleId' element={<ItemDetailContainer />} />
        </Routes>
      </BrowserRouter>
      </CartProvider>
    </>
  )
}
export default App;
