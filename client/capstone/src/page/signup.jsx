import React, { useState} from "react";
import '../css/signup.css'
import axios from 'axios'

const Register = () =>{
    const [data, setData] = useState({username: '',email: '', password: '',Cpassword:''});

    const handleChange = (e) => {
        setData({ ...data, [e.target.name]: e.target.value });
    };


    const handleSubmit = async (e) => {
        e.preventDefault();

        if (data.password !== data.Cpassword) {
            alert('Password and confirm password do not match. Please try again');
            return;
        }

        try {

            const response = await axios.post('http://localhost:3605/Account/signup', {
                username: data.username,
                email: data.email,
                password: data.password,
            })


            if(response.data.status === "error"){
                alert(response.data.error)
            }
            else{
                alert(response.data.success)
                navigate('/login')
            }

        } catch (error) {
            console.error('Sign Up error', error);
            alert('Sign Up failed. Please try again.');
        }
        setData({ username: '',email: '', password: '',Cpassword:'' });
    };
    


    return(
        <div className="signup">
            <div className="container">
                <h1>Sign Up</h1>

                <div className="input-fields">
                    <form action="" onSubmit={handleSubmit}>

                        <label>
                            Username<br />
                            <input type="text"  name="username"  className="Typeinput" onChange={handleChange} required />
                        </label><br />

                        <label>
                            Email<br />
                            <input type="email" name="email"className="Typeinput" onChange={handleChange} required />
                        </label><br />

                        <label>
                            Password<br />
                            <input type="password" name="password" className="Typeinput" onChange={handleChange} required />
                        </label><br />

                        <label>
                            Confirm Password<br />
                            <input type="password" name="Cpassword"  className="Typeinput" onChange={handleChange} required />
                        </label><br />

                        <input type="submit" value="Create account" />
                    </form>
                    <p>I already have account <a href="/">Sign in</a></p>  
                    
                </div>
            </div>
        </div>
    )
}


export default Register;