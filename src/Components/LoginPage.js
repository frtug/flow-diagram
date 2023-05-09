import React, { useRef, useState } from 'react'
import { Link,useNavigate } from 'react-router-dom'
import { signInWithEmailAndPassword} from 'firebase/auth'
import {useAuth} from '../contexts/AuthContext'
 

export default function SignInPage() {

    const email = useRef();
    const password = useRef();
    const {login} = useAuth();
    const [error,setError] = useState('');
    const navigate = useNavigate();

    const CheckVerification = async (e) => {
        e.preventDefault();
        console.log("emails");
        // firebase authentication for login
        // TODO: check email and passwords are meeting the critera 
        try{
            setError('');
            console.log("hua login")

            await login(email.current.value,password.current.value);
            navigate("/")
        }
        catch{
            setError('Error while sign in')
        }
    } 
    return (
        <div className="text-center m-5-auto">
            <h2>Sign in to us</h2>
            {error === '' && <h3>error</h3>}
            <form action="/">
                <p>
                    <label>Username or email address</label><br/>
                    <input ref={email} type="text" name="first_name" required />
                </p>
                <p>
                    <label>Password</label>
                    <Link to="/forget"><label className="right-label">Forget password?</label></Link>
                    <br/>
                    <input ref={password} type="password" name="password" required />
                </p>
                <p>
                    <button id="sub_btn" type="submit" onClick={CheckVerification}>Login</button>
                </p>
            </form>
            <footer>
                <p>First time? <Link to="/signup">Create an account</Link>.</p>
                <p><Link to="/">Back to Homepage</Link>.</p>
            </footer>
        </div>
    )
}
