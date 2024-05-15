import React, { useState} from "react";
import '../css/signup.css'
import axios from 'axios'
import { Link,Navigate } from "react-router-dom"

const Signup = () =>{

    const [data, setData] = useState({email: '',username: '', password: '',Cpassword:''});

    const handleChange = (e) => {
        setData({ ...data, [e.target.name]: e.target.value });
    };


    const handleSubmit = async (e) => {
        e.preventDefault();

        if (data.password !== data.Cpassword) {
            alert('Passwords do not match Please try again');
            setData({ username: '',email: '', password: '',Cpassword:'' })
            return;
            }
        
        axios.post('http://localhost:3605/Account/signup', {
                 username: data.username,
                 email: data.email,
                 password: data.password
             })
             .then(Response => console.log(Response))
             alert('Sign up successed')
             Navigate('/')
             .catch(err => console.log(err))
             alert('Sign up failed')
             
             setData({ username: '',email: '', password: '',Cpassword:'' })
    }


    return(
        <div className="signup">
            <div className="container">
                <h1>Sign up</h1>

                <div className="input-fields">
                    <form action="#" onSubmit={handleSubmit}>

                        <label>
                            Username<br />
                            <input type="text"  name="username" value={data.username} className="Typeinput" onChange={handleChange} required />
                        </label><br />

                        <label>
                            Email<br />
                            <input type="email" name="email" value={data.email} className="Typeinput" onChange={handleChange} required />
                        </label><br />

                        <label>
                            Password<br />
                            <input type="password" name="password" value={data.password} className="Typeinput" onChange={handleChange} required />
                        </label><br />

                        <label>
                            Confirm Password<br />
                            <input type="password" name="Cpassword" value={data.Cpassword} className="Typeinput" onChange={handleChange} required />
                        </label><br />

                        <input type="submit" value="Create account" />
                    </form>
                    <p>I already have account <Link to='/signin'>Signin</Link></p>  
                    
                </div>
            </div>
        </div>
    )
}


export default Signup;