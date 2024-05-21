import React, { useEffect, useState } from 'react';
import axios from 'axios';
import AuthService from '../backend/AuthService';

function ProtectedPage() {
  const [message, setMessage] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:3001/protected', {
          headers: AuthService.getAuthHeader(),
        });
        setMessage(response.data.message);
      } catch (err) {
        console.error(err);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      <h2>Protected Page</h2>
      <p>{message}</p>
    </div>
  );
}

export default ProtectedPage;