import React, {Component} from 'react';
import { BrowserRouter, Route, Link, Routes } from 'react-router-dom';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import Reg from './Reg';
import Main from './Main';
import reportWebVitals from './reportWebVitals';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  
  <BrowserRouter>
  <Routes>
    <Route exact path='/' element={<App />}/>
    <Route exact path='/registration' element={<Reg />}/>
    <Route exact path='/main' element={<Main />}/>
  </Routes>
    
  </BrowserRouter>

);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
