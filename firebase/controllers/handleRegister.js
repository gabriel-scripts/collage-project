import { db } from '../config/service_account.js';
import { collection, addDoc } from "firebase/firestore";
import { handleInput } from './handlePassword.js';


import bcrypt from 'bcrypt';


const handleRegister = async (req, res) => {
    const { username, email, password } = req.body;     
    handleInput(password, username, email);

    try {
        const saltRounds = 10;
        const hashedPassword = await bcrypt.hash(password, saltRounds);

        const docRef = await addDoc(collection(db, "user"), {
            name: username,
            email: email,
            password: hashedPassword, 
            createdAt: new Date()
        });
        
        res.status(201).json({ message: 'Usuário registrado com sucesso!' });
    } catch (error) {
        console.error('Erro ao registrar usuário:', error);
        res.status(500).json({ error: 'Erro ao registrar usuário.' });
    }
};

export { handleRegister };