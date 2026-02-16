import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useState } from 'react';
import axiosClient from '../utils/axiosClient';
import { Link, useNavigate } from 'react-router-dom';

function ForgotPassword() {
    const navigate = useNavigate();
    const [userDetails, setUserDetails] = useState({
        email: null,
        OTP: null
    })
    const [otpSentStatus, setOtpSentStatus] = useState(false);

    function updateFieldData(fieldName, newValue) {
        setUserDetails(prevDetails => ({
            ...prevDetails,
            [fieldName]: newValue
        }))
    }

    function sendOtp() {
        // axiosClient.post('/forgot-password/'+userDetails.email)
        if (userDetails.email) {
            setOtpSentStatus(true);
        } else {
            alert("Please enter your Email...");
        }
    }
    function verifyOtp() {
        // axiosClient.post('/forgot-password/'+userDetails.email)
        if (!userDetails.OTP) {
            alert("Please enter OTP...");
        } else {
            alert("Otp successfully verified");
            navigate('/reset-password');
        }
    }

    return (
        <>
            <div className="d-flex" style={{ height: '100vh', backgroundColor: 'rgb(253, 253, 239)' }}>
                <div className="left-half w-50 d-flex align-items-center" style={{ maxHeight: '100%', overflow: 'hidden' }}>
                    <img src="/auth.jpg" alt="auth-system" style={{ width: '80%', marginLeft: '10%' }} />
                </div>
                <div className="right-half w-50 d-flex align-items-center">
                    <div className='w-75 forgot-password'>
                        <h1 className='heading' style={{ marginBottom: '3%' }}>Forgot Password</h1>
                        <p style={{ textAlign: 'center', marginBottom: '10%', color: 'blue', fontSize: '1.1em' }}>Enter your user account's verified email address and we will send you a OTP for password reset.</p>
                        <Form>
                            <Form.Group className="mb-2" controlId="formBasicEmail">
                                <Form.Label>Email</Form.Label>
                                <Form.Control disabled={otpSentStatus} type="email" placeholder="Enter email" className='form-field' name='email'
                                    value={userDetails.email} onChange={(e) => { updateFieldData('email', e.target.value) }} />
                            </Form.Group>
                            {otpSentStatus ?
                                <>
                                    <Form.Group controlId="formBasicEmail">
                                        <Form.Label className='mt-2'>OTP</Form.Label>
                                        <Form.Control type="text" placeholder="Enter Otp" className='form-field' name='OTP'
                                            value={userDetails.OTP} onChange={(e) => { updateFieldData('OTP', e.target.value) }} />
                                    </Form.Group>
                                    <Button variant="primary" type="button" onClick={verifyOtp}>Verify Otp</Button>
                                </> :
                                <Button variant="primary" type="button" onClick={sendOtp} >Send Otp</Button>
                            }
                        </Form>
                        <p className='mt-2'>
                            Not needed. <Link to={'/login'}>Cancel</Link>
                        </p>
                    </div>
                </div>
            </div>
        </>
    );
}

export default ForgotPassword;