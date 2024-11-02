import React from 'react'
import { useDispatch } from 'react-redux'
import authService from "../../Appwrite/auth";
import {logout} from "../../store/AuthSlice"
import { loading } from '../../store/LoadingSlice';


const LogoutBtn = () => {
    const dispatch = useDispatch()
    const logoutHandler = ()=>{
        dispatch(loading())
        authService.logout().then(()=>{
            dispatch(logout())
            dispatch(loading())
        })
    }
  return (
    <button
    className='inline-bock px-6 py-2 duration-200 hover:bg-blue-100 rounded-full'
    onClick={logoutHandler}
    >Logout</button>
  )
}

export default LogoutBtn
