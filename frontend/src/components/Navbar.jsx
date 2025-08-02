import { Link } from 'react-router-dom';
import '../styles/Navbar.css';
import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';

const Navbar = () => {
    const {user, logout} = useContext(AuthContext);

    return ( 
        <nav className="navbar">
            <h1 className='logo'>ROOTED</h1>
            <div className='links'>
                <Link to="/">Home</Link>
                <Link to="/products">Products</Link>

                {user?.role === 'admin' && (
                    <>
                        <Link to="/admin/dashboard">Dashboard</Link>
                        <button className='logout-button' onClick={logout}>Logout</button>
                    </>
                )}

                {!user && (
                    <>
                        <Link to="/login">Login</Link>
                        <Link to="/register">Register</Link>
                    </>
                )}

                {user?.role === 'user' && (
                    <>
                        <span className='user-greeting'>Hello, {user.name}</span>
                        <button className='logout-button' onClick={logout}>Logout</button>
                    </>
                )}
            </div>
        </nav>
    );
}
 
export default Navbar;