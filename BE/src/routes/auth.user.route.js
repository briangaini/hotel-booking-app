const express = require("express");
const bcrypt = require("bcryptjs");
const User = require("../model/user.model.js");
const generateToken = require("../middleware/generateToken.js");

const router = express.Router();

console.log("✅ auth.user.route.js loaded");

// register a new user
router.post('/register', async (req, res) => {
    try {
        const { email, password, username } = req.body;

        // check if user already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: "Email already registered!" });
        }

        // Create a new user
        const newUser = new User({ email, password, username });

        // 🔑 Save to MongoDB
        await newUser.save();

        console.log("User saved:", newUser);

        // Send success response
        res.status(201).json({ message: "User registered successfully!", user: newUser });

    } catch (error) {
        console.error("Failed to register:", error);
        res.status(500).json({ message: "Registration failed!" });
    }
})

// login a user
router.post("/login", async (req, res) => {
    try {
        const { email, password } = req.body;

        // find user by email
        const user = await User.findOne({ email });
        console.log("Found user:", user);

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        // compare password
        const isMatch = await user.comparePassword (password);
        if (!isMatch) {
            return res.status(401).json({ message: "Invalid password" });
        }

        console.log("✅ Login successful for:", email);
        
        // generate token here
        const token = await generateToken(user._id);
        res.cookie("token", token, {
            httpOnly: true, //enable this only when you have https://
            secure: true,
            sameSite: true
        })
        res.status(200).send({message: 'Login successful!', token, user: {
            _id: user._id,
            email: user.email,
            username: user.username,
            role: user.role
        }})

    } catch (error) {
        console.error("Failed to login:", error);
        res.status(500).json({ message: "Login failed! Try again" });
    }
})

// logout a user
router.post("/logout", async (req, res) => {
    try {
        res.clearCookie('token');
        res.status(200).send({ message: 'Logged out successfully!' })
    } catch (error) {
        console.error("Failed to logout", error);
        res.status(500).json({ message: 'Logout failed!' })
    }
})

// get all users
router.get('/users', async (req, res) => {
    try {
        const users  = await User.find({}, 'id email role');
        res.status(200).send({message: "Users found successfully", users})
    } catch (error) {
        console.error("Error fetching users", error);
        res.status(500).json({ message: 'Failed to fetch users' })
    }
})

// delete a user
router.delete('/users/:id', async (req, res) => {
    try {
        const {id} = req.params;
        console.log(id)
        const user = await User.findByIdAndDelete(id);

        if(!user) {
            return res.status(404).send({message: 'User not found!'});
        }

        res.status(200).send({message: "User deleted successfully!"})

    } catch (error) {
        console.error("Error deleting user", error);
        res.status(500).json({ message: 'Error deleting user!' })
    }
})

// update a user
router.put('/users/:id', async (req, res) => {
    try {

        const {id}  = req.params;
        const {role} = req.body;
        const user  = await User.findByIdAndUpdate(id, {role}, {new: true});
        if(!user) {
            return res.status(404).send({message: 'User not found'})
        }

        res.status(200).send({message: 'User role updated successfully!', user})

    } catch (error) {
        console.error("Error updating user role", error);
        res.status(500).json({ message: 'Failed updating user role!' })
    }
})

module.exports = router;