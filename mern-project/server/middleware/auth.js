import jwt from 'jsonwebtoken';

export const protect = (req, res, next) => {
  try {
    const auth = req.headers.authorization;

    if (!auth || !auth.startsWith('Bearer ')) {
      return res.status(401).json({ success: false, message: 'No token provided' });
    }

    const token = auth.split(' ')[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    if (!decoded?.id && !decoded?._id) {
      return res.status(401).json({ success: false, message: 'Token invalid' });
    }

    req.user = { userId: decoded.id || decoded._id };
    next();
  } catch (err) {
    console.error('Auth error:', err);
    return res.status(401).json({ success: false, message: 'Token invalid' });
  }
};