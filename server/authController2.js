// server/authController.js
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';

let users = []; // In-memory storage for users
let refreshTokens = []; // In-memory storage for refresh tokens

function generateAccessToken(user) {
  return jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '15m' });
}

function generateRefreshToken(user) {
  const refreshToken = jwt.sign(user, process.env.REFRESH_TOKEN_SECRET);
  refreshTokens.push(refreshToken);
  return refreshToken;
}

export default {
  signUp: async (req, res) => {
    const { username, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    users.push({ username, password: hashedPassword });
    res.status(201).json({ message: 'User created' });
  },

  login: async (req, res) => {
    const { username, password } = req.body;
    const user = users.find(u => u.username === username);
    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(403).json({ message: 'Invalid credentials' });
    }
    const accessToken = generateAccessToken({ name: username });
    const refreshToken = generateRefreshToken({ name: username });
    res.json({ accessToken, refreshToken });
  },

  refreshToken: (req, res) => {
    const { token: refreshToken } = req.body;
    if (!refreshToken || !refreshTokens.includes(refreshToken)) {
      return res.sendStatus(403);
    }
    jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, user) => {
      if (err) return res.sendStatus(403);
      const accessToken = generateAccessToken({ name: user.name });
      res.json({ accessToken });
    });
  }
};
