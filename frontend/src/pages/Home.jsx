import { useRef } from "react";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import '../styles/Home.css';
import Products from "./Products";

const Home = () => {
    const mainRef = useRef(null);
    const productRef = useRef(null);
    
    return ( 
        <>
            <Navbar mainRef={mainRef} productRef={productRef}/>
        
            <div className="home-container" ref={mainRef}>
                <h1>Welcome to the Rooted </h1>
                <p>Your trusted source for healthy, organic food. 🌿</p>
            </div>

            <Products productRef={productRef}/>
            
            <div>
                <img src="/src/assets/breakfast-table.jpg" alt="image-back" className="image-back"/>
            </div>

            <Footer/>
        </>
     );
}
 
export default Home;