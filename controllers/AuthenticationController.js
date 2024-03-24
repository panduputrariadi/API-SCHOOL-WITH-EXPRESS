const generateToken  = require('../utils/jwtUtils');

function loginUser(req, res) {
    const { username, password } = req.body;
    // Contoh sederhana verifikasi kredensial
    if (username === 'user' && password === 'password') {
        const token = generateToken({ username });
        res.json({ token });
    } else {
        res.status(401).json({ message: 'Invalid username or password' });
    }
}

module.exports = { loginUser };
