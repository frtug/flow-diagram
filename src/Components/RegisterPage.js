import React, { useRef, useState } from 'react'
import { Link,useNavigate } from 'react-router-dom'

import {useAuth} from '../contexts/AuthContext'

export default function SignUpPage() {
    const email = useRef();
    const password = useRef()
    const confirmPassword = useRef();
    const {signUp} = useAuth();
    const [error,setError] = useState("");
    const [loading,setLoading] = useState(false);
    const navigate = useNavigate();
    
    const handleClick = async (e)=>{
        // creating a firebase user here and send to the server;
        e.preventDefault();
        console.log("user");
        if(password.current.value !== confirmPassword.current.value){
            console.log("match password")
           return setError("password do not Match");
        }
        try{
            setLoading(true)
            setError('')
            await signUp(email.current.value,password.current.value);
            navigate("/")
        }
        catch{
            setError("Failed to create your account",error);
        }
        setLoading(false)
    }

    return (
        <div className="text-center m-5-auto">
            <h2>Join us</h2>
            <h5>Create your personal account</h5>
            {error !== "" && <p>error</p>}
            <form onSubmit={handleClick} action="/home">
                <p>
                    <label>Email address</label><br/>
                    <input ref={email} type="email" name="email" required />
                </p>
                <p>
                    <label>Password</label><br/>
                    <input ref={password} type="password" name="password" required />
                </p>
                <p>
                    <label>Confirm Password</label><br/>
                    <input ref={confirmPassword} type="password" name="confirm_password" required />
                </p>
                {/* <p>
                    <input type="checkbox" name="checkbox" id="checkbox" required /> <span>I agree all statements in <a href="https://google.com" target="_blank" rel="noopener noreferrer">terms of service</a></span>.
                </p> */}
                <p>
                    <button disabled={loading} id="sub_btn" type="submit" >Register</button>
                </p>
            </form>
            <footer>
                <p><Link to="/">Back to Homepage</Link>.</p>
            </footer>
        </div>
    )

}
