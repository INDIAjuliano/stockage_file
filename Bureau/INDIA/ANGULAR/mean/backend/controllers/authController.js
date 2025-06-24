import User from '../models/User.js'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import { isSuperAdmin } from '../middlewares/isSuperAdmin.js';


// Register
export const register = async (req, res) => {
    // const { name, email, password, role } = req.body

    if (!name || !email || !password) {
        return res.status(400).json({ message: 'Tous les champs sont requis' });
    }

    try {
        const existingUser = await User.findOne({ $or: [{ email }, { name }] });
        if (existingUser) {
            return res.status(400).json({
                message: existingUser.email === email
                    ? 'Email déjà utilisé'
                    : 'Nom déjà utilisé'
            });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = await User.create({ name, email, password: hashedPassword, role: 'user' });
        // const newUser = await User.create({ name, email, password: hashedPassword, role: role || 'user' });


        // ✅ Génère le token immédiatement après l'enregistrement
        const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET, { expiresIn: '4h' });

        // ✅ Renvoie directement le token + user
        res.status(201).json({
            token,
            user: {
                name: newUser.name,
                email: newUser.email,
                role: newUser.role
            }
        });
    } catch (err) {
        res.status(500).json({ message: 'Erreur serveur', error: err.message });
    }
};

/**
 * Création d'admin sécurisée (admin seulement)
 * Cette fonction doit être utilisée comme contrôleur dans une route protégée par verifyToken et isAdmin
 */
export const createAdmin = async (req, res) => {
    if (req.user && req.user.role === 'superAdmin') {
        const { name, email, password } = req.body;

        if (!name || !email || !password) {
            return res.status(400).json({ message: 'Tous les champs sont requis' });
        }

        try {
            const existingUser = await User.findOne({ $or: [{ email }, { name }] });
            if (existingUser) {
                return res.status(400).json({
                    message: existingUser.email === email
                        ? 'Email déjà utilisé'
                        : 'Nom déjà utilisé'
                });
            }

            const hashed = await bcrypt.hash(password, 10);
            const newAdmin = await User.create({ name, email, password: hashed, role: 'admin' });

            return res.status(201).json({
                message: 'Admin créé',
                user: {
                    name: newAdmin.name,
                    email: newAdmin.email,
                    role: newAdmin.role
                }
            });
        } catch (err) {
            return res.status(500).json({ message: 'Erreur serveur', error: err.message });
        }
    } else {
        return res.status(403).json({ message: 'Accès refusé : réservé au super administrateur' });
    }
};


// Login
export const login = async (req, res) => {
    const { email, password } = req.body
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '4h' });

    if (!email || !password) {
        return res.status(400).json({ message: 'Email et mot de passe requis' })
    }
    try {
        const user = await User.findOne({ email })
        if (!user) return res.status(404).json({ message: 'Utilisateur non trouvé' })

        const isMatch = await bcrypt.compare(password, user.password)
        if (!isMatch) return res.status(400).json({ message: 'Mot de passe invalide' })

        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '4h' })

        res.status(200).json({ message: 'Connexion réussie', token, user: { name: user.name, email: user.email } })
    } catch (err) {
        res.status(500).json({ message: 'Erreur serveur', error: err.message })
    }
}