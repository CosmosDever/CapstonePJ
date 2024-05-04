import React from "react";
import '../css/login.css'

const Login = () =>{

    return(
        <div className="login">
            <div className="container">
                <h1>Login</h1>
                <div className="input-fields">
                    <form action="">

                        <label>
                            Username<br />
                            <input type="text" id="username" Username="name" />
                        </label><br />

                        <label>
                            Password<br />
                            <input type="password" id="password" Username="name" />
                        </label><br />

                        <input type="submit" />
                    </form>
                    <p>Don't have account? <a href="/">Create account</a></p>  
                    
                </div>
            </div>
        </div>
    )
}


export default Login