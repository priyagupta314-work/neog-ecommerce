import logo from './logo.svg';
import './App.css';
import { Routes, Route, Link } from 'react-router-dom';
import { Home } from './components/Home/Home.jsx';
import  Products  from './components/Products/Products.jsx';
import { Cart } from './components/Cart/Cart';
import { useCart } from './contexts/CartContext';


function App() {
  const { itemsInCart } = useCart();
  return (
    <div className="App">
           <nav className="nav-bar">
            <ul className="nav-list">
              <Link to="/" className="nav-pills"><li > Home </li></Link>
              <Link to="/Wishlist" className="nav-pills"><li > Wishlist </li></Link>
              <Link to="/Cart" className="nav-pills"><li className="nav-list-item"> Cart <span className="badge-round">{itemsInCart.length}</span> </li> </Link>
            </ul>
          </nav>
          <Routes>
            <Route path='/' element = {<Home />} />
            <Route path='Products' element = {<Products />} />
            <Route path='Cart' element = {<Cart />} />
            {/* <Route path='/wishlist' element = {<Wishlist />} />  */}

          </Routes>
         
    </div>
    
  );
}

export default App;
