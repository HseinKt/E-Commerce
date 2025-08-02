import { Link } from 'react-router-dom';
import '../styles/Navbar.css';
import { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../context/AuthContext';

const Navbar = () => {
    const {user, logout} = useContext(AuthContext);
    const [ scrolled, setScrolled ] = useState(false);

    useEffect(() => {
    const onScroll = () => {
        if(window.scrollY > 50) {
            setScrolled(true);
        } else {
            setScrolled(false);
        }
    };
    
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
    }, []);

    return ( 
        <nav className={`navbar ${scrolled ? 'scrolled' : ''}`}>
            <div className='navbar-content'>
                <img src="src/assets/logo2.png" alt="Logo" className="logo-image" />

                <div className='links'>
                    <Link to="/" className='link'>Home</Link>
                    <Link to="/products" className='link'>Products</Link>
                </div>
            </div>

            <div className='auth-links'>
                {user?.role === 'admin' && (
                    <>
                        <Link to="/admin/dashboard" className='link'>Dashboard</Link>
                        <button className='logout-button' onClick={logout}>Logout</button>
                    </>
                )}

                {!user && (
                    <>
                        <Link to="/login" className='link'>Login</Link>
                        <Link to="/register" className='link'>Register</Link>
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