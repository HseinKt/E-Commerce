import { useContext, useEffect, useState } from 'react';
import '../../styles/Admin.css'
import { AuthContext } from '../../context/AuthContext';
import axios from 'axios';

const Dashboard = () => {
    const [stats, setStats] = useState(null);
    const { token, logout } = useContext(AuthContext);

    const fetchStats = async () => {
        try {
        } catch (error) {
            
        }
    }

    useEffect(() => {
        if(!token) 
            logout();
        else 
            console.log("token:", token);

        fetchStats();
    },[])
    
    return (
        <div className="admin-wrapper">
            <h2>Admin Dashboard</h2>

            <div className="admin-grid">
                <div className="admin-card">
                    <h3>Total Products</h3>
                    <p>percentage of products</p>
                </div>
                <div className="admin-card">
                    <h3>Total Categories</h3>
                    <p>percentage of categories</p>
                </div>
                <div className="admin-card">
                    <h3>Total Stock</h3>
                    <p>percentage of stocks</p>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
