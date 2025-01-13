const express = require("express");
const NodeCache = require("node-cache")


const app = express();
const cache = new NodeCache({ stdTTL: 60}); // Cache TTL of 60 seconds

app.get("/data", (req, res) => {
    const key = "data";
    if (cache.has(key)) {
        res.send(cache.get(key))
    } else {
        const data = {message: "Fresh Data !"}
        cache.set(key, data)
        res.send(data);
    }
})

app.listen(3000, () => console.log("Server is up and running on port 3000"))