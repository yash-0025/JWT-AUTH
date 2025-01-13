const jwt = require("jsonwebtoken");


const authenticateToken = (req, res, next) => {
    try {
        const token = req.cookies.token;
        if (!token) {
            return res.status(401).json({ message: "Access Denied. No token Provided" });
        }
        jwt.verify(token, process.env.SECRET_KEY, (err, user) => {
            if (err) {
                return res.status(403).json({ message: "Invalid or Expired Token" });
            }
            req.user = user;
            next();
        });
    } catch(error) {
        res.status(500).json({message: "Internal Server Error ", error : error.message});
    }
};

const authorizeAdmin = (req,res,next) => {
    try {
        if(req.user.role !== "admin") {
            return res.status(403).json({message: "Access Denied: Admin only"});
        }
        next();
    }catch(error) {
        res.status(500).json({message: "Internal Server Error", error: error.message});
    }
}

module.exports = {authenticateToken, authorizeAdmin};