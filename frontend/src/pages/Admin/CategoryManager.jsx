import { useContext, useEffect, useRef, useState } from "react";
import { AuthContext } from "../../context/AuthContext";
import axios from "axios";
import '../../styles/ProductManager.css'

const CategoryManager = () => {

    const { token } = useContext(AuthContext);
    const [ categories, setCategories ] = useState([]);
    const [ products, setProducts ] = useState([]);
    const [ editingId, setEditingId ] = useState(null);
    const formRef = useRef(null);
    const [ name, setName ] = useState('');
    const formData = { name };
    
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
        e.preventDefault();

        try {
            axios.post("http://localhost:8000/api/category", formData,
            {
                headers:    
                {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer '+ token
                }
            })
            .then((response) => {
                setName('');
                setEditingId(null);
                fetchCategories();
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

    const handleDelete = async (id) => {
        const result = window.confirm("Are you sure you want to delete this item?");

        if(result){
            try {
                axios.delete(`http://localhost:8000/api/category/${id}`,
                {
                    headers:    
                    {
                        'Content-Type': 'application/json',
                        'Authorization': 'Bearer '+ token
                    }
                })
                .then((response) => {
                    setName('');
                    setEditingId(null);
                    fetchCategories();
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
        else {
            console.log("Deletion cancelled.");
        }
    };

    const handleEditClick = async (category) => {
        setName(category.name);
        setEditingId(category._id);
        
        formRef.current?.scrollIntoView({ behavior: 'smooth' });
    }

    const handleUpdate = async () => {
        try {
            axios.put(`http://localhost:8000/api/category/${editingId}`, formData,
            {
                headers:    
                {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer '+ token
                }
            })
            .then((response) => {
                setName('');
                setEditingId(null);
                fetchCategories();
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
            <h2 ref={formRef}>Category Manager</h2>

            <div className="admin-manager">
                <form className="admin-form">
                    <input type="text" name="name" placeholder="Name" required
                        value={name} 
                        onChange={(e) => setName(e.target.value)} 
                    />
                    
                    {editingId ? (
                        <button onClick={handleUpdate}>🔄 Update Category</button>
                    ): (
                        <button onClick={handleSubmit}>➕ Add Category</button>
                    )
                }
                </form>

                <table className="admin-table">
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>⚙️</th>
                        </tr>
                    </thead>
                    <tbody>
                        {categories.map(cat => (
                            <tr key={cat._id}>
                                <td>{cat.name}</td>
                                <td>
                                    <button onClick={() => handleDelete(cat._id)}>🗑</button>
                                    <button onClick={() => handleEditClick(cat)}>Edit</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
     );
}
 
export default CategoryManager;
