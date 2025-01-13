const exp = require("constants");
const express = require("express");
const jwt = require("jsonwebtoken");


const app = express();
const SEC_KEY = 'secret_key';

app.use(express.json());


app.post("/login", (req,res) => {
    const {username, password} = req.body;
    if (username === "admin" && password === "password" ) {
        const token = jwt.sign({ username }, SEC_KEY, {expiresIn: '2h'});
        res.json({token});
    }else {
        res.status(401).send("Invalid credentials");
    }
})

app.get("protected", (req, res) => {
    const token = req.headers.authorization?.split(" ")[1];
    if(!token) return res.status(401).send("Access Denied");

    try {
        const decoded = jwt.verify(token, SEC_KEY);
        res.json({ message: "Welcome!", user: decoded});
    } catch(error) {
        res.status(401).send("Invalid token");
    }
})

app.listen(3000, () => console.log("Server is up and running on port 3000"));