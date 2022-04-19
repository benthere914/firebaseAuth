import { getAuth, signInWithEmailAndPassword } from 'firebase/auth'
export const loginWithEmailAndPassword = async (email, password, setUser) => {
    const auth = getAuth()
    try {
        const result = await signInWithEmailAndPassword(auth, email, password)
        setUser({
            'userName': result?.user?.displayName,
            'email': result?.user?.email,
            'icon': result?.user?.photoURL,
            'loggedIn': true
        })
    } catch (error) {
        setUser({'loggedIn': false})
    }
}