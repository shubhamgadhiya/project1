import React, { useState } from 'react'
import axios from 'axios';
import { Link } from 'react-router-dom';

const Login = () => {

const[email,setEmail] = useState("");
const[password,setPassword] = useState("");
const [token, setToken] =  useState("");
const [error, setError] = useState("");


 const handlelogin = async (e) => {
    e.preventDefault();
    if (!email || !password) {
        alert('All fields are required.');
        return;
      }
    try {
        const responce = await axios.post("http://localhost:5000/login", {
            email,
            password
        });
        setToken(responce.data.token);
        alert("login successfully");
        const token = responce.data.token;

        localStorage.setItem('userToken', token);
  
        window.location.href = '/protected';
        console.log(responce);
    } catch (error) {
        if (error.response) {
            setError(error.response.data.message);
            alert(error.response.data);
          } else if (error.request) {
            setError("Request was made but no response was received.");
           alert(error.request);
          } else {
            setError("An error occurred while setting up the request.");
          alert('Error', error.message);
          }
        }
      };
    
return (
    <div className='form'>
      <h2>Login Form</h2>
      <div className='registration'>
        <label className='label'>Enter your email:</label>
        <input
          type='email'
          id='email'
          name='email'
          placeholder='Enter your email'
          className='input-field'
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <label className='label'>Enter your password:</label>
        <input
          type='password'
          id='password'
          name='password'
          placeholder='Enter your password'
          className='input-field'
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <button className='btn' type='button' onClick={handlelogin}>
          Login
        </button>
        <div>
        Don't Have an account? <Link to="/Register">Register</Link></div>
      
      </div>
    </div>
  );
};

export default Login;