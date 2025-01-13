const express = require("express");
const session = require("express-session");


const app = express();


app.use(session({
    secret: 'secret_key',
    resave: false,
    saveUninitialized: true,
    cookie: {secure: false} // Set to true in production with HTTPs
}));


app.get("/", (req,res) => {
    if(req.session.views) {
        req.session.views++;
        res.send(`Visited ${req.session.views} times`);
    }else {
        req.session.views = 1;
        res.send(`Welcome! first visit.`);
    }
})

app.listen(3000 , () => console.log("Server is up and running on port 3000"))