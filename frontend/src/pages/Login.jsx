import { useContext, useState } from "react";
import '../styles/Login_Register.css';
import axios from "axios";
import { AuthContext } from "../context/AuthContext";

const Login = () => {
    const { login } = useContext(AuthContext);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();

        const formData = {email, password};

        try {
            axios.post('http://localhost:8000/api/auth/login', formData)
            .then((response) => {
                login(response.data.user, response.data.token);
            })
            .catch((error) => {
                const errorMessage = error.response?.data?.message || "Login failed. Please try again.";
                console.error(errorMessage);
                setError(errorMessage);
            })
        } catch (error) {
            console.error("Error during login:", error);
            setError("Login failed. Please try again.");
        }
    }

    return ( 
        <div className="login-container">
            <div className="login-card">
                <h2 className="login-title">Login</h2>
                <form onSubmit={handleSubmit}>
                    <div className="form-group">    
                        <label htmlFor="email">Email:</label>
                        <input 
                            type="email" 
                            id="email" 
                            name="email" 
                            className="login-input"
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
                            className="login-input"
                            placeholder="Password"
                            value={password} 
                            onChange={(e) => setPassword(e.target.value)}
                            required                     
                        />
                        {error && <p className="error-message">{error}</p>}
                    </div>
                    <button type="submit" className="btn_container">Login</button>
                    <p className="register-login-link">Don't have an account? <a href="/register">Register</a></p>
                </form>
            </div>
        </div>
     );
}
 
export default Login;