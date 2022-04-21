import Alert from 'react-bootstrap/Alert'
import Tabs from 'react-bootstrap/Tabs'
import Tab from 'react-bootstrap/Tab'
import Button from 'react-bootstrap/Button'
import styles from './index.module.css'
import { useContext, useEffect, useState } from 'react';
import { UserContext } from '../_app';
import Reauthenticate from '../../comps/base/auth/reauthenticate'
import ChangeAccountData from '../../comps/pages/myAccount/changeAccountData';

import { Form } from 'react-bootstrap';
import Image from 'next/image';

const myAccount = () => {
    const user = useContext(UserContext)
    const [showChangePassword, setShowChangePassword] = useState(false)
    const [viewReauthenticate, setViewReauthenticate] = useState(false)
    const [authenticated, setAuthenticated] = useState(false)
    
    const [value, setValue] = useState('')
    const [userName, setUserName] = useState('')
    const [email, setEmail] = useState('')
    const [photo, setPhoto] = useState({})
    const [photoUrl, setPhotoUrl] = useState('')
    const [currentPassword, setCurrentPassword] = useState('')
    const [newPassword, setNewPassword] = useState('')

    useEffect(() => {
        setUserName(user?.user.userName)
        setEmail(user?.user.email)
        console.log(user?.user)
        setPhotoUrl(user?.user.icon)
    }, [user])
    useEffect(() => {
        setViewReauthenticate(true)
    }, [])
    return (  
        <>
            {viewReauthenticate ? <Reauthenticate data={[viewReauthenticate, setViewReauthenticate, setShowChangePassword, authenticated, setAuthenticated]}/> : (authenticated && 

                <div className={styles.main}>
                <div className={styles.parentTabs}>
                    <Tabs defaultActiveKey="userName" id="uncontrolled-tab-example">
                        <Tab eventKey="userName" title="User Name">
                            <Form>
                                <Form.Group>
                                    <Form.Label>Current User Name - {user?.user?.userName}</Form.Label>
                                    <Form.Control placeHolder={user?.user.userName} value={userName} onChange={(e) => {setUserName(e.target.value)}}/>
                                </Form.Group>
                                <div className={styles.updateButtonDiv}>
                                    <Button onClick={() => {}}>Update User Name</Button>
                                </div>

                            </Form>
                        </Tab>
                        <Tab eventKey="email" title="Email">
                            <Form>
                                <Form.Group>
                                    <Form.Label>Current Email - {user?.user?.email}</Form.Label>
                                    <Form.Control placeHolder={user?.user.email} value={email} onChange={(e) => {setEmail(e.target.value)}}/>
                                </Form.Group>
                                <div className={styles.updateButtonDiv}>
                                    <Button onClick={() => {}}>Update Email</Button>
                                </div>
                            </Form>
                        </Tab>
                        <Tab eventKey="profilePicture" title="Profile Picture">
                            <Form>
                                <Form.Group>
                                    <img className={styles.profileIcon} src={photoUrl}/>
                                    <Form.Control accept={'image/*'} type={'file'} onChange={(e) => {setPhoto(e.target.files[0]); setPhotoUrl(URL.createObjectURL(e.target.files[0]))}}/>
                                </Form.Group>
                                <div className={styles.updateButtonDiv}>
                                    <Button onClick={() => {}}>Update Profile picture</Button>
                                </div>

                            </Form>
                        </Tab>
                        {showChangePassword ? (
                            <Tab eventKey="password" title="Password">
                            <Form>
                                <Form.Group>
                                    <Form.Label>New Password</Form.Label>
                                    <Form.Control value={newPassword} onChange={(e) => {}}/>
                                </Form.Group>
                                <div className={styles.updateButtonDiv}>
                                    <Button>Update Password</Button>
                                </div>
                            </Form>
                        </Tab>
                            ) : null}
                    </Tabs>
                </div>
            </div>
        )}
        </>
    );
}
 
export default myAccount;