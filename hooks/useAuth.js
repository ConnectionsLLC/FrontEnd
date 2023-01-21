import { View, Text } from 'react-native'
import React, { createContext, useContext, useEffect, useState } from 'react'
import firebase from '../firebase'
import { onSnapshot, query, doc, collection, where } from 'firebase/firestore'
import AsyncStorage from '@react-native-async-storage/async-storage'



const AuthConText = createContext({})



export const AuthProvider = ({ children }) => {

const [userInfo, setUserInfo] = useState([])
const [temp, setTemp] = useState(null)
const [currentUser, setCurrentUser] = useState('asdf')




const persistence = async () => {
  try{
    const email = await AsyncStorage.getItem("email")
    const password = await AsyncStorage.getItem("password")
    await firebase.auth().signInWithEmailAndPassword(email, password)

     }catch(e){
        setCurrentUser(null)
        console.log("No Previous Login Record Found!",e)
     }
 
  }
  const userHandler =  user =>
    user ?  setCurrentUser(user)  :  setCurrentUser(null)

    
  useEffect(
    () => {
      persistence().then( () => {
       firebase.auth().onAuthStateChanged(user => userHandler(user))
      })
     
    },
    []
  )

  
  return (
    <AuthConText.Provider value={{
        user: currentUser,
      
    }}>
        {children}
    </AuthConText.Provider>
  )
}
export default function useAuth() {
    return useContext(AuthConText)
}

