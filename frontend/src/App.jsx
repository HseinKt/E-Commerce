import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Products from './pages/Products';
import ProductDetails from './pages/ProductDetails';
import NotFound from './pages/NotFound';
import PrivateRoute from './routes/PrivateRoute';
import Dashboard from './pages/Admin/Dashboard';
import ProductManager from './pages/Admin/ProductManager';
import CategoryManager from './pages/Admin/CategoryManager';

function App() {

  return (
    <>      
      <Routes>
        <Route path='/' element={ <Home/> }/>
        <Route path='/login' element={ <Login/> }/>
        <Route path='/register' element={ <Register/> }/>
        <Route path='/products' element={ <Products/> }/>
        <Route path='/products/:id' element={ <ProductDetails/> }/>
        <Route path='*' element={<NotFound/>} />

        <Route path='/admin/dashboard' element={
          <PrivateRoute allowedRoles={'admin'}>
            <Dashboard/>
          </PrivateRoute>
        }/>

        <Route path='/admin/products' element={
          <PrivateRoute allowedRoles={'admin'}>
            <ProductManager/>
          </PrivateRoute>
        }/>

        <Route path='/admin/categories' element={
          <PrivateRoute allowedRoles={'admin'}>
            <CategoryManager/>
          </PrivateRoute>
        }/>
        
      </Routes>
    </>
  )
}

export default App
