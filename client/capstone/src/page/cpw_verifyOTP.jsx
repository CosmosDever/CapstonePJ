import React, { useState} from "react";
import '../css/login.css'
import axios from 'axios'
import { Link,Navigate } from "react-router-dom"


const Login = () =>{
    const [formData, setFormdata] = useState({otp: ''});

    const handleChange = (e) => {
        setFormdata({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        axios.post('http://localhost:3605/Account/signin', {
                 otp: formData.otp,
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
             
        setFormdata({ otp: '' });
    }
    


    return(
        <div className="changepassword">
            <div className="container">
                <h1>Change password</h1>

                <div className="input-fields">
                    <form action="" onSubmit={handleSubmit}>

                        <label>
                            OTP<br />
                            <input type="number" name="otp" className="Typeinput" value={formData.otp} onChange={handleChange} required />
                        </label><br />


                        <input type="submit" value="Submit" />
                    </form>
                    
                </div>
            </div>
        </div>
    )
}


export default Login;