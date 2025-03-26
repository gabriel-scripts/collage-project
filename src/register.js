import { db } from '../firebase/config/service_account.js';
import { collection, addDoc } from "firebase/firestore";

import bcrypt from 'bcrypt';


const handleRegister = async (req, res) => {
    const test = req.body;
    console.log(test);
   
    const { username, email, password } = req.body; 

    try {
        if (!email || !password || !username) {
            return res.status(400).json({ error: 'Todos os campos são obrigatórios.' });
        }

        const saltRounds = 10; // Define o número de rounds para o salt
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