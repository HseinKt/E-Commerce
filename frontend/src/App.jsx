import { BrowserRouter as Router, Routes, Route, Switch } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Products from './pages/Products';
import ProductDetails from './pages/ProductDetails';
import Dashboard from './pages/Admin/Dashboard';
function App() {

  return (
    <Router>
      <Routes>
        <Route path='/' element={ <Home/> }/>
        <Route path='/login' element={ <Login/> }/>
        <Route path='/register' element={ <Register/> }/>
        <Route path='/products' element={ <Products/> }/>
        <Route path='/productDetails' element={ <ProductDetails/> }/>
      </Routes>
    </Router>
  )
}

export default App
