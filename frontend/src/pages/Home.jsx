import Navbar from "../components/Navbar";
import '../styles/Home.css';
import Products from "./Products";

const Home = () => {
    return ( 
        <>
            <Navbar/>
        
            <div className="home-container">
                <h1>Welcome to the Rooted </h1>
                <p>Your trusted source for healthy, organic food. 🌿</p>
            </div>

            <Products/>
            
        </>
     );
}
 
export default Home;