import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useState } from 'react';
import axiosClient from '../utils/axiosClient';
import { Link, useNavigate } from 'react-router-dom';

function ResetPassword() {
    const navigate = useNavigate();
  const [userDetails, setUserDetails] = useState({
        newPassword: null,
        confirmPassword: null
    })

    function updateFieldData(fieldName, newValue){
        setUserDetails(prevDetails=>({
            ...prevDetails,
            [fieldName] : newValue
        }))
    }

    function updatePassword() {
        alert("Password Reset successfully");
        navigate('/login');
    }

    return (
        <>
            <div className="d-flex" style={{ height: '100vh', backgroundColor:'rgb(253, 253, 239)' }}>
                <div className="left-half w-50 d-flex align-items-center" style={{ maxHeight: '100%', overflow: 'hidden' }}>
                    <img src="/auth.jpg" alt="auth-system" style={{ width: '80%', marginLeft: '10%' }} />
                </div>
                <div className="right-half w-50 d-flex align-items-center">
                    <div className='w-75 reset-password'>
                        <h1 className='heading'>Reset Password</h1>
                        <Form>
                            <Form.Group className="mb-3" controlId="formBasicEmail">
                                <Form.Label>New Password</Form.Label>
                                <Form.Control type="password" placeholder="Enter new password" className='form-field' name='newPassword'
                                value={userDetails.newPassword} onChange={(e)=>{updateFieldData('newPassword', e.target.value)}} />
                            </Form.Group>
                            <Form.Group className="mb-2" controlId="formBasicEmail">
                                <Form.Label>Confirm Password</Form.Label>
                                <Form.Control type="password" placeholder="Re-Enter the password" className='form-field' name='confirmPassword'
                                value={userDetails.confirmPassword} onChange={(e)=>{updateFieldData('confirmPassword', e.target.value)}} />
                            </Form.Group>
                            <Button variant="primary" type="button" onClick={updatePassword}>Reset Password</Button>
                        </Form>
                        <p className='mt-2'>
                          Not needed, <Link to={'/login'}>Cancel</Link>
                        </p>
                    </div>
                </div>
            </div>
        </>
    );
}

export default ResetPassword;