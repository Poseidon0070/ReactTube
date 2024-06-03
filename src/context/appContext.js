import { createContext, useState } from "react";
import { useContext } from "react";
import {firebaseApp}  from './firebase'
import { getAuth, signInWithPopup, signOut, GoogleAuthProvider } from 'firebase/auth'

const AppContext = createContext(null)
export const auth = getAuth(firebaseApp)

let AppContextProvider = ({children}) => {
    const googleProvider = new GoogleAuthProvider();
    let [isSidebarOpen, setSidebarOpen] = useState(true)
    let [user, setUser] = useState(null)
    let [savedVideos, setSavedVideos] = useState([])

    const signupWithGoogle = async() => {
        signInWithPopup(auth, googleProvider)
        .then((result) => { 
            console.log("Login Successfull")
            setUser(result.user)
        }).catch(err => {
            console.log(err)
        })
    }

    const signOutUser = async() => {
        return signOut(auth).then((res) => {
          console.log('Logout Successfull')
          setUser(null)
        }).catch(err => {
          console.log(err)
        })
    }

    return (
        <AppContext.Provider value={{
            isSidebarOpen,
            setSidebarOpen,
            signupWithGoogle,
            signOutUser,
            user,
            setUser,
            savedVideos,
            setSavedVideos
            }} >
            {children}
        </AppContext.Provider>
    )
}

export default AppContextProvider

export const useAppContext = () => useContext(AppContext)