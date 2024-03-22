import React, { useState } from 'react'
import {Link, useNavigate} from 'react-router-dom';
import toast, { Toaster } from 'react-hot-toast';

const Login = () => {
  const [formData, setFormData] = useState({});
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]:e.target.value
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const res = await fetch('http://localhost:3000/api/user/login',{
        method: 'POST',
        headers: {
          'Content-Type':'application/json'
        },
        body:JSON.stringify(formData)
      })
      const data = await res.json();
      if(res.ok){
        setLoading(false);
        toast.success(data.message);
        setTimeout(() => {
          navigate('/');
        }, 500);
      }
      else{
        setLoading(false);
        toast.error(data.message);
        return;
      }
    
    } catch (error) {
      toast.error(error.message);
    }
  }


  return (
    <div className='p-3 max-w-lg mx-auto'>
      <h1 className='text-3xl text-center font-semibold my-7'>Log In</h1>
      <form className='flex flex-col gap-4' onSubmit={handleSubmit}>
        <input required onChange={handleChange} name='email' type="email" placeholder='john@example.com' className='border p-3 rounded-lg' id='email' />
        <input required onChange={handleChange} name='password' type="password" placeholder='***********' className='border p-3 rounded-lg' id='password' />
        <button disabled={loading} type='submit' className='bg-slate-700 text-white p-3 rounded-lg uppercase hover:opcaity-95 disabled:opacity-80'>
          {
            loading ? 'loading...' : 'Login'
          }
        </button>
      </form>
      <div className='flex gap-2 my-4'>
        <p>Don't have an account?</p>
        <Link to={'/register'}>
          <span className='text-blue-700 font-semibold hover:underline'>Sign Up</span>
        </Link>
      </div>
      <Toaster/>
    </div>
  )
}

export default Login