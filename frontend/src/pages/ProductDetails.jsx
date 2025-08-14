import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import '../styles/ProductDetails.css'

const ProductDetails = () => {
    const { id } = useParams();
    const [product, setProduct] = useState(null);
    const { token } = useContext(AuthContext);
    const navigate = useNavigate();

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
        
    return ( 
        <>
            {product && (
                <div className="details-container">
                    <div className="details-image">
                        <img src={`http://localhost:8000${product.image}?t=${Date.now()}`} alt={product.name} className="image"/>
                    </div>

                    <div className="details">
                        <h1 className="name">{product.name}</h1>
                        {product.category && 
                            <p className="Category"><strong>Category:</strong> {product.category.name}</p>
                        }
                        <p className="price"><strong>Price:</strong> ${product.price.toFixed(2)}</p>
                        <p className="quantity"><strong>In Stock:</strong> {product.quantity}</p>
                        <p className="description">{product.description}</p>

                        <Link onClick={() => navigate(-1)} className="back">← Back</Link>
                    </div>
                </div>
            )}
        </>
     );
}
 
export default ProductDetails;