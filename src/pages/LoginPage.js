import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom'; // Import Link and useHistory
import AuthService from '../backend/AuthService';
import './LoginPage.css'; // Import the CSS file for styling
import { useAuth } from '../AuthContext';

function LoginPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate(); // Initialize useHistory
  const { login } = useAuth();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      await AuthService.login(username, password);
      login(); // Update isLoggedIn to true after successful login
      navigate('/'); // Redirect to protected route after login
    } catch (err) {
      setError(err.response.data.error);
    }
  };

  return (
    <div className="login-container">
      <h2>Login</h2>
      {error && <div className="error-message">{error}</div>}
      <form onSubmit={handleLogin}>
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={e => setUsername(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={e => setPassword(e.target.value)}
        />
        <button type="submit">Login</button>
      </form>
      <p>Don't have an account? <Link to="/signup">Signup</Link></p> {/* Link to SignupPage */}
    </div>
  );
}

export default LoginPage;
