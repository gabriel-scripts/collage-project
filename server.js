import express from 'express';

import { handleRegister } from './firebase/controllers/handleRegister.js';


const app = express();
const port = 3030;


import path from 'path';
import { fileURLToPath } from 'url';


const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(express.json());

app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));
app.get("/register", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});

app.post("/registerUser", handleRegister);

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});