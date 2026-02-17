import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useState } from 'react';
import axiosClient from '../utils/axiosClient';
import { Link, useNavigate } from 'react-router-dom';

export default function Login() {
    const navigate = useNavigate();
    const [show, setShow] = useState(false);
    const [userDetails, setUserDetails] = useState({
        email: "",
        password: ""
    })
    const [showForgotPassword, setShowForgotPassword] = useState(false);

    function updateFieldData(fieldName, newValue) {
        setUserDetails(prevDetails => ({
            ...prevDetails,
            [fieldName]: newValue
        }))
    }

    function eyeFunction() {
        if (show) {
            setShow(false);
        } else {
            setShow(true);
        }
    }

    async function submitUserDetails() {
        try {
            if (userDetails.email && userDetails.password) {
                const res = await axiosClient.post('/user/login', userDetails);
                alert(res.data.message);
                localStorage.setItem('token', res.data.token);
                localStorage.setItem('name', res.data.username);
                setUserDetails({ email: "", password: "" })
                navigate('/home');
            } else {
                alert("All fields are required to login.");
            }
        } catch (err) {
            if (err.response && err.response.data && err.response.data.message) {
                alert(err.response.data.message);
                setShowForgotPassword(true);
            }
        }
    }

    return (
        <>
            <div className="d-flex" style={{ height: '100vh', backgroundColor: '#0056E0' }}>
                <div className="left-half w-50 d-flex align-items-center" style={{ maxHeight: '100%', overflow: 'hidden' }}>
                    <img src="/auth1.jpg" alt="auth-system" style={{ width: '80%', marginLeft: '10%' }} />
                </div>
                <div className="right-half w-50 d-flex align-items-center">
                    <div className='w-75 login-form'>
                        <h1 className='heading'>Login</h1>
                        <Form>
                            <Form.Group className="mb-3" controlId="formBasicEmail">
                                <Form.Label>Email</Form.Label>
                                <Form.Control type="email" placeholder="Enter email" className='form-field' name='email'
                                    value={userDetails.email} onChange={(e) => { updateFieldData('email', e.target.value) }} />
                            </Form.Group>
                            <Form.Group controlId="formBasicPassword">
                                <Form.Label>Password</Form.Label>
                                <div className="password-wrapper">
                                    <Form.Control type={show ? "text" : "password"} placeholder="Enter password" className='form-field' name='password'
                                        value={userDetails.password} onChange={(e) => { updateFieldData('password', e.target.value) }}
                                        style={{
                                            fontSize: (userDetails.password && !show) ? '1.5em' : '',
                                            padding: (userDetails.password && !show) ? '0 10px' : ''
                                        }} />
                                    <span className="eye-icon" onClick={eyeFunction}>
                                        <img src={show ? "/open.png" : "/hide.png"} alt="toggle" width={"21px"} height={"21px"} />
                                    </span>
                                </div>
                            </Form.Group>
                            <Button variant="primary" type="button" onClick={() => { submitUserDetails() }}>
                                Login
                            </Button>
                        </Form>
                        {
                            showForgotPassword ?
                                <p className='mt-2' style={{ fontWeight: '600' }}>Don't remember the password? <Link to={'/forgot-password'}>Forgot Password</Link></p>
                                : <p className='mt-2'>Don't have an account? <Link to={'/'}>Signup</Link></p>
                        }
                    </div>
                </div>
            </div>
        </>
    );
}