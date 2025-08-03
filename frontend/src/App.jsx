import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Products from './pages/Products';
import ProductDetails from './pages/ProductDetails';
import NotFound from './pages/NotFound';

function App() {

  return (
    <>      
      <Routes>
        <Route path='/' element={ <Home/> }/>
        <Route path='/login' element={ <Login/> }/>
        <Route path='/register' element={ <Register/> }/>
        <Route path='/products' element={ <Products/> }/>
        <Route path='/products/:id' element={ <ProductDetails/> }/>
        <Route path='*' element={<NotFound />} />
        
      </Routes>
    </>
  )
}

export default App
