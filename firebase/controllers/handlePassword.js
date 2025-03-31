function handleInput(password, username, email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    
    if (!email || !password || !username) {
        return res.status(400).json({ error: 'Todos os campos são obrigatórios.' });
    }

    if (!emailRegex.test(email)) {
        return res.status(400).json({ error: 'E-mail inválido.' });
    }

    if (password.length < 8) {
        return res.status(400).json({ error: 'A senha deve ter pelo menos 8 caracteres.' });
    }

    const specialChars = "!@#$%¨&*()_+[]{}|;:',.<>?/`~";
    for (let i = 0; i < password.length; i++) {
        const char = password[i];

        if (/[a-zA-Z]/.test(char)) {
            stringCount++;
        } else if (/[0-9]/.test(char)) {
            numberCount++;
        } else if (specialChars.includes(char)) {
            specialCharCount++;
        }
    }

    if (stringCount < 2 && numberCount < 2 && specialCharCount < 1) {
        return res.status(400).json({ error: 'A senha deve conter no mínimo 3 letras, 2 números e 1 caractere especial' });
    } 
}

export { handleInput } 