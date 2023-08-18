
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  const [showEmployeeLinks, setShowEmployeeLinks] = useState(false);

  const isAuthenticated = !!localStorage.getItem('userToken');



  const handleLogout = () => {
    localStorage.removeItem('userToken');
    setShowEmployeeLinks(false);
    window.location.reload("/");
  };
  useEffect(() => {
   
    if (isAuthenticated) {
      setShowEmployeeLinks(true);
    }
  }, [isAuthenticated]);

  
  return (

<nav>
<ul className="nav">
  <li>
    <Link to="/">Home</Link>
  </li>
  {!isAuthenticated ? (
    <>
      <li><Link to="/login">Login</Link></li>
      <li><Link to="/register">Register</Link></li>
      <li>
          <Link to="/protected">Employee</Link>
        </li>
    </>
  ) : (
    <>
      {showEmployeeLinks && (
        <>
        <li>
          <Link to="/protected" >Employee</Link>
        </li>
        <li>
          <Link to="/getdata">getdata</Link>
        </li>
        </>
      )}
      <li>
        <button onClick={handleLogout}>Logout</button>
      </li>
    </>
  )}
</ul>
</nav>
);
};

export default Navbar;