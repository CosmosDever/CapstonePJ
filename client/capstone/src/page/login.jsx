import React, { useState} from "react";
import '../css/login.css'
import axios from 'axios'

const Login = () =>{
    const [data, setData] = useState({username: '', password: ''});

    const handleChange = (e) => {
        setData({ ...data, [e.target.name]: e.target.value });
    };


    
    // const handleSubmit = async (e) => {
    //     e.preventDefault();
    //     console.log(data)
    //     axios.post('http://localhost:3605/Account/signin', {
    //              username: data.username,
    //              password: data.password,
    //          })
    //          .then(Response => console.log(Response))
    //          .catch(err => console.log(err))
        
    // }


    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:3605/Account/signin', {
                username: data.username,
                password: data.password,
            });
            if (response.data.status === "success") {
                alert(response.data.success);
                //navigate('/home');
                console.log('login success')
            }
            else {
                console.log('Login failed. Error:', response.data.error);
                alert('Incorrect username or password. Please try again.');
            }
        } catch (error) {
            console.error('Authentication error:', error);
            alert('Authentication failed. Please try again.');
        }
        setData({ username: '', password: '' });
    };


    return(
        <div className="login">
            <div className="container">
                <h1>Login</h1>

                <div className="input-fields">
                    <form action="" onSubmit={handleSubmit}>

                        <label>
                            Username<br />
                            <input type="text" name="username" className="Typeinput" onChange={handleChange} required />
                        </label><br />

                        <label>
                            Password<br /> 
                            <input type="password" name="password"  className="Typeinput" onChange={handleChange} required />
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