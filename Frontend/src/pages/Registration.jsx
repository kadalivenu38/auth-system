import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import './Registration.css'
import { useState } from 'react';

export default function Signup() {
    const [userDetails, setUserDetails] = useState({
        name: null,
        email: null,
        password: null
    })

    function updateFieldData(fieldName, newValue){
        setUserDetails(prevDetails=>({
            ...prevDetails,
            [fieldName] : newValue
        }))
    }

    function submitUserDetails(){
        console.log(userDetails);
    }

    return (
        <>
            <div className="d-flex" style={{ height: '100vh' }}>
                <div className="left-half w-50" style={{ maxHeight: '100%', overflow: 'hidden' }}>
                    <img src="/rosie.png" alt="rosie" style={{ width: '90%' }} />
                </div>
                <div className="right-half w-50 d-flex align-items-center justify-content-center">
                    <div className='w-75'>
                        <h1>Sign Up</h1>
                        <Form>
                            <Form.Group className="mb-3" controlId="formBasicEmail">
                                <Form.Label>Name</Form.Label>
                                <Form.Control type="email" placeholder="Enter Name" className='form-field' 
                                value={userDetails.name} onChange={(e)=>{updateFieldData('name', e.target.value)}} />
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="formBasicEmail">
                                <Form.Label>Email address</Form.Label>
                                <Form.Control type="email" placeholder="Enter email" className='form-field' 
                                value={userDetails.email} onChange={(e)=>{updateFieldData('email', e.target.value)}} />
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="formBasicPassword">
                                <Form.Label>Password</Form.Label>
                                <Form.Control type="password" placeholder="Password" className='form-field' 
                                value={userDetails.password} onChange={(e)=>{updateFieldData('password', e.target.value)}} />
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="formBasicCheckbox">
                                <Form.Check type="checkbox" label="Check me out" />
                            </Form.Group>
                            <Button variant="primary" type="button" onClick={()=>{submitUserDetails()}}>
                                Signup
                            </Button>
                        </Form>
                        <p>
                            Already registered? <a href='#' style={{ textDecoration:'underline' }} >LogIn</a>
                        </p>
                    </div>
                </div>
            </div>
        </>
    );
}