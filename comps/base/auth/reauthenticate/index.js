
import { loginWithGoogle } from '../../../../utils/firebase/loginWithGoogle'
import { loginWithEmailAndPassword } from '../../../../utils/firebase/loginWithEmailAndPassword'
import Alert from 'react-bootstrap/Alert'
import Modal from 'react-bootstrap/Modal'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import { useState, useContext } from 'react'
import { UserContext } from '../../../../pages/_app'
import styles from './index.module.css'
import { useRouter } from 'next/router'
const Reauthenticate = ({data}) => {
    const router = useRouter()
    const [viewReauthenticate, setViewReauthenticate, setShowChangePassword] = data
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const user = useContext(UserContext)
    const googleLoginHandler = async () => {
        await loginWithGoogle(user.setUser)
        setShowChangePassword(false)
        setViewReauthenticate(false)
    }
    const emailPasswordLoginHandler = async () => {
        await loginWithEmailAndPassword(email, password, user.setUser)
        setShowChangePassword(true)
        setViewReauthenticate(false)
    }

    return (  
        <>
                <Modal show={viewReauthenticate} onHide={() => {setViewReauthenticate(false)}}>
                    <Modal.Header closeButton={true}>
                        <Modal.Title>Re-Authenticate </Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Form onSubmit={(e) => {e.preventDefault()}}>
                            <Form.Group>
                                <Form.Label>Email</Form.Label>
                                <Form.Control placeholder='example@example.com' value={email} onChange={(e) => {setEmail(e.target.value)}}/>
                            </Form.Group>
                            <Form.Group>
                                <Form.Label>Password</Form.Label>
                                <Form.Control placeholder='********' value={password} onChange={(e) => {setPassword(e.target.value)}}/>
                            </Form.Group>
                        </Form>
                    </Modal.Body>
                    <Modal.Footer>
                        <div className={styles.buttonDiv}>
                            <Button onClick={emailPasswordLoginHandler}>Re-Authenticate With Email & Password</Button>
                            <Button onClick={googleLoginHandler}>Re-Authenticate With Google</Button>
                        </div>
                    </Modal.Footer>
                </Modal>
        </>
    );
}
 
export default Reauthenticate;