import React from 'react';
import {Route, BrowserRouter, Routes} from 'react-router-dom';
import Login from './pages/Login';
import Register from './pages/Register';
import Home from './pages/Home';
import ForgotPasswordForm from './components/ForgotPasswordForm';

const App = () => {
  return (
    <BrowserRouter>
    <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/" element={<Home />} />
        <Route path="/forget" element={<ForgotPasswordForm />} />
    </Routes>
    </BrowserRouter>
  );
};

export default App;
