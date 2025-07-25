import React from 'react'


import appwriteauth from '../../appwrite/auth'
import {useDispatch} from 'react-redux'
import {logout} from '../../store/authSlice'


function LogoutButton() {
    const dispatch = useDispatch();
    const logoutHandler =  () => {
        appwriteauth.logout().then(()=>{
            dispatch(logout());
        });
        
    }
    return (
        <button
    className='inline-bock px-6 py-2 duration-200 hover:bg-blue-100 rounded-full'
    onClick={logoutHandler}
    >Logout</button>
    )
}

export default LogoutButton
