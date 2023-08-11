import React, { useContext, useEffect, useState } from 'react'
import {auth } from '../firebase'
import {signOut,createUserWithEmailAndPassword,signInWithEmailAndPassword,onAuthStateChanged} from 'firebase/auth'
import { addDoc, collection, doc, getDoc, getDocs, serverTimestamp, setDoc,deleteDoc } from "firebase/firestore"; 
import {db} from '../firebase'
const AuthContext = React.createContext();

export function useAuth(){ // this is the function to get the values from the auth
    return useContext(AuthContext)
}

export function AuthProvider({children}) {
    const [currentUser,setCurrentUser] = useState();
    const [loading,setLoading] = useState(true);
    const [fetchedData,setFetchedData] = useState([]);
    const [currentFile,setCurrentFile] = useState("");
    function signUp(email,password){
        return createUserWithEmailAndPassword(auth,email,password);
    }
    function login(email,password){
        return signInWithEmailAndPassword(auth,email,password);
    }

    function logingOut(){
        return signOut(auth);
    }
    async function checkDatabaseFiles(file){
        if(!currentUser) return null;
        try{
            const docRef = doc(db,currentUser.uid,file);
            const docSnap = await getDoc(docRef);
            if(docSnap.exists() || file === "") return true;
            else return false;
        }
        catch(error){
            console.log("error in having ",error)
        }
    }
    async function saveToDatabase(data){
        // saving to database things happens here and
        console.log(data)
        if(!currentUser) return
        const sanitizedData = JSON.parse(JSON.stringify(data));
        console.log("sanatized data",sanitizedData)
        console.log(data);
        var fileName = prompt("Enter the name of file");
        while(await checkDatabaseFiles(fileName)){
            console.log("Give different file name")
            window.alert("Choose different file name")
            fileName = prompt("Enter the name of file");
        }
        await setDoc(doc(db,currentUser.uid,fileName),{
            timestamp:serverTimestamp(),
            data:sanitizedData,
            fileName:fileName
        });
        fetchFromDatabase(currentUser)
    }

    async function fetchFromDatabase(user){
        if(!user) return;
        const userSnapshot = await getDocs(collection(db, user.uid));
        setFetchedData([])
        userSnapshot.forEach((doc) => {
            setFetchedData((prevData)=> [...prevData,doc.data()])
        });
    }
    async function deleteFileName(fileName){
        if(!currentUser) return
        try{
            const userSnapshot = await doc(db,currentUser.uid,fileName);

            console.log(userSnapshot)
            await deleteDoc(userSnapshot);
        console.log('Document deleted successfully!');
        return "1";
      } catch (error) {
        console.error('Error deleting document: ', error);
        return "0";
        }
    }
    
    useEffect(()=>{
        const unSubscribe = onAuthStateChanged(auth,(user)=>{
            // TODO:: getting user files from the database here....
            console.log(user)
            setLoading(false);
            setCurrentUser(user);
            fetchFromDatabase(user);
        })
        return unSubscribe;
    },[])

    const value={
        currentUser,
        signUp,
        login,
        logingOut,
        saveToDatabase,
        fetchedData,
        deleteFileName,
    }
   
  return (
    <AuthContext.Provider value={value}>
        {!loading && children}
    </AuthContext.Provider>
  )
}
