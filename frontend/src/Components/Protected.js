import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Employee from './Employee';

const Protected = () => {
 
  const [message, setMessage] = useState('');

  useEffect(() => {
    const token = localStorage.getItem('userToken');

    if (token) {
     
      const config = {
        headers: {
          Authorization: `${token}`,
        },
      };

      axios.get('http://localhost:5000/protected', config)
        .then(response => {
          setMessage(response.data);
        })
        .catch(error => {
          console.error('Error fetching protected data', error);
        });
    }
  }, []);

  return (
    <div>
      {message ? (
            <div>
            <Employee/>
          </div>
      ) : (
        <h2>Authentication Required</h2>
      )}
    
      
    </div>
  );
};

export default Protected;
