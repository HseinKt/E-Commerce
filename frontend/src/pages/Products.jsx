import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import '../styles/Products.css'

const Products = () => {
    const { token, logout } = useContext(AuthContext);
    const [products, setProducts] = useState([]);

    const fetchProducts  = async () => {
        
        try {
            axios.get("http://localhost:8000/api/products", 
            {
                headers:
                {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer '+ token
                }
            })
            .then((response) => {
                setProducts(response.data.products)
            })
            .catch((error) => {
                const errorMessage = error.response?.data?.message || "No fetch data found, catch error";
                console.log("errorMessage in catch axios", errorMessage);
                alert( errorMessage);
            })
        } catch (error) {
            console.error("Error during fetching:", error);
        }
    }

    useEffect(() => {
        if(!token) 
            logout();

        fetchProducts();
    }, [])

    return ( 
        <div className="product-container">
            <h2>Healthy eating</h2>

            <div className="grid">
                {products.map(product => (
                <Link to={`/products/${product._id}`} className="product-link" key={product._id}>
                    <div className="product-card">
                        <img src={`http://localhost:8000${product.image}?t=${Date.now()}`} alt={product.name} className="product-image"/>
                        <p className="product-price">${product.price}</p>
                        <h3 className="product-name">{product.name}</h3>
                        <div className="stars">
                            ★★★★★
                        </div>
                    </div>
                </Link>
                ))}
            </div>
        </div>
     );
}
 
export default Products;