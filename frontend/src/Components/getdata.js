
import React, { useEffect, useState } from 'react';
import axios from 'axios';


const Protected = () => {
 
    const [formData, setFormData] = useState([]);

    const token = localStorage.getItem('userToken');
  useEffect(() => {

    if (token) {
     
      const config = {
        headers: {
          Authorization: `${token}`,
        },
      };

      axios.get('http://localhost:5000/api/getdata', config)
        .then(response => {
            setFormData(response.data);
        })
        .catch(error => {
          console.error('Error fetching protected data', error);
        });
    }
  }, [token]);

  return (
    <div>
      {token ? (
            <div>
                
                   <pre>{JSON.stringify(formData, null, 2)}</pre>
                </div>
      ) : (
        <h2>Authentication Required</h2>
      )}
    
      
    </div>
  );
};

export default Protected;
