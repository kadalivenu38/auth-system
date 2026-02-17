import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useState } from 'react';
import axiosClient from '../utils/axiosClient';
import { Link, useNavigate } from 'react-router-dom';

export default function Signup() {
    const navigate = useNavigate();
    const [show, setShow] = useState(false);
    const [userDetails, setUserDetails] = useState({
        name: "",
        email: "",
        password: ""
    })

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
            if (userDetails.name && userDetails.email && userDetails.password) {
                const res = await axiosClient.post('/user/register', userDetails);
                alert(res.data.message);
                setUserDetails({ name: "", email: "", password: "" })
                navigate('/login');
            } else {
                alert("All fields are required to register.");
            }
        } catch (err) {
            if (err.response && err.response.data && err.response.data.message) {
                alert(err.response.data.message);
            }
        }
    }

    return (
        <>
            <div className="d-flex" style={{ height: '100vh', backgroundColor: 'rgb(253, 253, 239)' }}>
                <div className="left-half w-50 d-flex align-items-center" style={{ maxHeight: '100%', overflow: 'hidden' }}>
                    <img src="/auth.jpg" alt="auth-system" style={{ width: '80%', marginLeft: '10%' }} />
                </div>
                <div className="right-half w-50 d-flex align-items-center">
                    <div className='w-75 signup-form'>
                        <h1 className='heading'>Sign Up</h1>
                        <Form>
                            <Form.Group className="mb-3" controlId="formBasicEmail">
                                <Form.Label>Name</Form.Label>
                                <Form.Control type="text" placeholder="Enter name" className='form-field' name='name'
                                    value={userDetails.name} onChange={(e) => { updateFieldData('name', e.target.value) }} />
                            </Form.Group>
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
                                Signup
                            </Button>
                        </Form>
                        <p className='mt-2'>
                            Already registered? <Link to={'/login'}>Login</Link>
                        </p>
                    </div>
                </div>
            </div>
        </>
    );
}