const express = require("express");
const bodyParser = require("body-parser");
const mysql = require("mysql");
const cors = require("cors");

const app = express();
const port = 3001;

// Konfiguracja połączenia z bazą danych
const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "Gunners1",
  database: "football_results",
  insecureAuth: true,
});

db.connect((err) => {
  if (err) {
    console.error("Błąd połączenia z bazą danych:", err);
  } else {
    console.log("Połączono z bazą danych MySQL");
  }
});

app.use(cors());
app.use(bodyParser.json());

// Helper function to check for existing entry
const getExistingEntry = async (result) => {
  const sql = `
    SELECT * FROM results
    WHERE (team1 = ? AND team2 = ?) OR (team1 = ? AND team2 = ?)
  `;
  return await db.query(sql, [
    result.team1,
    result.team2,
    result.team2,
    result.team1,
  ]);
};

// Helper function to update existing entry
const updateExistingEntry = async (result) => {
  const sql = `
    UPDATE results
    SET score1 = ?, score2 = ?
    WHERE (team1 = ? AND team2 = ?) OR (team1 = ? AND team2 = ?)
  `;
  const values = [
    result.score1,
    result.score2,
    result.team1,
    result.team2,
    result.team2,
    result.team1,
  ];
  return await db.query(sql, values);
};

// Helper function to insert new entry
const insertNewEntry = async (result) => {
  const values = [result.team1, result.score1, result.team2, result.score2];

  const sql = "INSERT INTO results (team1, score1, team2, score2) VALUES (?)";

  return await db.query(sql, [values]);
};

// Obsługa zapytań POST od frontendu
app.post("/saveResults", async (req, res) => {
  try {
    const results = req.body;

    // Walidacja danych wejściowych
    if (!Array.isArray(results) || results.length === 0) {
      return res.status(400).json({ error: "Invalid input data" });
    }

    // Iterate through each result and check for existing entries
    for (const result of results) {
      const existingEntry = await getExistingEntry(result);

      if (existingEntry.length > 0) {
        // Update existing entry
        await updateExistingEntry(result);
      } else {
        // Insert new entry
        await insertNewEntry(result);
      }
    }

    console.log("Wyniki zapisane pomyślnie!");
    res.status(200).send("Wyniki zapisane pomyślnie");
  } catch (err) {
    console.error("Błąd podczas zapisywania wyników:", err);

    // Szczegółowe informacje zwrotne w przypadku błędów MySQL
    const errorDetails = {
      error: "Internal Server Error",
      mysqlError: err.sqlMessage || "",
      mysqlCode: err.code || "",
    };

    res.status(500).json(errorDetails);
  }
});

// Obsługa ogólnych błędów
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: "Internal Server Error" });
});

// Start serwera
app.listen(port, () => {
  console.log(`Serwer backendu uruchomiony na http://localhost:${port}`);
});
