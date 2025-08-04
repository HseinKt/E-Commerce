import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../context/AuthContext";
import axios from "axios";

const ProductManager = () => {

    const { token } = useContext(AuthContext);
    const [ categories, setCategories ] = useState([]);
    const [ products, setProducts ] = useState([]);

    const [ name, setName ] = useState('');
    const [ description, setDescription ] = useState('');
    const [ price, setPrice ] = useState('');
    const [ quantity, setQuantity ] = useState('');
    const [ category, setCategory ] = useState('');
    const [ image, setImage ] = useState('');
    
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
                console.log("category", response.data.categories);
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

    const fetchProducts = async () => {
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
                console.log("products", response.data.products);
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
        fetchCategories();
        fetchProducts();
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();

        const formData = {name, description, price, quantity, category, image};

        try {
            axios.post("http://localhost:8000/api/products", formData,
            {
                headers:    
                {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer '+ token
                }
            })
            .then((response) => {
                console.log("products added successfully", response.data);
            })
            .catch((error) => {
                const errorMessage = error.response?.data?.message || "No data added, catch error";
                console.log("errorMessage in catch axios", errorMessage);
                alert( errorMessage);
            })
        } catch (error) {
            console.error("Error during fetching:", error);
        }
    }

    return ( 
        <div className="admin-wrapper">
            <h2>Product Manager</h2>

            <div className="admin-manager">
                <form onSubmit={handleSubmit} className="admin-form">
                    <input type="text" name="name" placeholder="Name" required
                        value={name} 
                        onChange={(e) => setName(e.target.value)} 
                    />

                    <select type="text" name="category" placeholder="category" required
                        value={category} 
                        onChange={(e) => setCategory(e.target.value)}
                    >
                        <option value="">select category</option>
                        {categories.map(cat => (
                            <option key={cat._id} value={cat._id}>{cat.name}</option>
                        ))}
                    </select>

                    <input type="text" name="price" placeholder="price" required
                        value={price} 
                        onChange={(e) => setPrice(e.target.value)} 
                    />

                    <input type="text" name="quantity" placeholder="quantity" required
                        value={quantity} 
                        onChange={(e) => setQuantity(e.target.value)}
                    />

                    <textarea type="text" name="description" placeholder="description" required
                        value={description} 
                        onChange={(e) => setDescription(e.target.value)}
                    />

                    <input type="text" name="image" placeholder="image" required
                        value={image} 
                        onChange={(e) => setImage(e.target.value)}
                    />
                    
                    <button type="submit">Add</button>
                </form>

                {/* <table className="admin-table">
                    table
                </table> */}
            </div>
        </div>
     );
}
 
export default ProductManager;