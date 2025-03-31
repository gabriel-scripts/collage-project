import passport from 'passport';
import { Strategy as LocalStrategy } from 'passport-local';

import bcrypt from 'bcrypt';
import { collection, query, where, getDocs } from "firebase/firestore";

import { db } from '../firebase/config/service_account.js'; 

passport.use(new LocalStrategy(
  { usernameField: 'email' }, 
  async   (email, password, done) => {
    try {
      const usersCollection = collection(db, "user");
      const q = query(usersCollection, where("email", "==", email));
      const querySnapshot = await getDocs(q);

      if (querySnapshot.empty) {
        return done(null, false, { message: 'Usuário não encontrado.' });
        
      }

      const user = querySnapshot.docs[0].data();

      const isPasswordValid = await bcrypt.compare(password, user.password);
      if (!isPasswordValid) {
        return done(null, false, { message: 'Senha incorreta.' });
      }
      return done(null, user);
    } catch (error) {
      return done(error);
    }
  }
));

passport.serializeUser((user, done) => {
  done(null, user.email); 
});

passport.deserializeUser(async (email, done) => {
  try {
    const usersCollection = collection(db, "user");
    const q = query(usersCollection, where("email", "==", email));
    const querySnapshot = await getDocs(q);

    if (querySnapshot.empty) {
      return done(null, false);
    }

    const user = querySnapshot.docs[0].data();
    done(null, user);
  } catch (error) {
    done(error);
  }
});

export default passport;