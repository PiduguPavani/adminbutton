import React, { useState } from 'react';
import './Button.css';

const Button = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [response, setResponse] = useState('');

  const handleClick = async () => {
    setResponse(''); // Reset the response message

    try {
      const res = await fetch('http://localhost:5000/run-python', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
      });

      if (res.status === 401) {
        setResponse('Admin wrong credentials');
      } else {
        const text = await res.text();
        setResponse(text);
      }
    } catch (error) {
      console.error('Error:', error);
      setResponse('Error occurred');
    }
  };

  return (
    <div className="button-container">
      <label>
        Username:
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
      </label>
      <label>
        Password:
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </label>
      <button onClick={handleClick}>Run Python Script</button>
      <p>{response}</p>
    </div>
  );
};

export default Button;
