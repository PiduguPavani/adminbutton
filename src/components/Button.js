import React, { useState } from 'react';

const Button = () => {
  const [response, setResponse] = useState('');

  const handleClick = async () => {
    try {
      const res = await fetch('http://localhost:5000/run-python');
      const text = await res.text();
      setResponse(text);
    } catch (error) {
      console.error('Error:', error);
      setResponse('Error occurred');
    }
  };

  return (
    <div>
      <button onClick={handleClick}>Run Python Script</button>
      <p>{response}</p>
    </div>
  );
};

export default Button;
