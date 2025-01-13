const express = require("express");
const cookieParser = require("cookie-parser");


const app = express();
app.use(cookieParser());

app.get("/set-cookies", (req,res) => {
    res.cookie("user", "User name", {maxAge: 900000, httpOnly: true});
    res.send("Cookie set!!");
});


app.get("/get-cookies", (req,res) => {
    const user = req.cookies.user;
    res.send(`Hello ${user}`);
})

app.listen(3000, () => console.log('Server is running on port 3000'))