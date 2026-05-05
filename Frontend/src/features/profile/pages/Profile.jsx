import React from 'react'
import useAuth from '../../Auth/hooks/useAuth'

const Profile = () => {
    const {user} = useAuth()

  return (
    <div className='text-center'>
        <h1 className='text-2xl font-bold mb-4'>{user?.fullname}</h1>
        <p className='text-lg mb-2'>{user?.email}</p>
        <p className='text-lg mb-2'>{user?.contact}</p>
        <p className='text-lg mb-2'>{user?.role}</p>
    </div>
  )
}

export default Profile