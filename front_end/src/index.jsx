import React from 'react';
import ReactDOM from 'react-dom/client';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
// import dotenv from 'dotenv'
import './css/index.css';
import './css/auth.css'
import './css/homepage.css'
import App from './App';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Toaster } from 'react-hot-toast';
// dotenv.config()
const queryclient = new QueryClient
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <QueryClientProvider client={queryclient}>
    <Router>
    <Toaster/>
    <Routes>
      <Route path='/*' element={<App />}/>
    </Routes>
    </Router>
    </QueryClientProvider>
  </React.StrictMode>

);

