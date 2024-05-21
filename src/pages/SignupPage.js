import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useHistory for redirection
import AuthService from '../backend/AuthService';
import './SignupPage.css'; // Import the CSS file for styling

function SignupPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const navigate = useNavigate(); // Initialize useHistory for redirection

  const handleSignup = async (e) => {
    e.preventDefault();

    // Password regex pattern for at least 8 characters, including one uppercase letter, one lowercase letter, one number, and one special character
    const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*]).{8,}$/;

    if (!passwordRegex.test(password)) {
      setError('Password must be at least 8 characters long and contain one uppercase letter, one lowercase letter, one number, and one special character.');
      return;
    }

    try {
      await AuthService.signup(username, password);
      setSuccess('Signup successful! You can now log in.');
      setError('');
      // Redirect to the login page after successful signup
      navigate('/login');
    } catch (err) {
      setError(err.response.data.error);
      setSuccess('');
    }
  };

  return (
    <div className="signup-container">
      <h2>Signup</h2>
      {error && <div className="error-message">{error}</div>}
      {success && <div className="success-message">{success}</div>}
      <form onSubmit={handleSignup}>
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
        <button type="submit">Signup</button>
      </form>
    </div>
  );
}

export default SignupPage;
