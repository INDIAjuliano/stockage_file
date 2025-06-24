export const isSuperAdmin = (req, res, next) => {
    if (req.user && req.user.role === 'superAdmin') {
        next();
    } else {
        res.status(403).json({ message: 'Accès refusé : réservé au super administrateur' });
    }
};
