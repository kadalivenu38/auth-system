import { useState } from 'react';
import axiosClient from '../utils/axiosClient';

export default function HomePage({handleLogout}) {
    return (
        <>
            <div className='home'>
                <div className='navbar'>
                    <img src='logo.png' alt='logo' style={{width:'40px', height:'40px', margin:'5px 15px'}}/>
                    <h2 style={{fontWeight:'300'}}>Welcome {localStorage.getItem('name')}</h2>
                    <button type='button' onClick={()=>handleLogout()}>Logout</button>
                </div>
                <h3>Welcome to Auth-System Website Home Page</h3>
            </div>
        </>
    );
}