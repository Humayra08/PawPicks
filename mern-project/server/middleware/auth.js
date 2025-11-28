import jwt from 'jsonwebtoken';

export const protect = (req, res, next) => {
  try {
    const auth = req.headers.authorization;

    if (!auth || !auth.startsWith('Bearer ')) {
      return res.status(401).json({ message: 'No token provided' });
    }

    const token = auth.split(' ')[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Attach minimal user context
    req.user = { userId: decoded.id };
    next();
  } catch (err) {
    console.error(err);
    return res.status(401).json({ message: 'Token invalid' });
  }
};