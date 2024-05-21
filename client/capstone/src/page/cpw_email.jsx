import React, { useState} from "react";
import '../css/login.css'
import { axiosInstance } from "../lib/axiosInsance";
import axios from 'axios'
import { Link,Navigate } from "react-router-dom"


const Login = () =>{
    const [formData, setFormdata] = useState({email: ''});

    const handleChange = (e) => {
        setFormdata({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        try{
            const response = await axiosInstance.post('Account/send_otp', {
                email: formData.email,
            })
            .then(Response => console.log(Response))
            .then((result) => {console.log(result)})
            alert("send OPT success")
            
        }

        catch (error) {
            console.error(error)
            if(error.response.status === 400){
                alert(error.response.data.message)
            }
            else{
                alert("Registration failed. Please try again")
            }
        }
             
        setFormdata({ email: ''});
    }
    


    return(
        <div className="changepassword">
            <div className="container">
                <h1>Change password</h1>

                <div className="input-fields">
                    <form action="" onSubmit={handleSubmit}>

                        <label>
                            Email<br />
                            <input type="email" name="email" className="Typeinput" value={formData.email} onChange={handleChange} required />
                        </label><br />


                        <input type="submit" value="Send OTP" />
                    </form>
                    
                </div>
            </div>
        </div>
    )
}


export default Login;