import React, { useState} from "react";
import '../css/login.css'
import axios from 'axios'
import { Link,Navigate } from "react-router-dom"


const Login = () =>{
    const [formData, setFormdata] = useState({username: '', password: ''});

    const handleChange = (e) => {
        setFormdata({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        axios.post('http://localhost:3605/Account/signin', {
                 username: formData.username,
                 password: formData.password
             })
             .then(result => {
                console.log(result)
                if (result.data.message === 'signin success') {
                    alert('Sign in successed')
                }
                else {
                    console.log('Login failed. Error:', result.data.error);
                    alert('Incorrect username or password. Please try again.');
                }
             })
             .catch(err => {
                 console.log(err);
                 alert('Sign in failed');
             });
             
        setFormdata({ username: '', password: '' });
    }
    


    return(
        <div className="login">
            <div className="container">
                <h1>Log in</h1>

                <div className="input-fields">
                    <form action="" onSubmit={handleSubmit}>

                        <label>
                            Username<br />
                            <input type="text" name="username" className="Typeinput" value={formData.username} onChange={handleChange} required />
                        </label><br />

                        <label>
                            Password<br /> 
                            <input type="password" name="password"  className="Typeinput" value={formData.password} onChange={handleChange} required />
                        </label><br />


                        <input type="submit" value="Log in" />
                    </form>
                    <p>Don't have account? <Link to='/signup'>Create Account</Link></p>  
                    
                </div>
            </div>
        </div>
    )
}


export default Login;