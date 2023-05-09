import React, { useContext, useEffect, useState } from 'react'
import {auth } from '../firebase'
import {signOut,createUserWithEmailAndPassword,signInWithEmailAndPassword,onAuthStateChanged} from 'firebase/auth'

const AuthContext = React.createContext();

export function useAuth(){ // this is the function to get the values from the auth
    return useContext(AuthContext)
}
export function AuthProvider({children}) {
    const [currentUser,setCurrentUser] = useState();
    const [loading,setLoading] = useState(true);

    function signUp(email,password){
        return createUserWithEmailAndPassword(auth,email,password);
    }
    function login(email,password){
        return signInWithEmailAndPassword(auth,email,password);

    }
    function logingOut(){
        return signOut(auth);
    }
    
    useEffect(()=>{
        const unSubscribe = onAuthStateChanged(auth,(user)=>{
            console.log(user)
            setLoading(false)
            setCurrentUser(user);
        })
        return unSubscribe;
    },[])
    const value={
        currentUser,
        signUp,
        login,
        logingOut
    }
   
  return (
    <AuthContext.Provider value={value}>
        {!loading && children}
    </AuthContext.Provider>
  )
}
