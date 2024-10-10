const express = require('express');
const User = require('../models/user');
const jwt = require('jsonwebtoken');
const auth = require('../middleware/auth');
const bcrypt = require('bcryptjs');

const router = express.Router();

// User Registration
router.post('/register', async (req, res) => {
  try {
    const user = new User(req.body);
    user.password = await bcrypt.hash(req.body.password, 8);
    await user.save();
    const token = jwt.sign({ _id: user._id.toString() }, process.env.JWT_SECRET);
    res.status(201).send({ user, token });
  } catch (error) {
    res.status(400).send(error);
  }
});

// User Login
router.post('/login', async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    if (!user) {
      return res.status(401).send({ error: 'Invalid credentials' });
    }
    
    const isPasswordMatch = await user.comparePassword(req.body.password);
    if (!isPasswordMatch) {
      return res.status(401).send({ error: 'Invalid credentials' });
    }
    
    const token = jwt.sign({ _id: user._id.toString() }, process.env.JWT_SECRET);
    res.send({ user, token });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).send({ error: 'An error occurred during login' });
  }
});

// User Logout
router.post('/logout', auth, async (req, res) => {
  try {
    req.user.tokens = req.user.tokens.filter((token) => {
      return token.token !== req.token;
    });
    await req.user.save();
    res.send();
  } catch (error) {
    res.status(500).send(error);
  }
});

router.get('/check-password/:email', async (req, res) => {
  try {
    const user = await User.findOne({ email: req.params.email });
    if (!user) {
      return res.status(404).send({ error: 'User not found' });
    }
    res.send({ hashedPassword: user.password });
  } catch (error) {
    res.status(500).send(error);
  }
});

router.post('/reset-password', async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    if (!user) {
      return res.status(404).send({ error: 'User not found' });
    }
    const salt = await bcrypt.genSalt(8);
    const hashedPassword = await bcrypt.hash(req.body.newPassword, salt);
    console.log('New hashed password:', hashedPassword);
    
    // Use updateOne to bypass pre-save hooks
    await User.updateOne({ _id: user._id }, { $set: { password: hashedPassword } });
    
    // Verify the password was saved correctly
    const updatedUser = await User.findOne({ email: req.body.email });
    console.log('Stored password after update:', updatedUser.password);
    
    // Immediately test the new password
    const isMatch = await bcrypt.compare(req.body.newPassword, updatedUser.password);
    console.log('Immediate password test result:', isMatch);
    
    res.send({ message: 'Password reset successfully', passwordTestResult: isMatch });
  } catch (error) {
    console.error('Reset password error:', error);
    res.status(400).send(error);
  }
});

router.post('/manual-compare', async (req, res) => {
  try {
    console.log('Received request body:', req.body);
    const user = await User.findOne({ email: req.body.email });
    if (!user) {
      return res.status(404).send({ error: 'User not found' });
    }
    
    console.log('Stored hash:', user.password);
    console.log('Provided password:', req.body.password);
    
    if (!req.body.password) {
      return res.status(400).send({ error: 'Password is required' });
    }
    
    const isMatch = await bcrypt.compare(req.body.password, user.password);
    console.log('Manual compare result:', isMatch);
    
    res.send({ isMatch });
  } catch (error) {
    console.error('Manual compare error:', error);
    res.status(500).send({ error: 'An error occurred during manual comparison' });
  }
});

router.post('/test-bcrypt', async (req, res) => {
  try {
    const { password } = req.body;
    const salt = await bcrypt.genSalt(8);
    const hash = await bcrypt.hash(password, salt);
    console.log('Generated hash:', hash);
    const isMatch = await bcrypt.compare(password, hash);
    console.log('Comparison result:', isMatch);
    res.json({ hash, isMatch });
  } catch (error) {
    console.error('Bcrypt test error:', error);
    res.status(500).json({ error: 'Bcrypt test failed' });
  }
});

module.exports = router;