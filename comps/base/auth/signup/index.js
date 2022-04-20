import { createUserWithEmailAndPassword, signInWithEmailAndPassword, updateProfile, getAuth, GoogleAuthProvider, signInWithPopup } from 'firebase/auth'
import {  useState } from 'react'
import { useContext } from 'react'
import { UserContext } from '../../../../pages/_app'
import { useFormik } from 'formik'
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage'
import * as Yup from 'yup'
import Modal from 'react-bootstrap/Modal'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import Alert from 'react-bootstrap/Alert'
import Image from 'next/image'
import styles from './index.module.css'

const SignUp = ({data}) => {
    const [viewSignUp, setViewSignUp] = data

    const [customError, setCustomError] = useState('')
    const photoType = (file) => file?.name?.split('.')[file?.name?.split('.').length - 1]

    const initialValues = {
        email: '',
        userName: '',
        password: '',
        confirmPassword: '',
        photo: {}
    }
    const validationSchema = Yup.object({
        email: Yup
            .string()
            .email('Invalid Email Format')
            .required('Required'),
        userName: Yup
            .string()
            .min(5, 'Must hava at least 5 characters')
            .max(20, 'Must have no more than 20 characters')
            .required('Required'),
        password: Yup
            .string()
            .min(5, 'Must have at least 5 characters')
            .max(20, 'Must have less than 21 characters')
            .required('Required'),
        confirmPassword: Yup
            .string()
            .min(5, 'Must have at least 5 characters')
            .max(20, 'Must have no more than 20 characters')
            .required('Required')
            .test('passwordMatches', 'does not match', (value, context) => {
                return value === formik.values.password
            }),
        photo: Yup
            .mixed()
            .test('fileType', 'Incorrect File Type', (value, context) => {
                if (value?.type) return value?.type?.includes('image')
                else return true
            })
    })


    const onSubmit = async ({email, userName, password, photo}) => {
        const auth = getAuth()
        try {
            const type = photoType(photo)
            if (!type) return formik.setFieldError('photo', 'File Not Selected')
        } catch (error) {
            return setCustomError('There was an internal error. Please try again')
        }
        try {await createUserWithEmailAndPassword(auth, email, password)} 
        catch (error) {
            if (error.message.includes('email-already-in-use')) formik.setFieldError('email', 'Email Already In Use')
            return setCustomError('Did not create account - Please try again')
        }
        try {
            const result = await signInWithEmailAndPassword(auth, email, password)
            user.reInit(result)
        } 
        catch (error) {
            return setCustomError('Created Account but could not log in - Please reload the page and attempt to login again')
        }
        try {
            const type = photoType(photo)
            const storage = getStorage()
            const storageRef = ref(storage, `/users/${email}.${type}`)
            await uploadBytes(storageRef, photo)
            const photoURL =  await getDownloadURL(storageRef)
            await updateProfile(auth.currentUser, {displayName: userName, photoURL})
        } catch (error) {
            console.log(error)
            return setCustomError('Created Account but could not set profile picture - visit your account page to try manually changing the profile photo.')
        }
        setViewSignUp(false)
    }

    const formik = useFormik({initialValues, validationSchema, onSubmit})
    const user = useContext(UserContext)

    const loginWithGoogleHandler = async () => {
        try {
            const auth = getAuth()
            const provider = new GoogleAuthProvider()
            const result = await signInWithPopup(auth, provider)
            user.reInit(result)
            setViewSignUp(false)
        } catch (error) {
            setCustomError('There was an issue signing up with google')
        }
    }

    return (  
        <>
            <Modal show={viewSignUp} onHide={() => {setViewSignUp(false)}} fullscreen={0} size={'lg'}>
                <Modal.Header closeButton={true}>
                    <Modal.Title>Sign Up</Modal.Title>
                </Modal.Header>
                <Modal.Body className={styles.modalBody}>
                    <Form className={styles.mainForm} onSubmit={formik.handleSubmit}>
                        {customError ? <Alert variant={'danger'}><Alert.Heading>{customError}</Alert.Heading></Alert> : null}
                        <Form.Group>
                            <Form.Label>Email</Form.Label>
                            <Form.Control
                                name={'email'}
                                onBlur={formik.handleBlur} 
                                value={formik.values.email} 
                                onChange={formik.handleChange}
                                placeholder={'example@example.com'}
                                isInvalid={formik.touched.email && formik.errors.email}
                                />
                            {formik.touched.email && formik.errors.email ? (
                                <Form.Control.Feedback 
                                    type={'invalid'}>
                                    {formik.errors.email}
                                </Form.Control.Feedback>
                            ) : null}
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>User Name</Form.Label>
                            <Form.Control
                                name={'userName'}
                                onBlur={formik.handleBlur} 
                                value={formik.values.userName}
                                onChange={formik.handleChange}
                                isInvalid={formik.touched.userName && formik.errors.userName}
                                />
                            {formik.touched.userName && formik.errors.userName ? (
                                <Form.Control.Feedback 
                                    type={'invalid'}>
                                    {formik.errors.userName}
                                </Form.Control.Feedback>
                            ) : null}
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>Password</Form.Label>
                            <Form.Control
                                name={'password'}
                                onBlur={formik.handleBlur} 
                                value={formik.values.password} 
                                onChange={formik.handleChange}
                                placeholder={'********'}
                                isInvalid={formik.touched.password && formik.errors.password}
                                />
                            {formik.touched.password && formik.errors.password ? (
                                <Form.Control.Feedback 
                                    type={'invalid'}>
                                    {formik.errors.password}
                                </Form.Control.Feedback>
                            ) : null}
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>Confirm Password</Form.Label>
                            <Form.Control
                                name={'confirmPassword'}
                                onBlur={formik.handleBlur} 
                                value={formik.values.confirmPassword} 
                                onChange={formik.handleChange}
                                placeholder={'********'}
                                isInvalid={formik.touched.confirmPassword && formik.errors.confirmPassword}
                                />
                            {formik.touched.confirmPassword && formik.errors.confirmPassword ? (
                                <Form.Control.Feedback 
                                    type={'invalid'}>
                                    {formik.errors.confirmPassword}
                                </Form.Control.Feedback>
                            ) : null}
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>Profile Picture</Form.Label>
                            <Form.Control
                                name={'photo'}
                                onBlur={formik.handleBlur} 
                                type={'file'} 
                                accept={'image/*'} 
                                onChange={(e) => {formik.setFieldValue('photo', e.target.files[0], true)}}
                                isInvalid={formik.touched.photo && formik.errors.photo}
                                />
                            {formik.touched.photo && formik.errors.photo ? (
                                <Form.Control.Feedback 
                                    type={'invalid'}>
                                    {formik.errors.photo}
                                </Form.Control.Feedback>
                            ) : null}
                        </Form.Group>
                    </Form>
                    <p>{formik.photo?.name}</p>
                    {formik.values.photo?.name ? <Image src={URL.createObjectURL(formik.values.photo)} width={'300px'} height={'300px'}/> : null}
                </Modal.Body>
                <Modal.Footer className={styles.modalFooter}>
                    <Button onClick={loginWithGoogleHandler}>Sign Up With Google</Button>
                    <div className={styles.secondaryButtonDiv}>
                        <Button onClick={formik.handleSubmit}>Sign Up</Button>
                        <Button onClick={() => {setViewSignUp(false)}}>Cancel</Button>
                    </div>
                </Modal.Footer>
            </Modal>
        </>
    );
}
 
export default SignUp;