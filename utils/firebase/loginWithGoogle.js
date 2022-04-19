import { getAuth, GoogleAuthProvider, signInWithPopup } from 'firebase/auth'
export const loginWithGoogle = async (setUser) => {
    const auth = getAuth()
    const provider = new GoogleAuthProvider()
    try {
        const result = await signInWithPopup(auth, provider)
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