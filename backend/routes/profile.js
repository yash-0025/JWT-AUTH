const express = require("express");
const {authenticateToken} = require("../middlewares/auth");
const router = express.Router();

router.get('/', authenticateToken, async(req,res) => {
    res.json({ message: "Profile fetched Successully", user: req.user});
});


router.put('/', authenticateToken, async(req,res) => {
    try {
        const {username} = req.body;
        const user = await User.findOne(req.user.id);
        user.username = username || user.username;
        await user.save();

        res.json({message:"Error updating profile", error : error.message});
    } catch(error) {
        res.status(500).json({message: "Error Updating profile", error: error.message});
    }
})

module.exports = router;