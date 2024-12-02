const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const router = express.Router();

// Helper to assign IPL team
const assignIPLTeam = (favoriteColor) => {
    const teams = {
        red: "RCB",
        blue: "MI",
        yellow: "CSK",
    };
    return teams[favoriteColor.toLowerCase()] || "Neutral";
};

// Register Endpoint
router.post('/api/auth/register', async (req, res) => {
    try {
        const { name, email, password, favoriteColor } = req.body;
        const team = assignIPLTeam(favoriteColor);
        const user = new User({ name, email, password, team });
        await user.save();
        res.status(201).json({ message: "Registration successful", team });
    } catch (err) {
        res.status(500).json({ error: "Registration failed" });
    }
});

// Login Endpoint
router.post('/api/auth/login', async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });
        if (!user || !(await bcrypt.compare(password, user.password))) {
            return res.status(400).json({ error: "Invalid credentials" });
        }
        const token = jwt.sign({ id: user._id, team: user.team }, process.env.JWT_SECRET, { expiresIn: "1d" });
        res.json({ token, team: user.team });
    } catch (err) {
        res.status(500).json({ error: "Login failed" });
    }
});

module.exports = router;
