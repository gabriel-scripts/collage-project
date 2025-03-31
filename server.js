import express from 'express';

import { isLogged } from './controllers/isLogged.js'
import { handleRegister } from './firebase/controllers/handleRegister.js';
import path from 'path';
import { fileURLToPath } from 'url';

import session from 'express-session';
import passport from './config/passport-config.js';

const app = express();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);


app.use(session({
  secret: process.env.SECRET,
  resave: false,
  saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static(path.join(__dirname, 'views')));

app.use('/protected', isLogged(), express.static(path.join(__dirname, 'protected')));
app.get("/", function (req, res) {
  try{
    res.sendFile(__dirname + '/views/index.html');
  }catch(err){
    console.error(err);
  }
  
});

app.get("/home", isLogged(), function (req, res) {
  try{
    res.sendFile(__dirname + '/view/home.html');
  }catch(err){
    console.error(err);
  }
  
});

app.get("/registerPage", function (req, res) {
  try{
    res.sendFile(__dirname + '/views/register.html');
  }catch(err){
    console.error(err);
  }
  
});

app.post("/api/login", passport.authenticate('local', {
  successRedirect: '/home', 
  failureRedirect: '/', 
  failureFlash: false 
}));

app.post("/api/register", handleRegister);

const port = 3030;
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});