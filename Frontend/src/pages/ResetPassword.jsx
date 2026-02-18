import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useState } from 'react';
import axiosClient from '../utils/axiosClient';
import { Link, useNavigate } from 'react-router-dom';

function ResetPassword() {
    const navigate = useNavigate();
    const [showNew, setShowNew] = useState(false);
    const [showConfirm, setShowConfirm] = useState(false);
    const [userDetails, setUserDetails] = useState({
        email: "",
        newPassword: "",
        confirmPassword: ""
    })

    function updateFieldData(fieldName, newValue) {
        setUserDetails(prevDetails => ({
            ...prevDetails,
            [fieldName]: newValue
        }))
    }

    function eyeFunction1() {
        if (showNew) {
            setShowNew(false);
        } else {
            setShowNew(true);
        }
    }
    function eyeFunction2() {
        if (showConfirm) {
            setShowConfirm(false);
        } else {
            setShowConfirm(true);
        }
    }

    async function updatePassword() {
        if (!userDetails.newPassword || !userDetails.confirmPassword) {
            alert("All fields are required to reset password.");
            return;
        } else if (userDetails.newPassword.length < 6) {
            alert("Password must be at least 6 characters");
            return;
        } else if (userDetails.newPassword !== userDetails.confirmPassword) {
            alert("New password and Confirm password should be same.");
            return;
        }
        try {
            userDetails.email = localStorage.getItem('email');
            const res = await axiosClient.post('/user/reset-password', userDetails);
            if (res.status === 200) {
                alert(res.data.message);
                localStorage.removeItem('email');
                navigate('/login');
            }
        } catch (err) {
            if (err.response && err.response.data && err.response.data.message) {
                alert(err.response.data.message);
                if(err.status === 403){
                    navigate('/forgot-password');
                }
            }
        }
    }

    function cancelFun() {
        if(userDetails.email){
            axiosClient.post('/user/reset-cancel', {email: userDetails.email});
        }
    }

    return (
        <>
            <div className="d-flex" style={{ height: '100vh', backgroundColor: '#FFFFFF' }}>
                <div className="left-half w-50 d-flex align-items-center" style={{ maxHeight: '100%', overflow: 'hidden' }}>
                    <img src="/auth3.jpg" alt="auth-system" style={{ width: '80%', marginLeft: '10%' }} />
                </div>
                <div className="right-half w-50 d-flex align-items-center">
                    <div className='w-75 reset-password'>
                        <h1 className='heading'>Reset Password</h1>
                        <Form>
                            <Form.Group className="mb-3" controlId="formBasicEmail">
                                <Form.Label>New Password</Form.Label>
                                <div className="password-wrapper">
                                    <Form.Control type={showNew ? "text" : "password"} placeholder="New password" className='form-field'
                                        name='newPassword' value={userDetails.newPassword} onChange={(e) => { updateFieldData('newPassword', e.target.value) }}
                                        style={{
                                            fontSize: (userDetails.newPassword && !showNew) ? '1.5em' : '',
                                            padding: (userDetails.newPassword && !showNew) ? '0 10px' : ''
                                        }} />
                                    <span className="eye-icon" onClick={eyeFunction1}>
                                        <img src={showNew ? "/open.png" : "/hide.png"} alt="toggle" width={"21px"} height={"21px"} />
                                    </span>
                                </div>
                            </Form.Group>
                            <Form.Group className="mb-2" controlId="formBasicEmail">
                                <Form.Label>Confirm Password</Form.Label>
                                <div className="password-wrapper">
                                    <Form.Control type={showConfirm ? "text" : "password"} placeholder="Re-enter the password" className='form-field'
                                        name='confirmPassword' value={userDetails.confirmPassword} onChange={(e) => { updateFieldData('confirmPassword', e.target.value) }}
                                        style={{
                                            fontSize: (userDetails.confirmPassword && !showConfirm) ? '1.5em' : '',
                                            padding: (userDetails.confirmPassword && !showConfirm) ? '0 10px' : ''
                                        }} />
                                    <span className="eye-icon" onClick={eyeFunction2}>
                                        <img src={showConfirm ? "/open.png" : "/hide.png"} alt="toggle" width={"21px"} height={"21px"} />
                                    </span>
                                </div>
                            </Form.Group>
                            <Button variant="primary" type="button" onClick={updatePassword}>Reset Password</Button>
                        </Form>
                        <p className='mt-2'>
                            Not needed, <Link to={'/login'} onClick={cancelFun}>Cancel</Link>
                        </p>
                    </div>
                </div>
            </div>
        </>
    );
}

export default ResetPassword;