import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button'
import { useContext } from 'react'
import { UserContext } from '../../../../pages/_app'
import { getAuth } from 'firebase/auth'
const Logout = ({data}) => {
    const user = useContext(UserContext)
    const [viewLogout, setViewLogout] = data
    const logOutHandler = () => {
        const auth = getAuth()
        auth.signOut()
        user.setUser({loggedIn: false})
        setViewLogout(false)
    }
    return (  
        <>
            <Modal show={viewLogout} onHide={() => {setViewLogout(false)}}>
                <Modal.Header closeButton={true}>
                    <Modal.Title>Logout</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <p>Are you sure you want to logout? You won't have access to the site until you log back in</p>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant='danger' onClick={logOutHandler}>Yes, log me out</Button>
                    <Button variant='success' onClick={() => {setViewLogout(false)}}>No, keep me logged in</Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}
 
export default Logout;