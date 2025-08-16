import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import '../styles/Products.css'

const Products = ( {productRef} ) => {
    const { token, logout } = useContext(AuthContext);
    const [products, setProducts] = useState([]);
    const [categories, setCategories] = useState([]);

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

    const fetchCategories = async () => {

        try {
            axios.get("http://localhost:8000/api/category",
            {
                headers:
                {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer '+ token
                }
            })
            .then((response) => {
                setCategories(response.data.categories)
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
        fetchCategories();
    }, [])

    return ( 
        <div ref={productRef} className="product-container">

            <h2>Healthy eating</h2>

            {categories.map(category => {

                const filteredProducts = products.filter( p => (
                    p.category && (p.category._id === category._id)
                ));
                
                if (filteredProducts.length === 0) return null; // skip empty categories

                return (
                    <div key={category._id} className="category-section">
                        <h3 className="category-title">{category.name}</h3>

                        <div className="grid">
                            {filteredProducts.map(product => (
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
            })}
        </div>
    );
}
 
export default Products;