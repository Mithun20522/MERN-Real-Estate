import React, { useState } from 'react'
import {Link, useNavigate} from 'react-router-dom';
import toast, { Toaster } from 'react-hot-toast';
const Register = () => {
  const [formData, setFormData] = useState({});
  const navigate = useNavigate();
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]:e.target.value
    })
  }
  
  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
      const {username, email , password} = e.target;
      const res = await fetch('http://localhost:3000/api/user/create',{
        method: 'POST',
        headers: {
          'Content-Type':'application/json'
        },
        body:JSON.stringify({
          username:username.value,
          email:email.value,
          password:password.value
        })
      })
      const data = await res.json();
      if(res.ok){
        toast.success(data.message);
        e.target.reset();
        navigate('/');
      }
      else toast.error(data.message);
      
    } catch (error) {
      toast.error(error.message);
    }
  }


  return (
    <div className='p-3 max-w-lg mx-auto'>
      <h1 className='text-3xl text-center font-semibold my-7'>Sign Up</h1>
      <form className='flex flex-col gap-4' onSubmit={handleSubmit}>
        <input onChange={handleChange} required name='username' type="text" placeholder='john' className='border p-3 rounded-lg' id='username' />
        <input onChange={handleChange} required name='email' type="email" placeholder='john@example.com' className='border p-3 rounded-lg' id='email' />
        <input onChange={handleChange} required name='password' type="password" placeholder='***********' className='border p-3 rounded-lg' id='password' />
        <button type='submit' className='bg-slate-700 text-white p-3 rounded-lg uppercase hover:opcaity-95 disabled:opacity-80'>Register</button>
      </form>
      <div className='flex gap-2 my-4'>
        <p>Have an account?</p>
        <Link to={'/login'}>
          <span className='text-blue-700 font-semibold hover:underline'>Sign in</span>
        </Link>
      </div>
      <Toaster/>
    </div>
  )
}

export default Register