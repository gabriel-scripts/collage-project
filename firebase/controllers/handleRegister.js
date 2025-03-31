import { db } from '../config/service_account.js';
import { collection, addDoc } from "firebase/firestore";

import bcrypt from 'bcrypt';


const handleRegister = async (req, res) => {
    console.log(req.body);
    const { username, email, password } = req.body; 

    try {
        if (!email || !password || !username) {
            return res.status(400).json({ error: 'Todos os campos são obrigatórios.' });
        }
        
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            return res.status(400).json({ error: 'E-mail inválido.' });
        }

        if (password.length < 8) {
            return res.status(400).json({ error: 'A senha deve ter pelo menos 8 caracteres.' });
        }

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