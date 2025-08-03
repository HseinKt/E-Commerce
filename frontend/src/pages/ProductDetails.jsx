import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

const ProductDetails = () => {
    const { id } = useParams();
    const [product, setProduct] = useState(null);
    const { token } = useContext(AuthContext);
console.log("id:" , id);

    const fetchProduct = async () => {
        try {
            axios.get(`http://localhost:8000/api/products/${id}`, 
            {
                headers:
                {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer '+ token
                }
            })
            .then((response) => {
                console.log("product", response.data.product);
                setProduct(response.data.product)
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
        fetchProduct();
    }, [id]);
    
    console.log("product after fetching:", product);
    
    return ( 
        <div className="details-container">
            {product && (
                <>
                <img src="/src/assets/Nuts2.png" alt={product.name} className="image"/>

                <div className="details">
                    <h2>{product.name}</h2>
                    <p className="description">{product.description}</p>
                    <p className="price"><strong>Price:</strong> ${product.price.toFixed(2)}</p>
                    <p className="quantity"><strong>In Stock:</strong> {product.quantity}</p>
                    {product.category && 
                        <p className="Category"><strong>Category:</strong> {product.category.name}</p>
                    }
                    <Link to="/" className="back">← Back to Products</Link>
                </div>
                </>
            )}
        </div>
     );
}
 
export default ProductDetails;