import { useState, createContext, useEffect } from 'react'
import { getAuth } from 'firebase/auth';
import useLocalStorage from '../utils/storage/useLocalStorage'
import { app } from '../utils/firebase';
import NavBar from '../comps/base/navBar';
import '../styles/globals.css'
import 'bootstrap/dist/css/bootstrap.min.css';

export const UserContext = createContext()
function MyApp({ Component, pageProps }) {
  const [user, dispatchUser] = useLocalStorage('user')
  const setUserValue = (valueName, valueData) => dispatchUser({type: 'setValue', payload: {valueName, valueData}})

  const init = ({displayName, email, photoURL, stsTokenManager}) => {
    setUserValue('displayName', displayName)
    setUserValue('email', email)
    setUserValue('photoURL', photoURL)
    setUserValue('loggedIn', true)
    setUserValue('tokenData', stsTokenManager)
  }

  const reset = () => dispatchUser({type: 'reset'})

  useEffect(() => {
      const auth = getAuth()
      auth.onAuthStateChanged(user => user ? init(user) : null)
    }, [])
  return (
    <>
      <UserContext.Provider value={{user, dispatchUser, init, setUserValue, reset}}>
        <NavBar/>
        <Component {...pageProps}/>
      </UserContext.Provider>
    </>
  )
}

export default MyApp
