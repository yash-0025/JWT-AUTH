const express = require("express");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const User = require("../schemas/userSchema");
const router = express.Router();



router.post('/register', async (req,res) => {
    console.log("Checking Database connection");
    console.log("REceived request :: ", req.body);
    const {username, password, role} = req.body;
    try {
        if(!username || !password) {
            console.log("Missing fields");
            return res.status(400).json({message: "Username and password is required"});
        }

        const existingUser = await User.findOne({username});
        if(existingUser) {
            return res.status(400).json({message: "Username already exist"});
        }

        const newUser = new User({username, password, role});
        console.log("Before saving Password ::", newUser.password);
        await newUser.save();
        console.log("After Saving password :: ", newUser.password);
        res.status(201).json({message: "User registered successfully. "});
    } catch (error) {
        res.status(500).send( { message : "Error Occured while registering user", error});
    }
});


router.post('/login', async(req,res) => {
    console.log("Full body ::", req.body);
    const {username, password} = req.body;
    try{
        const user = await User.findOne({username});
        console.log("Found user ::", user ? "yes" : "NO");
        console.log("Input password ::", password);
        console.log("Stored hashed password :: ", user?.password);

        if(!user) {
            return res.status(400).send({ message: "Invalid Credentials"});
        }
        console.log("Comparing password")
        const isMatch = await bcrypt.compare(password, user.password);
        console.log("Password Match :: ", isMatch);

        if(!isMatch) {
            return res.status(400).json({message: "Invalid Credentials"});
        }

        const token = jwt.sign({ 
            id: user._id,
            role: user.role
        },
            process.env.SECRET_KEY,
            {expiresIn: "1h"}
        );
        res.cookie("token", token, {httpOnly: true});
        if(user.role === "admin") {
            return res.json({
                message: "Welcome to dashboard",
                user: {
                    _id: user._id,
                    username: user.username
                }
            });
        }
        res.json({
            message: "Login Successful",
            token: token,
            user: {
                _id: user._id,
                username: user.username,
                role: user.role
            }
        });
        // res.send({message: "Loging successful", role: user.role});
    } catch(error) {
        res.status(500).send({ message: "Error Logging in ::", error});
    }
});



router.post('/logout', (req,res) => {
    res.clearCookie("token");
    res.send({ message: "Logged OUt successfully"});
})

router.get('/getall', async (req,res) => {
    console.log("Fetching user request")
    try {
        const users = await User.find({}, "-password");
        res.status(200).json(users);
    } catch(error) {
        console.error("Error fetching users", error);
        res.status(500).json({message:"Failed to fetch users"});
    }
})

module.exports = router;