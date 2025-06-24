import jwt from 'jsonwebtoken'

export const verifyToken = (req, res, next) => {
    const bearer = req.headers['authorization']
    if (!bearer) return res.status(401).json({ message: 'Token manquant' })

    const token = bearer.split(' ')[1]

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET)
        req.user = decoded
        next()
    } catch (err) {
        return res.status(403).json({ message: 'Token invalide ou expiré' })
    }
}
