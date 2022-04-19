import { getAuth, createUserWithEmailAndPassword, signInWithCredential } from 'firebase/auth'
export const signUpWithEmailAndPassword = async (email, password, setUser) => {
    const auth = getAuth()
    try {
        await createUserWithEmailAndPassword(auth, email, password)
    } catch (error) {
        console.log(error)
    }
}