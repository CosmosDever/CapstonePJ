import React, { useState,useEffect } from "react";
import '../css/login.css'

const Login = () =>{
    const [data, setData] = useState({username: '', pw: '',});

    const handleChange = (e) => {
        setData({ ...data, [e.target.name]: e.target.value });
    };


    //อันนี้ใส่ไว้เป็นdummyก่อน
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:3009/', {
                username: data.username,
                pw: data.pw,
            });
            if (response.data.status === "success") {
                alert(response.data.success);
                navigate('/home');
            }
            else {
                console.log('Login failed. Error:', response.data.error);
                alert('Incorrect username or password. Please try again.');
            }
        } catch (error) {
            console.error('Authentication error:', error);
            alert('Authentication failed. Please try again.');
        }
        setFormData({ username: '', pw: '' });
    };
    


    return(
        <div className="login">
            <div className="container">
                <h1>Login</h1>

                <div className="input-fields">
                    <form action="" onSubmit={handleSubmit}>

                        <label>
                            Username<br />
                            <input type="text" id="username" className="Typeinput" onChange={handleChange} required />
                        </label><br />

                        <label>
                            Password<br /> 
                            <input type="password" id="password"  className="Typeinput" onChange={handleChange} required />
                        </label><br />


                        <input type="submit" value="Log in" />
                    </form>
                    <p>Don't have account? <a href="/">Create account</a></p>  
                    
                </div>
            </div>
        </div>
    )
}


export default Login;