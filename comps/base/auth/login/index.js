import { getAuth, GoogleAuthProvider, signInWithPopup, signInWithEmailAndPassword } from 'firebase/auth'
import { useState, useContext } from 'react'
import { UserContext } from '../../../../pages/_app'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import Alert from 'react-bootstrap/Alert'
import Modal from 'react-bootstrap/Modal'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import styles from './index.module.css'



const Login = ({data}) => {
    const [viewLogin, setViewLogin] = data

    const [customError, setCustomError] = useState('')

    const user = useContext(UserContext)

    const initialValues = {email: '',password: ''}

    const validationSchema = Yup.object({
        email: Yup
            .string()
            .email('Invalid Email Format')
            .required('Required'),
        password: Yup
            .string()
            .min(6, 'Must have at least 6 characters')
            .max(20, 'Must have less than 21 characters')
            .required('Required')
    })

    const onSubmit = async ({email, password}) => {
        try {
            const auth = getAuth()
            const result = await signInWithEmailAndPassword(auth, email, password)
            user?.init(result.user)
            setViewLogin(false)
        } catch (error) {
            if (error.message.includes('user-not-found')) formik.setFieldError('email', 'User not found')
            else if (error.message.includes('wrong-password')) formik.setFieldError('password', 'Wrong password')
            else setCustomError('There was an issue logging in. Please Try again')
        } 
    }

    const formik = useFormik({initialValues,validationSchema,onSubmit})
        
        
    const googleLoginHandler = async () => {
        try {
            const auth = getAuth()
            const provider = new GoogleAuthProvider()
            const result = await signInWithPopup(auth, provider)
            user.init(result.user)
            setViewLogin(false)
        } catch (error) {
            console.log(error.message)
            setCustomError('There was an issue logging in')
        }
    }

    return (  
        <>
                <Modal show={viewLogin} onHide={() => {setViewLogin(false)}}>
                    <Modal.Header closeButton={true}>
                        <Modal.Title>Login </Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Form onSubmit={formik.handleSubmit} noValidate>
                            {customError ? (
                                <Alert variant='danger'>
                                    <Alert.Heading>{customError}</Alert.Heading>
                                </Alert>
                            ) : null}
                            <Form.Group>
                                <Form.Label>Email</Form.Label>
                                <Form.Control 
                                    name='email' 
                                    placeholder='example@example.com' 
                                    value={formik.values.email} 
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    isInvalid={formik.touched.email && formik.errors.email}
                                    />
                                    {formik.touched.email ? 
                                        <Form.Control.Feedback 
                                            type={'invalid'}>
                                            {formik.errors.email}
                                        </Form.Control.Feedback> 
                                    : null}                                    
                            </Form.Group>
                            <Form.Group>
                                <Form.Label>Password</Form.Label>
                                <Form.Control 
                                    name='password' 
                                    placeholder='********'
                                    type='password'
                                    value={formik.values.password} 
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    isInvalid={formik.touched.password && formik.errors.password}
                                    />
                                {formik.touched.password ? (
                                        <Form.Control.Feedback 
                                            type={'invalid'}>
                                            {formik.errors.password}
                                        </Form.Control.Feedback>               
                                    ) : null}
                            </Form.Group>
                        </Form>
                    </Modal.Body>
                    <Modal.Footer>
                        <div className={styles.buttonDiv}>
                            <Button onClick={formik.handleSubmit}>Login With Email & Password</Button>
                            <Button onClick={googleLoginHandler}>Login With Google</Button>
                        </div>
                    </Modal.Footer>
                </Modal>
        </>
    );
}
 
export default Login;