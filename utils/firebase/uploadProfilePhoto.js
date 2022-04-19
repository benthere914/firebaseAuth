import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { getAuth, updateProfile } from "firebase/auth";

export const uploadProfielPhoto = async (file, name, setUser) => {
    const type = file.name.split('.')[file.name.split('.').length - 1]
    const storage = getStorage()
    const storageRef = ref(storage, `/users/${name}.${type}`)
    await uploadBytes(storageRef, file)
    const auth = getAuth()
    const photoURL =  await getDownloadURL(storageRef)
    const displayName = auth.currentUser.displayName
    await updateProfile(auth.currentUser, {photoURL, displayName})
    setUser({
        'userName': auth.currentUser.displayName,
        'email': auth.currentUser.email,
        'icon': auth.currentUser.photoURL,
        'loggedIn': true
    })
}