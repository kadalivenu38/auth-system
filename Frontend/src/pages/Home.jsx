import { useState } from 'react';
import axiosClient from '../utils/axiosClient';
import { useNavigate } from 'react-router-dom';

export default function HomePage() {
    const navigate = useNavigate();

    function logOut() {
        const conMsg = confirm("Are you sure, Do you want to Logout.?");
        if (conMsg) {
            localStorage.clear();
            navigate('/login');
        }
    }

    return (
        <>
            <div className='home'>
                <div className='navbar'>
                    <img src='logo.png' alt='logo' style={{ width: '40px', height: '40px', margin: '5px 15px' }} />
                    <h2 style={{ fontWeight: '300' }}>Welcome {localStorage.getItem('name')}</h2>
                    <button type='button' onClick={logOut}>Logout</button>
                </div>
                <h3>Welcome to Auth-System Website Home Page</h3>
            </div>
        </>
    );
}