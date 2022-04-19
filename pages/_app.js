import '../styles/globals.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import NavBar from '../comps/base/navBar';
import { useState, createContext, useEffect } from 'react'
import { app } from '../utils/firebase';
import { useLocalStorage } from '../utils/storage/useLocalStorage'
import { getAuth } from 'firebase/auth';
export const UserContext = createContext()

function MyApp({ Component, pageProps }) {
  const [user, setUser] = useLocalStorage('user')
    useEffect(() => {
        const auth = getAuth()
        auth.onAuthStateChanged((user) => {
            setUser({
                'userName': user?.displayName,
                'email': user?.email,
                'icon': user?.photoURL,
                'loggedIn': !!user?.email
            })
        })
    }, [])
  return (
    <>
      <UserContext.Provider value={{user, setUser}}>
        <NavBar/>
        <Component {...pageProps}/>
      </UserContext.Provider>
    </>
  )
}

export default MyApp
