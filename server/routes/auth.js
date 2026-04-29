const express = require('express');
const prisma = require('../lib/prisma');

const router = express.Router();

/**
 * Basic Login Route
 * Returns user info and role based on email/password
 */
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await prisma.user.findUnique({
      where: { email }
    });

    if (!user || user.password !== password) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    // Success - return user data (omitting sensitive info in a real app)
    res.json({
      id: user.id,
      email: user.email,
      role: user.role,
      name: user.name
    });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ message: 'Server error during login' });
  }
});

module.exports = router;
