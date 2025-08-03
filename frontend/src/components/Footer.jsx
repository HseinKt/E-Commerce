import '../styles/Footer.css';
import { FaFacebookF, FaTwitter, FaGoogle, FaInstagram, FaLinkedinIn, FaGithub } from 'react-icons/fa';

const Footer = () => {
    return ( 
        <footer className="rooted-footer">
            <div className="social-icons">
                <a href="#"><FaFacebookF /></a>
                <a href="#"><FaTwitter /></a>
                <a href="#"><FaGoogle /></a>
                <a href="#"><FaInstagram /></a>
                <a href="#"><FaLinkedinIn /></a>
                <a href="#"><FaGithub /></a>
            </div>

            <div className="copyright">
                <p>&copy; 2025 <span className='copyright-span user-greeting'>Rooted</span>. All rights reserved.</p>
            </div>
        </footer>
     );
}
 
export default Footer;