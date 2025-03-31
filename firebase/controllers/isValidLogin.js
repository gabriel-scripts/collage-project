import { db } from "../config/service_account.js";
import { collection, query, where, getDocs } from "firebase/firestore";
import bcrypt from "bcrypt";

const isValidLogin = async (req, res, next) => {
  
  const { email, password } = req.body;

  try {
    if (!email || !password) {
      return res.status(400).json({ error: "Todos os campos são obrigatórios." });
    }

    const usersCollection = collection(db, "user");
    const q = query(usersCollection, where("email", "==", email));
    const querySnapshot = await getDocs(q);

    if (querySnapshot.empty) {
      return res.status(404).json({ error: "Usuário não encontrado." });
    }

    const user = querySnapshot.docs[0].data(); 
    const isPasswordValid = await bcrypt.compare(password, user.password);  
    if (!isPasswordValid) {
      return res.status(401).json({ error: "Usuário ou senha incorreta" });
    }
    next();
  } catch (error) {
    console.error("Erro ao validar login:", error);
    return res.status(500).json({ error: "Erro interno do servidor." });
  }
};

export { isValidLogin };