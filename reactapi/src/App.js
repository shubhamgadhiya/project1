import React from 'react';
import './App.css';
import Form from './Components/Form';
import Login from './Components/Login';
import Protected from './Components/Protected';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Navbar from './Components/Navbar';

function App() {
  return (
    <BrowserRouter>
    <Navbar/>
    <Routes>
      <Route path='/' element={<h1>home</h1>}/>
      <Route path='/Register' element={<Form/>}/>
      <Route path='/Login' element={ <Login/>}/>
      <Route path="/protected" element={<Protected />}/>
    </Routes>

    </BrowserRouter>
  );
}

export default App;
