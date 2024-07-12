const express = require('express');
const { exec } = require('child_process');
const app = express();
const port = 5000;

app.get('/run-python', (req, res) => {
    exec('python hello.py', (error, stdout, stderr) => {
        if (error) {
            console.error(`Error executing script: ${error}`);
            return res.status(500).send('Server Error');
        }
        res.send(stdout);
    });
});

app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});
