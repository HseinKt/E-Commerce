import { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../../context/AuthContext';
import axios from 'axios';
import ProductManager from './ProductManager';
import CategoryManager from './CategoryManager';
import '../../styles/Admin.css'

const Dashboard = () => {
    const [stats, setStats] = useState([]);
    const { token, logout } = useContext(AuthContext);

    const fetchStats = async () => {
        
        try {
            axios.get("http://localhost:8000/api/stats", 
            {
                headers:
                {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer '+ token
                }
            })
            .then((response) => {
                setStats(response.data)
            })
            .catch((error) => {
                const errorMessage = error.response?.data?.message || "No stats data found, catch error";
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

        fetchStats();
    },[])
    
    return (
        <>
            <div className="admin-wrapper">
                <h2>Admin Dashboard</h2>

                <div className="admin-grid">
                    <div className="admin-card">
                        <h3>Total Categories</h3>
                        <p>{stats.totalCategories}</p>
                    </div>
                    <div className="admin-card">
                        <h3>Total Products</h3>
                        <p>{stats.totalProducts}</p>
                    </div>
                    <div className="admin-card">
                        <h3>Total Stock</h3>
                        <p>{stats.totalStock}</p>
                    </div>
                </div>
            </div>

            <CategoryManager/>

            <ProductManager/>
        </>
    );
};

export default Dashboard;
