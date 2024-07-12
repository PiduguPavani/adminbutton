const express = require('express');
const { exec } = require('child_process');
const path = require('path');
const fs = require('fs');
const app = express();
const port = 5000;

app.use(express.json());

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
  next();
});

const validateCredentials = (username, password) => {
  const credentialsPath = path.join(__dirname, 'data', 'adminlogin.txt');
  const credentials = fs.readFileSync(credentialsPath, 'utf-8').trim();
  const [storedUsername, storedPassword] = credentials.split(':');
  return username === storedUsername && password === storedPassword;
};

app.post('/run-python', (req, res) => {
  const { username, password } = req.body;

  if (!validateCredentials(username, password)) {
    return res.status(401).send('Admin wrong credentials');
  }

  const scriptPath = path.join(__dirname, 'hello.py');
  exec(`python ${scriptPath}`, (error, stdout, stderr) => {
    if (error) {
      console.error(`Error executing script: ${error.message}`);
      console.error(`stderr: ${stderr}`);
      return res.status(500).send(`Server Error: ${error.message}`);
    }
    res.send(stdout);
  });
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
