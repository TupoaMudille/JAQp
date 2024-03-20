import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import ReactDOM from 'react-dom/client';
import './index.css';
import Auth from './pages/Auth';
import Reg from './Reg';
import Main from './Main';
import UserSettings from './UserSettings';
import reportWebVitals from './reportWebVitals';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  
  <BrowserRouter>
  <Routes>
    <Route exact path='/' element={<Auth />}/>
    <Route exact path='/registration' element={<Reg />}/>
    <Route exact path='/main' element={<Main />}/>
    <Route exact path='/userSettingsId=?' element={<UserSettings />}/>
  </Routes>
    
  </BrowserRouter>

);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
