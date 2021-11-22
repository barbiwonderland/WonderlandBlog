import React, { createContext, useContext } from "react";
import { useState, useEffect } from "react";
import { auth } from "../firebase";
const AuthContext = createContext();
export const useAuth =()=>useContext(AuthContext)
export const AuthProvider = (props) => {
  const [currentUser, setCurrentUser] = useState({});
  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      setCurrentUser(user);
    });
  },[]);
  const signUp = (email, password) => {
    return auth.createUserWithEmailAndPassword(email, password);
  };
 const logIn = (email, password) => {
    return auth.signInWithEmailAndPassword(email, password);
  };
  const logOut = () => auth.signOut();
  const value = { signUp, logIn, logOut, currentUser };
  return(
    <AuthContext.Provider value={value}>
        {props.children}
        </AuthContext.Provider>

  )
}
