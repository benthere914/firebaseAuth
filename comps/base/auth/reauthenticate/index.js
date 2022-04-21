import { getAuth, GoogleAuthProvider, reauthenticateWithPopup } from 'firebase/auth'
import Alert from 'react-bootstrap/Alert'
import Modal from 'react-bootstrap/Modal'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import { useState, useContext } from 'react'
import { UserContext } from '../../../../pages/_app'
import styles from './index.module.css'
import { useRouter } from 'next/router'
import * as Yup from 'yup'
import { useFormik } from 'formik'
const Reauthenticate = ({data}) => {
    const router = useRouter()
    const [viewReauthenticate, setViewReauthenticate, setShowChangePassword, authenticated, setAuthenticated] = data
    const initialValues = {email: '',password: ''}
    const [customError, setCustomError] = useState('')
    const onSubmit = ({email, password}) => {
        try {
            const auth = getAuth()
            const result = signInWithEmailAndPassword(auth, email, password)
            user.init(result)
            setShowChangePassword(true)
            setViewReauthenticate(false)
            setAuthenticated(true)
        } catch (error) {
            console.log(error)
            setCustomError('Did not reauthenticate - please try again.')
        }
    }
    const validationSchema = Yup.object({
        email: 
            Yup.string()
            .required('Required')
            .email("Not a valid email")
            .test('matchesCurrentUser', 'Does not match current user', (value, context) => {
                const auth = getAuth()
                return auth.currentUser.email === value
            }),
        password: 
            Yup.string()
            .required('Required')
            .min(6, 'Must have at least 6 characters')
            .max(20, 'Must have no more than 20 characters')
    })

    const formik = useFormik({initialValues, onSubmit, validationSchema})
    const user = useContext(UserContext)
    const googleLoginHandler = async () => {
        try {
            const auth = getAuth()
            const provider = new GoogleAuthProvider()
            const result = await reauthenticateWithPopup(auth.currentUser, provider)
            user.init(result)
            setShowChangePassword(false)
            setViewReauthenticate(false)
            setAuthenticated(true)
        } catch (error) {
            error.message.includes('user-mismatch') ? setCustomError('Incorrect user') : setCustomError(JSON.stringify(error.message))
        }
    }


    const closeHandler = () => {
        setViewReauthenticate(false)
        if (!authenticated) router.back()
    }

    return (  
        <>
                <Modal show={viewReauthenticate} onHide={closeHandler}>
                    <Modal.Header closeButton={true}>
                        <Modal.Title>Re-Authenticate </Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Form onSubmit={(e) => {e.preventDefault()}}>
                            {customError ? <Alert variant='danger'><Alert.Heading>{customError}</Alert.Heading></Alert> : null}
                            <Form.Group>
                                <Form.Label>Email</Form.Label>
                                <Form.Control 
                                    placeholder='example@example.com' 
                                    name='email'
                                    value={formik.values.email} 
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    isInvalid={formik.touched.email && formik.errors.email}
                                    />
                                {formik.touched.email && formik.errors.email ? <Form.Control.Feedback type='invalid'>{formik.errors.email}</Form.Control.Feedback> : null }
                            </Form.Group>
                            <Form.Group>
                                <Form.Label>Password</Form.Label>
                                <Form.Control 
                                    placeholder='********' 
                                    name='password'
                                    value={formik.values.password} 
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    isInvalid={formik.touched.password && formik.errors.password}
                                    />
                                {formik.touched.password && formik.errors.password ? <Form.Control.Feedback type='invalid'>{formik.errors.password}</Form.Control.Feedback> : null}
                            </Form.Group>
                        </Form>
                    </Modal.Body>
                    <Modal.Footer>
                        <div className={styles.buttonDiv}>
                            <Button onClick={formik.handleSubmit}>Re-Authenticate With Email & Password</Button>
                            <Button onClick={googleLoginHandler}>Re-Authenticate With Google</Button>
                        </div>
                    </Modal.Footer>
                </Modal>
        </>
    );
}
 
export default Reauthenticate;