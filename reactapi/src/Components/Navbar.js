import React, { useState } from 'react';
  import {Link} from 'react-router-dom';

  const Navbar = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem('userToken'));

    const handleLogout = () => {
      localStorage.removeItem('userToken');
      setIsLoggedIn(false);
    };
    return (
      <div> 
          <ul className='nav'>
            
             
              {isLoggedIn ? (
               <li><Link onClick={handleLogout}>Logout</Link></li>
                 ) : (
                  <>
                      <li> <Link to="/">Home</Link></li>
               <li><Link to="/Login">Login</Link></li>
               <li> <Link to="/Register">Register</Link></li>
           
             
               </>
        )}
          </ul>
      </div>
    )
  }

  export default Navbar