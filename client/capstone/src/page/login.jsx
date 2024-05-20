import React, { useState} from "react";
import '../css/login.css'
import axios from 'axios'
import { Link,Navigate } from "react-router-dom"
import { axiosInstance } from "../lib/axiosInsance";


const Login = () =>{
    const [formData, setFormdata] = useState({username: '', password: ''});

    const handleChange = (e) => {
        setFormdata({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        axiosInstance.post('Account/signin', {
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
                    alert('Incorrect username or password Please try again.');
                }
             })
             .catch(err => {
                 console.log(err);
                 if(err.response.status === 400){
                    alert(err.response.data.message)
                }
                else{
                    alert("Sign in failed Please try again")
                }
             });
             
        setFormdata({ username: '', password: '' });
    }
    


    return(
        <div className="login">
            <div className="container">
                <h1>Sign in</h1>

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
                    <p><Link to='/changepassword'>Forget your password?</Link></p>
                    
                </div>
            </div>
        </div>
    )
}


export default Login;