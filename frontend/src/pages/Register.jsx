import { useState } from "react";
import '../styles/Login_Register.css';
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Register = () => {
    const navigate = useNavigate();
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [role, setRole] = useState("user");
    const [repeat_password, setRepeat_password] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();

        if(password !== repeat_password) {
            alert("Passwords do not match!");
            return;
        }

        const formData = {name, email, password, role};

        try {
            axios.post('http://localhost:8000/api/auth/register', formData)
            .then((response) => {
                console.log("Registration successful:", response.data);
                alert("Registration successful! You can now log in.");
                navigate('/login');
            })
            .catch((error) => {
                const errorMessage = error.response?.data?.message || "Registration failed. Please try again.";
                console.error("Register error:", errorMessage);
                alert(errorMessage);
            })
        } catch (error) {
            console.error("Error during registration:", error);
            alert("Registration failed. Please try again.");
        }
    }
    return ( 
        <div className="register-container">
            <div className="register-card">
                <h2 className="register-title">Create an account</h2>
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label htmlFor="name">Name:</label>
                        <input 
                            type="text" 
                            id="name" 
                            name="name" 
                            className="register-input"
                            placeholder="Name"
                            value={name} 
                            onChange={(e) => setName(e.target.value)}
                            required 
                        />
                    </div>
                    <div className="form-group">    
                        <label htmlFor="email">Email:</label>
                        <input 
                            type="email" 
                            id="email" 
                            name="email" 
                            className="register-input"
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
                            className="register-input"
                            placeholder="Password"
                            value={password} 
                            onChange={(e) => setPassword(e.target.value)}
                            required                     
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="password">Repeat password:</label>
                        <input 
                            type="password" 
                            id="repeat_password" 
                            name="repeat_password" 
                            className="register-input"
                            placeholder="Password"
                            value={repeat_password} 
                            onChange={(e) => setRepeat_password(e.target.value)}
                            required                     
                        />
                    </div>
                    
                    <button type="submit" className="btn_container">Register</button>
                    <p className="register-login-link">Already have an account? <a href="/login">Login</a></p>
                </form>
            </div>
        </div>
     );
}
 
export default Register;