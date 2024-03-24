const { generateToken } = require('../utils/jwtUtils');
const model = require('../models/index');
const bcrypt = require('bcrypt');
class AuthController {
    async loginUser(req, res) {
        const { username, password } = req.body;

        try {
            const student = await model.student.findOne({ where: { username: username } });
            if (!student) {
                return res.status(401).json({ message: 'Invalid username or password' });
            }

            const passwordMatch = await bcrypt.compareSync(password, student.password);
            if (!passwordMatch) {
                return res.status(401).json({ message: 'Invalid username or password' });
            }

            // Jika autentikasi berhasil, buat dan kirim token JWT
            const token = generateToken({ id: student.id, username: student.username });
            res.json({ token });
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Internal server error' });
        }
    }
}

module.exports = new AuthController();