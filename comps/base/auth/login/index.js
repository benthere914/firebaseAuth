
import { loginWithGoogle } from '../../../../utils/firebase/loginWithGoogle'
import { loginWithEmailAndPassword } from '../../../../utils/firebase/loginWithEmailAndPassword'
import Alert from 'react-bootstrap/Alert'
import Modal from 'react-bootstrap/Modal'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import { useState, useContext } from 'react'
import { UserContext } from '../../../../pages/_app'
import styles from './index.module.css'
const Login = ({data}) => {
    const [viewLogin, setViewLogin] = data
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const user = useContext(UserContext)
    const googleLoginHandler = () => {
        loginWithGoogle(user.setUser)
        setViewLogin(false)
    }
    const emailPasswordLoginHandler = () => {
        loginWithEmailAndPassword(email, password, user.setUser)
    }

    return (  
        <>
                <Modal show={viewLogin} onHide={() => {setViewLogin(false)}}>
                    <Modal.Header closeButton={true}>
                        <Modal.Title>Login</Modal.Title>
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
                            <Button onClick={emailPasswordLoginHandler}>Login With Email & Password</Button>
                            <Button onClick={googleLoginHandler}>Login With Google</Button>
                        </div>
                    </Modal.Footer>
                </Modal>
        </>
    );
}
 
export default Login;