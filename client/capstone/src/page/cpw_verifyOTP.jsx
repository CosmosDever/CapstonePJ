import React, { useState} from "react";
import '../css/login.css'
import axios from 'axios'
import { Link,Navigate } from "react-router-dom"
import { axiosInstance } from "../lib/axiosInsance";


const Login = () =>{
    const [formData, setFormdata] = useState({otp: ''});

    const handleChange = (e) => {
        setFormdata({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        try{
            const response = await axiosInstance.post('Account/verifyOTP', {
                otp: formData.otp,
            })
            .then(Response => console.log(Response))
            .then((result) => {console.log(result)})
            alert("otp verified")
            
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
             
        setFormdata({ otp: '' });
    }
    


    return(
        <div className="changepassword">
            <div className="container">
                <h1>Change password</h1>

                <div className="input-fields">
                    <form action="" onSubmit={handleSubmit}>

                        <label>
                            Email<br />
                            <input type="email" name="email" value={data.email} className="Typeinput" onChange={handleChange} required />
                        </label><br />
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