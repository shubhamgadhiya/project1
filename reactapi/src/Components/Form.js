import React, {useState} from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';

const Form = () => {
    const[name,setName] = useState("");
    const[email,setEmail] = useState("");
    const[password,setPassword]=useState("");
    const [error, setError] = useState("");

    const navigate = useNavigate();

    const handleregister = async (e) => {
        e.preventDefault(); 

        if (!name || !email || !password) {
            alert('All fields are required.');
            return;
          }
        try {
            await axios.post("http://localhost:5000/register", {
                name,
                email,
                password,
            });
           setName("");
           setEmail("");
           setPassword("");
            alert("registration successfully");
            navigate("/Login")
            console.log(name, email, password)
           
        } catch(error) {
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
      <h2>Registration Form</h2>
      <div className='registration'>
        <label className='label'>Enter your name:</label>
        <input
          type='text'
          id='name'
          name='name'
          placeholder='Enter your name'
          className='input-field'
          onChange={(e) => setName(e.target.value)}
          required
        />

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

        <button className='btn' type='button' onClick={handleregister}>
          Submit
        </button>
       <div>
        Have an account? <Link to="/Login">Login</Link></div>
      </div>
    </div>
  );
};
export default Form