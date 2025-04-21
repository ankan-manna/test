import React from "react";
import RegistrationForm from './components/RegistrationForm';
import LoginForm from './components/LoginForm';
import UserProfile from './components/UserProfile';
import LogoutButton from './components/LogoutButton';
import UpdateAccount from './components/UpdateAccount';
import ChangePassword from './components/ChangePassword';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';

function App() {
  return (
    <Router>
      <div className="container mx-auto p-4">
        <h1 className="text-3xl font-bold text-center mb-6">React Frontend</h1>
        <nav className="mb-4">
          <ul className="flex space-x-4 justify-center">
            <li>
              <Link to="/register" className="text-blue-500 hover:underline">Register</Link>
            </li>
            <li>
              <Link to="/login" className="text-blue-500 hover:underline">Login</Link>
            </li>
            <li>
              <Link to="/" className="text-blue-500 hover:underline">Home</Link>
            </li>
          </ul>
        </nav>
        <Routes>
          <Route path="/register" element={<RegistrationForm />} />
          <Route path="/login" element={<LoginForm />} />
          <Route path="/" element={<HomePage />} />
          <Route path="/profile" element={<UserProfile />} />
          <Route path="/logout" element={<LogoutButton />} />
          <Route path="/update-account" element={<UpdateAccount />} />
          <Route path="/change-password" element={<ChangePassword />} />
        </Routes>
      </div>
    </Router>
  );
}

function HomePage() {
  return <h2 className="text-2xl font-semibold text-center">Home Page</h2>;
}

export default App;