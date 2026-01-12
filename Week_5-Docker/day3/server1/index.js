import express from 'express';
import os, { hostname } from 'os';

const app = express();
const PORT = 3000;

app.get('/api', (req, res) => {
  res.json({
    backend: 'backend-1',
    hostname: os.hostname(),
    pid: process.pid,
  });
});

app.listen(PORT, () => {
  console.log(`Server running on Port ${PORT}`);
});
