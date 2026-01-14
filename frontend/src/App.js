import React, { useState, useEffect } from 'react';
import logo from './assets/iconheader.png';
function App() {
  const [token, setToken] = useState('');
  const [protectedData, setProtectedData] = useState('');

  const handleLogin = async () => {
    const response = await fetch('http://localhost:3001/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ username: 'admin', password: 'admin123' }),
    });

    const data = await response.json();

    if (response.ok) {
      setToken(data.token);
      // Save the token in client-side storage (e.g., local storage or a cookie)
      localStorage.setItem('token', data.token);

    } else {
      alert(data.error);
    }
  };

  const handleProtectedData = async () => {
    const response = await fetch('http://localhost:3001/protected', {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    });

    if (response.ok) {
      const data = await response.json();
      setProtectedData(data.message);
      //alert(data.message);
    } else {
      setProtectedData('Unauthorized');
    }
  };

  const handleLogout = () => {
    setToken('');
    setProtectedData('');
    // Remove the token from client-side storage (e.g., local storage or a cookie)
    localStorage.removeItem('token');
  };

  useEffect(() => {
    const storedToken = localStorage.getItem('token');
    if (storedToken) {
      setToken(storedToken);
    }
  }, []);

  return (
    <div>
      <div style={{textAlign:'center',fontSize:'35px'}}>JWT Authentication</div>
      <div><img src={logo} alt="JWT Authentication" style={{marginLeft: '44%'}}/></div>
      <div style={{ textAlign: 'center', marginTop: '20px' }}>
        <button onClick={handleLogin}>Login</button>
        <button onClick={handleProtectedData}>Access Protected Data</button>
        <button onClick={handleLogout}>Logout</button>

        <div style={{ marginTop: '10px' }}>{token ? `Token: ${token}` : 'No token'}</div>
        <div>{token ? 'Logged in' : 'Logged out'}</div>
        <div>{protectedData ? protectedData : 'No protected data'}</div>
      </div>
    </div>
  );
}

export default App;
