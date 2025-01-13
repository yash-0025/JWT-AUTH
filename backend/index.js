const express = require("express");
const cookieParser = require("cookie-parser");
const connectDB = require("./utils/database");
const cors = require("cors")
const dotenv = require("dotenv");
const authRoutes = require("./routes/auth");
const profileRoutes = require('./routes/profile');


dotenv.config();

const app = express();

app.use(express.json());
app.use(cookieParser());
app.use(cors({origin: "http://localhost:3000", credentials: true}));

connectDB();

app.use("/api/auth", authRoutes);
app.use("/api/profile", profileRoutes);



// app.use("/auth")

const PORT = process.env.PORT || 5001
app.listen(PORT, () => console.log(`Server is up and running on port ${PORT}` ));