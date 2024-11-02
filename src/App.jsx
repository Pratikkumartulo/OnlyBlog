import { useState,useEffect } from 'react'
import conf from './config/config'
import { useDispatch } from 'react-redux'
import authService from "./Appwrite/auth"
import {login,logout} from"./store/AuthSlice"
import {Footer, Header} from "./components"
import { Outlet } from 'react-router-dom';
import ReactLoading from "react-loading";
import { useSelector } from 'react-redux'


function App() {
  const [loading,setLoading] = useState(true)
  const dispatch = useDispatch();
  const loader= useSelector((state)=>state.loadinit.loading);

  useEffect(()=>{
    authService.getCurrentUser()
    .then((userData)=>{
      if(userData){
        dispatch(login({userData}))
      }else{
        dispatch(logout())
      }
    })
    .catch((err)=>{
      // alert(err);
      console.log(err)
    })
    .finally(()=>setLoading(false))
    },[])

  return !loading ? (
    <div className='min-h-screen flex flex-wrap content-between bg-gray-400 relative'>
      <div className='w-full block text-black relative'>
        {loader ?
        <div className='absolute h-[100%] w-full bg-zinc-300 top-0 left-0 opacity-80 z-10 flex justify-center items-center'>
        <ReactLoading type="bubbles" color="#0000FF"
                height={100} width={50} />
        </div>:null}
        <Header/>
        <main>
          <Outlet/>
        </main>
        <Footer/>
      </div>
    </div>
  ) : null
}

export default App
