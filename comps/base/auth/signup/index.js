import Modal from 'react-bootstrap/Modal'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import { useState } from 'react'
import Image from 'next/image'
import styles from './index.module.css'
import { signUpWithEmailAndPassword } from '../../../../utils/firebase/signUpWithEmailAndPassword'
import { loginWithEmailAndPassword } from '../../../../utils/firebase/loginWithEmailAndPassword'
import { loginWithGoogle } from '../../../../utils/firebase/loginWithGoogle'
import { uploadProfielPhoto } from '../../../../utils/firebase/uploadProfilePhoto'
import { useContext } from 'react'
import { UserContext } from '../../../../pages/_app'
const SignUp = ({data}) => {
    const [viewSignUp, setViewSignUp] = data
    const user = useContext(UserContext)
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [photo, setPhoto] = useState({})
    const signUpHandler = async () => {
        await signUpWithEmailAndPassword(email, password, user.setUser)
        await loginWithEmailAndPassword(email, password, user.setUser)
        await uploadProfielPhoto(photo, email, user.setUser)
        setViewSignUp(false)
    }
    const loginWithGoogleHandler = async () => {
        await loginWithGoogle(user.setUser)
        setViewSignUp(false)
    }
    const uploadHandler = (e) => {
        setPhoto(e.target.files[0])
    }
    return (  
        <>
            <Modal show={viewSignUp} onHide={() => {setViewSignUp(false)}} fullscreen={0} size={'lg'}>
                <Modal.Header closeButton={true}>
                    <Modal.Title>Sign Up</Modal.Title>
                </Modal.Header>
                <Modal.Body className={styles.modalBody}>
                    <Form className={styles.mainForm}>
                        <Form.Group>
                            <Form.Label>Email</Form.Label>
                            <Form.Control value={email} onChange={(e) => {setEmail(e.target.value)}} placeholder={'example@example.com'}/>
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>Password</Form.Label>
                            <Form.Control value={password} onChange={(e) => {setPassword(e.target.value)}} placeholder={'********'}/>
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>Confirm Password</Form.Label>
                            <Form.Control value={confirmPassword} onChange={(e) => {setConfirmPassword(e.target.value)}} placeholder={'********'}/>
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>Profile Picture</Form.Label>
                            <Form.Control type={'file'} accept={'image/*'} onChange={(e) => {uploadHandler(e)}}/>
                        </Form.Group>
                    </Form>
                    {photo?.name ? (<Image src={URL.createObjectURL(photo)} width={'300px'} height={'300px'}/>) : (null)}
                </Modal.Body>
                <Modal.Footer className={styles.modalFooter}>
                    <Button onClick={loginWithGoogleHandler}>Sign Up With Google</Button>
                    <div className={styles.secondaryButtonDiv}>
                        <Button onClick={signUpHandler}>Sign Up</Button>
                        <Button onClick={() => {setViewSignUp(false)}}>Cancel</Button>
                    </div>
                </Modal.Footer>
            </Modal>
        </>
    );
}
 
export default SignUp;