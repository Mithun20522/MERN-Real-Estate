import React from 'react'
import {Link} from 'react-router-dom';

const Register = () => {
  return (
    <div className='p-3 max-w-lg mx-auto'>
      <h1 className='text-3xl text-center font-semibold my-7'>Sign Up</h1>
      <form className='flex flex-col gap-4'>
        <input type="text" placeholder='john' className='border p-3 rounded-lg' id='username' />
        <input type="email" placeholder='john@example.com' className='border p-3 rounded-lg' id='email' />
        <input type="password" placeholder='***********' className='border p-3 rounded-lg' id='password' />
        <button className='bg-slate-700 text-white p-3 rounded-lg uppercase hover:opcaity-95 disabled:opacity-80'>Register</button>
      </form>
      <div className='flex gap-2 my-4'>
        <p>Have an account?</p>
        <Link to={'/login'}>
          <span className='text-blue-700 font-semibold hover:underline'>Sign in</span>
        </Link>
      </div>
    </div>
  )
}

export default Register