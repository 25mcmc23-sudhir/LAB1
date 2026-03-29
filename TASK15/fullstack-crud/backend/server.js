const express = require("express");
const cors = require("cors");
const db = require("./db");

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
    res.send("API is running...");
});

/* CREATE */
app.post("/users", (req, res) => {
    const { name, email } = req.body;

    db.query("INSERT INTO users (name, email) VALUES (?, ?)", [name, email], (err, result) => {
        if (err) return res.status(500).json(err);
        res.json({ id: result.insertId, name, email });
    });
});

/* READ */
app.get("/users", (req, res) => {
    db.query("SELECT * FROM users", (err, result) => {
        if (err) return res.status(500).json(err);
        res.json(result);
    });
});

/* DELETE */
app.delete("/users/:id", (req, res) => {
    db.query("DELETE FROM users WHERE id=?", [req.params.id], (err) => {
        if (err) return res.status(500).json(err);
        res.json({ message: "Deleted" });
    });
});

app.listen(5000, () => {
    console.log("Server running on http://localhost:5000");
});
