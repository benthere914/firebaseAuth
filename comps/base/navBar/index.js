import Navbar from 'react-bootstrap/Navbar'
import Nav from 'react-bootstrap/Nav'
import Link from 'next/link';
import Login from '../auth/login';
import Logout from '../auth/logout';
import SignUp from '../auth/signup';
import styles from './index.module.css'
import { useEffect, useState, useContext } from 'react';
import { UserContext } from '../../../pages/_app'
const NavBar = () => {
    const user = useContext(UserContext)
    const [viewLogin, setViewLogin] = useState(false)
    const [viewLogout, setViewLogout] = useState(false)
    const [viewSignUp, setViewSignUp] = useState(false)
    return (  
        <>
            <Navbar bg='dark' variant='dark'>
                <Nav className={styles.main}>
                    <Link passHref href='/'><Nav.Link>My Dog Loki</Nav.Link></Link>
                    <div className={styles.inLine}>
                        {user?.user?.loggedIn ? (
                            <>
                                <Link passHref href='/myAccount'><Nav.Link>My Account</Nav.Link></Link>
                                <Nav.Link onClick={() => {setViewLogout(true)}}>Log Out</Nav.Link>
                            </>) : (
                            <>
                                <Nav.Link onClick={() => {setViewLogin(true)}}>Log In</Nav.Link>
                                <Nav.Link onClick={() => {setViewSignUp(true)}}>Sign Up</Nav.Link>
                            </>)}
                    </div>
                </Nav>
            </Navbar>
            <Login data={[viewLogin, setViewLogin]}/>
            <Logout data={[viewLogout, setViewLogout]}/>
            <SignUp data={[viewSignUp, setViewSignUp]}/>
        </>
    );
}
 
export default NavBar;