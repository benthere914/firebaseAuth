import { Form, Button } from "react-bootstrap";
import { useContext } from "react";
import { UserContext } from "../../../pages/_app";
const ChangeAccountData = ({data}) => {
    const user = useContext(UserContext)
    const [valueName, value, setValue] = data
    return (  
        <>
            <Form>
                <Form.Group>
                    {['userName', 'email'].includes(valueName) ? (
                        <Form.Label>Current {valueName} - {user?.user[valueName]}</Form.Label>
                        ) : null}
                    {valueName === 'icon' ? (
                        <Form.Control accepts={'image/*'} type={'file'} value={value} onChange={() => {setValue(e.target.files[0])}}/>
                    ) : ['userName', 'email'].includes(valueName) ? (
                            <Form.Control placeHolder={user?.user[valueName]} value={value} onChange={(e) => {setValue(e.target.value)}}/>
                        ) : (
                            <>
                            <Form.Control/>
                            <Form.Control/>
                            </>
                        )}
                    <Button>Update {valueName}</Button>
                </Form.Group>
            </Form>
        </>
    );
}
 
export default ChangeAccountData;