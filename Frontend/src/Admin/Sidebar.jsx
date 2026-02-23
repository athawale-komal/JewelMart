import React from 'react'
import { logoutUser } from '../states/Auth/Action'
import { useDispatch, useSelector } from 'react-redux';


const Sidebar = () => {
const dispatch = useDispatch();
const {user,loading,error} = useSelector((s) => s.auth);


 if(loading) return <div>Loading...</div>
 if(error) return <div>Error: {error}</div>
  return (
    <div className='h-screen bg-white w-72'>
         <div className="">
          <img src={user.photo} alt=""  className='w-11 h-11'/>
          <h2 className='text-lg font-semibold'>{user.name} {user.surname}</h2>
          <p className='text-sm text-gray-500'>{user.email}</p>
         </div>
       <button className='bg-rose-600 px-3 py-2' onClick={()=> dispatch(logoutUser())}>Logout</button>

    </div>  
  )
}

export default Sidebar