const express = require("express");
const mysql = require("mysql2");
const cors = require("cors");
const bodyParser = require("body-parser");

const app = express();
app.use(cors());
app.use(bodyParser.json());

// MySQL connection
const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "Sudhir_1234",
    database: "usersdb",
});

db.connect((err) => {
    if (err) throw err;
    console.log("MySQL Connected...");
});

// CRUD Routes
app.get("/users", (req, res) => {
    db.query("SELECT * FROM users", (err, results) => {
        if (err) throw err;
        res.json(results);
    });
});

app.post("/users", (req, res) => {
    const { name, email, age } = req.body;
    db.query(
        "INSERT INTO users (name, email, age) VALUES (?, ?, ?)",
        [name, email, age],
        (err, result) => {
            if (err) throw err;
            res.json({ id: result.insertId, name, email, age });
        },
    );
});

app.put("/users/:id", (req, res) => {
    const { name, email, age } = req.body;
    db.query(
        "UPDATE users SET name=?, email=?, age=? WHERE id=?",
        [name, email, age, req.params.id],
        (err) => {
            if (err) throw err;
            res.json({ id: req.params.id, name, email, age });
        },
    );
});

app.delete("/users/:id", (req, res) => {
    db.query("DELETE FROM users WHERE id=?", [req.params.id], (err) => {
        if (err) throw err;
        res.json({ message: "User deleted" });
    });
});

app.listen(5000, () => console.log("Server running on port 5000"));
