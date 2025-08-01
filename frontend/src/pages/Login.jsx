import { useState } from "react";
import '../styles/Login_Register.css';
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Login = () => {
    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();

        const formData = {email, password};

        try {
            axios.post('http://localhost:8000/api/auth/login', formData)
            .then((response) => {
                console.log("Login successful:", response.data);
                localStorage.setItem('token', response.data.token);
                alert("Login successful!");
                navigate('/');
            })
            .catch((error) => {
                console.error("Login error:", error);
                alert("Login failed. Please check your credentials and try again.");
            })
        } catch (error) {
            console.error("Error during login:", error);
            alert("Login failed. Please try again.");
        }
    }

    return ( 
        <div className="login-container">
            <h1>Login Page</h1>
            <form onSubmit={handleSubmit} className="form-template">
                <div className="form-group">    
                    <label htmlFor="email">Email:</label>
                    <input 
                        type="email" 
                        id="email" 
                        name="email" 
                        className="form-control"
                        placeholder="Email"
                        value={email} 
                        onChange={(e) => setEmail(e.target.value)}
                        required 
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="password">Password:</label>
                    <input 
                        type="password" 
                        id="password" 
                        name="password" 
                        className="form-control"
                        placeholder="Password"
                        value={password} 
                        onChange={(e) => setPassword(e.target.value)}
                        required                     
                    />
                </div>
                <button type="submit" className="btn_container">Login</button>
                <p>Don't have an account? <a href="/register">Register</a></p>
            </form>
        </div>
     );
}
 
export default Login;