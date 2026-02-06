import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useState } from 'react';
import axiosClient from '../utils/axiosClient';

export default function Login({showRegister, showHome}) {
    const [userDetails, setUserDetails] = useState({
        email: "",
        password: ""
    })

    function updateFieldData(fieldName, newValue){
        setUserDetails(prevDetails=>({
            ...prevDetails,
            [fieldName] : newValue
        }))
    }

    async function submitUserDetails(){
        try {
            if (userDetails.email && userDetails.password){
                const res = await axiosClient.post('/login', userDetails);
                alert(res.data.message);
                localStorage.setItem('token', res.data.token);
                localStorage.setItem('name', res.data.username);
                setUserDetails({email:"", password:""})
                showHome();
            }else{
                alert("Fill the Input fields...");
            }
        } catch (err) {
            if (err.response && err.response.data && err.response.data.message) {
                alert(err.response.data.message);
            } else {
                alert("Something went wrong!");
            }
        }
    }

    return (
        <>
            <div className="d-flex" style={{ height: '100vh', backgroundColor:'rgb(253, 253, 239)' }}>
                <div className="left-half w-50 d-flex align-items-center" style={{ maxHeight: '100%', overflow: 'hidden' }}>
                    <img src="/auth.jpg" alt="auth-system" style={{ width: '80%', marginLeft: '10%' }} />
                </div>
                <div className="right-half w-50 d-flex align-items-center">
                    <div className='w-75 signup-form'>
                        <h1 className='heading'>Login</h1>
                        <Form>
                            <Form.Group className="mb-3" controlId="formBasicEmail">
                                <Form.Label>Email</Form.Label>
                                <Form.Control type="email" placeholder="Enter email" className='form-field' name='email'
                                value={userDetails.email} onChange={(e)=>{updateFieldData('email', e.target.value)}} />
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="formBasicPassword">
                                <Form.Label>Password</Form.Label>
                                <Form.Control type="password" placeholder="Password" className='form-field' name='password'
                                value={userDetails.password} onChange={(e)=>{updateFieldData('password', e.target.value)}} />
                            </Form.Group>
                            <Form.Group className="mb-5" controlId="formBasicCheckbox">
                                <Form.Check type="checkbox" label="Check me out" />
                            </Form.Group>
                            <Button variant="primary" type="button" onClick={()=>{submitUserDetails()}}>
                                Login
                            </Button>
                        </Form>
                        <p>
                          Don't have an account? <span onClick={()=>showRegister()} style={{textDecoration:'underline', color:'blue', cursor:'pointer'}}>Signup</span>
                        </p>
                    </div>
                </div>
            </div>
        </>
    );
}