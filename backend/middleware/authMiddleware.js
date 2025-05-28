const admin = require('firebase-admin');

// Make sure Firebase Admin SDK is initialized in your backend app
// Example (somewhere at app startup):
// admin.initializeApp({
//   credential: admin.credential.cert(serviceAccount)
// });

const protect = async (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ message: 'Not authorized, no token' });
  }

  const token = authHeader.split(' ')[1];

  try {
    // Verify Firebase ID token
    const decodedToken = await admin.auth().verifyIdToken(token);

    // Attach user info to request object
    req.user = decodedToken;
    next();
  } catch (error) {
    console.error('Firebase token verification failed:', error);
    res.status(401).json({ message: 'Not authorized, token failed' });
  }
};

module.exports = protect;
