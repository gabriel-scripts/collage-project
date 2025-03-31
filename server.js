import express from 'express';

import { isLogged } from './controllers/isLogged.js'
import { handleRegister } from './firebase/controllers/handleRegister.js';
import { isValidLogin } from "./firebase/controllers/isValidLogin.js"
import { sendCalcMetro } from "./services/calc/metro.js"

import path from 'path';
import { fileURLToPath } from 'url';

import session from 'express-session';
import passport from './config/passport-config.js';
import { isSKipped, checkAccess } from './controllers/isSkipped.js';

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
app.use('/protected', checkAccess, express.static(path.join(__dirname, 'protected')));

app.get("/", function (req, res) {
  try{
    res.sendFile(__dirname + '/views/index.html');
  }catch(err){
    console.error(err);
  }
  
});

app.get("/home", function (req, res) {
  try{
    if(isLogged()){
      res.sendFile(__dirname + '/protected/home.html');
    }
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

app.post("/api/login", 
  isValidLogin, 
  passport.authenticate('local', {
  successRedirect: '/home', 
  failureRedirect: '/', 
  failureFlash: false
}));

app.post("/api/calc/metro", sendCalcMetro);
app.post("/api/register", handleRegister);

app.post("/api/skip", isSKipped, function(req, res){
  res.sendFile(__dirname + '/protected/home.html');
});

const port = 3030;
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});