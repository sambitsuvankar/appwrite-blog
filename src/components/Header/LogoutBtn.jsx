import React from 'react'
import { useDispatch } from 'react-redux'
import authService from '../../appwrite/auth'
import { logout } from '../../store/authSlice'
import {setPosts as setPostState} from '../../store/postSlice'

function LogoutBtn() {
    const dispatch = useDispatch()

    const logoutHandler = () => {
        authService.logout().then(()=> {
            dispatch(logout());
            dispatch(setPostState(null))
        }).catch((error) => {
            console.error("Appwrite Service :: logout :: error", error);
        })
    }
  return (
    <button onClick={logoutHandler} className='inline-block px-6 py-2 duration-200 hover:bg-blue-100 rounded-full'>Logout</button>
  )
}

export default LogoutBtn