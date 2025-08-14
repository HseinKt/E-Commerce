import { useContext, useEffect, useRef, useState } from "react";
import { AuthContext } from "../../context/AuthContext";
import axios from "axios";
import '../../styles/ProductManager.css'

const ProductManager = () => {

    const { token } = useContext(AuthContext);
    const [ categories, setCategories ] = useState([]);
    const [ products, setProducts ] = useState([]);
    const [ editingId, setEditingId ] = useState(null);
    const formRef = useRef(null);
    const fileInputRef = useRef(null);

    const [ formData, setFormData ] = useState({
        name: '', description: '', price: '', quantity: '', category: '', image: null
    })
    
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
        console.log("image in handleSubmit ", formData.image);

        e.preventDefault();

        try {
            const data = new FormData();
            data.append('name', formData.name);
            data.append('description', formData.description);
            data.append('price', formData.price);
            data.append('quantity', formData.quantity);
            data.append('category', formData.category);
            data.append('image', formData.image); // file object

            // for (let pair of data.entries()) {
            // console.log(pair[0], pair[1]);
            // }
            
            axios.post("http://localhost:8000/api/products", data,
            {
                headers:    
                {
                    'Authorization': 'Bearer '+ token
                }
            })
            .then((response) => {                
                fileInputRef.current && (fileInputRef.current.value = ''); //resets the file input after uploading or submiting
                setFormData({ name: '', description: '', price: '', quantity: '', category: '', image: null});
                setEditingId(null);
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

    const handleFile = (e) => {
        setFormData({...formData, image: e.target.files?.[0] || null });
    }
  
    const handleDelete = async (id) => {
        try {
            axios.delete(`http://localhost:8000/api/products/${id}`,
            {
                headers:    
                {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer '+ token
                }
            })
            .then((response) => {
                setFormData({ name: '', description: '', price: '', quantity: '', category: '', image: null});
                setEditingId(null);
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
    };

    const handleEditClick = async (product) => {
        setFormData({ 
            name: product.name,
            description: product.description,
            price: product.price, 
            quantity: product.price, 
            category: product.category?._id, 
            image: product.image
        });
        setEditingId(product._id);
        
        formRef.current?.scrollIntoView({ behavior: 'smooth' });
    }

    const handleUpdate = async (e) => {
        e.preventDefault();
        console.log("image in handleUpdate ", formData.image);
        
        try {
            const data = new FormData();
            data.append('name', formData.name);
            data.append('description', formData.description);
            data.append('price', formData.price);
            data.append('quantity', formData.quantity);
            data.append('category', formData.category);

            if (formData.image instanceof File) { // only append if it's a new file
                data.append('image', formData.image);
            }

            axios.put(`http://localhost:8000/api/products/${editingId}`, data,
            {
                headers:    
                {
                    'Authorization': 'Bearer '+ token
                }
            })
            .then((response) => {
                fileInputRef.current && (fileInputRef.current.value = '');
                setFormData({ name: '', description: '', price: '', quantity: '', category: '', image: null});
                setEditingId(null);
                fetchProducts();
            })
            .catch((error) => {
                const errorMessage = error.response?.data?.message || "No data updated, catch error";
                console.log("errorMessage in catch axios", errorMessage);
                alert( errorMessage);
            })
        } catch (error) {
            console.error("Error during fetching:", error);
        }
    };

    return ( 
        <div className="admin-wrapper">
            <h2 ref={formRef}>Product Manager</h2>

            <div className="admin-manager">
                <form className="admin-form">
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

                    <input type="file" name="image" required ref={fileInputRef}
                        onChange={handleFile}
                    />
                    
                    {editingId ? (
                        <button onClick={handleUpdate}>🔄 Update Product</button>
                    ): (
                        <button onClick={handleSubmit}>➕ Add Product</button>
                    )
                }
                </form>

                <table className="admin-table">
                    <thead>
                        <tr>
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
                                <td className="img-name-handle">
                                    <img src={`http://localhost:8000${p.image}?t=${Date.now()}`} alt={p.name} className="img-name"/>
                                    <div>{p.name}</div>
                                </td>
                                <td>${p.price}</td>
                                <td>{p.quantity}</td>
                                <td>{p.description}</td>
                                <td>{p.category?.name}</td>
                                <td>
                                    <button onClick={() => handleDelete(p._id)}>🗑</button>
                                    <button onClick={() => handleEditClick(p)}>Edit</button>
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