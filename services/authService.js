const jwt = require('jsonwebtoken');

// Generate a token for the user upon successful login
const generateToken = (userData) => {
    const token = jwt.sign({ id: userData.id, email: userData.email }, 'yourSecretKeyHere', { expiresIn: '1h' });
    return token;
};
