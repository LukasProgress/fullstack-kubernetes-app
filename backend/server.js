const express = require("express");
const { Pool } = require("pg");
const fs = require("fs");

const getSecret = (path) => fs.readFileSync(path, "utf8").trim();
console.log("Connecting to PostgreSQL...");
const pool = new Pool({
  user: getSecret("/secrets/username"),
  host: "postgres",
  database: getSecret("/secrets/database"),
  password: getSecret("/secrets/password"),
  port: 5432,
});
console.log("Connecting to PostgreSQL complete");

const app = express();
app.use(express.json());

app.get("/data", async (req, res) => {
    try {
      // Sicherstellen, dass die Tabelle existiert
      await pool.query(`CREATE TABLE IF NOT EXISTS items (
        id SERIAL PRIMARY KEY,
        name TEXT NOT NULL
      );`);
      
      // Daten abrufen
      const result = await pool.query("SELECT * FROM items;");
      res.json(result.rows);
    } catch (error) {
      console.error("Database error:", error);
      res.status(500).json({ error: "Database error" });
    }
  });
  

app.post("/data", async (req, res) => {
  const { name } = req.body;
  await pool.query("INSERT INTO items (name) VALUES ($1)", [name]);
  res.send("Inserted!");
});

app.listen(3000, "0.0.0.0", () => console.log("API running on port 3000"));