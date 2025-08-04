import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../context/AuthContext";
import axios from "axios";
import '../../styles/ProductManager.css'

const ProductManager = () => {

    const { token } = useContext(AuthContext);
    const [ categories, setCategories ] = useState([]);
    const [ products, setProducts ] = useState([]);

    const [ formData, setFormData ] = useState({
        name: '', description: '', price: '', quantity: '', category: '', image: ''
    })
    // const [ name, setName ] = useState('');
    // const [ description, setDescription ] = useState('');
    // const [ price, setPrice ] = useState('');
    // const [ quantity, setQuantity ] = useState('');
    // const [ category, setCategory ] = useState('');
    // const [ image, setImage ] = useState('');
    
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
                alert(response.data.message)
                setFormData({ name: '', description: '', price: '', quantity: '', category: '', image: ''})
                fetchProducts();
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

    const handleChange = (e) => {
        setFormData({...formData, [e.target.name]: e.target.value });
    };

    const handleDelete = async (e) => {

    };

    const handleUpdate = async (e) => {
        
    };

    return ( 
        <div className="admin-wrapper">
            <h2>Product Manager</h2>

            <div className="admin-manager">
                <form onSubmit={handleSubmit} className="admin-form">
                    <input type="text" name="name" placeholder="Name" required
                        value={formData.name} 
                        onChange={handleChange} 
                    />

                    <select type="text" name="category" placeholder="category" required
                        value={formData.category} 
                        onChange={handleChange}
                    >
                        <option value="">select category</option>
                        {categories.map(cat => (
                            <option key={cat._id} value={cat._id}>{cat.name}</option>
                        ))}
                    </select>

                    <input type="text" name="price" placeholder="price" required
                        value={formData.price} 
                        onChange={handleChange} 
                    />

                    <input type="text" name="quantity" placeholder="quantity" required
                        value={formData.quantity} 
                        onChange={handleChange}
                    />

                    <textarea type="text" name="description" placeholder="description" required
                        value={formData.description} 
                        onChange={handleChange}
                    />

                    <input type="text" name="image" placeholder="image" required
                        value={formData.image} 
                        onChange={handleChange}
                    />
                    
                    <button type="submit">Add</button>
                </form>

                <table className="admin-table">
                    <thead>
                        <tr>
                            {/* <th>Preview</th> */}
                            <th>Name</th>
                            <th>Price</th>
                            <th>Qty</th>
                            <th>Description</th>
                            <th>Category</th>
                            <th>⚙️</th>
                        </tr>
                    </thead>
                    <tbody>
                        {products.map(p => (
                            <tr key={p._id}>
                                <td>
                                    <img src={p.image} alt={p.name} />
                                    <div>{p.name}</div>
                                </td>
                                {/* <td>{p.name}</td> */}
                                <td>${p.price}</td>
                                <td>{p.quantity}</td>
                                <td>{p.description}</td>
                                <td>{p.category?.name}</td>
                                <td>
                                    <button onClick={() => handleDelete(p._id)}>🗑</button>
                                    <button onClick={() => handleUpdate(p._id)}>Edit</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
     );
}
 
export default ProductManager;