const jwt = require('jsonwebtoken');

const protect = (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    try {
      token = req.headers.authorization.split(' ')[1];
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      const userId = decoded.userId || decoded.id || decoded._id;

      // Attach decoded payload (userId, role) to req.user
      req.user = {
        userId: userId,
        id: userId,
        _id: userId,
        role: decoded.role || (decoded.user && decoded.user.role) || 'tenant',
      };

      return next();
    } catch (error) {
      return res.status(401).json({
        success: false,
        message: 'Invalid or expired token.',
      });
    }
  }

  if (!token) {
    return res.status(401).json({
      success: false,
      message: 'Not authorized. Please login first.',
    });
  }
};

const authorizeOwner = (req, res, next) => {
  if (req.user && req.user.role === 'owner') {
    next();
  } else {
    return res.status(403).json({
      success: false,
      message: 'Access denied. Owner role required.',
    });
  }
};

module.exports = { protect, authorizeOwner };
