import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import "./style.css";

export function Results() {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const initialTeam1 = queryParams.get("team1") || "";
  const initialScore1 = queryParams.get("score1") || "";
  const initialTeam2 = queryParams.get("team2") || "";
  const initialScore2 = queryParams.get("score2") || "";

  const [team1, setTeam1] = useState(initialTeam1);
  const [score1, setScore1] = useState(initialScore1);
  const [team2, setTeam2] = useState(initialTeam2);
  const [score2, setScore2] = useState(initialScore2);
  const [saveError, setSaveError] = useState(null);

  const isNumeric = (value) => /^\d+$/.test(value);

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    if (!isNumeric(score1) || !isNumeric(score2)) {
      setSaveError("Scores must be numeric");
      return;
    }

    try {
      const response = await fetch("http://localhost:3001/saveResults", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ team1, score1, team2, score2 }),
      });

      if (response.ok) {
        console.log("Results saved successfully!");
        setSaveError(null);
      } else {
        console.error("Error saving results:", response.statusText);
        setSaveError("Error saving results");
      }
    } catch (error) {
      console.error("Error saving results:", error.message);
      setSaveError("Error saving results");
    }
  };

  useEffect(() => {
    // Możesz dodać dodatkową logikę lub obsługę efektów ubocznych tutaj
  }, [team1, score1, team2, score2]);

  return (
    <div className="results-container">
      <h1>Wyniki Meczy</h1>
      <form onSubmit={handleFormSubmit}>
        <label>
          Zespół 1:
          <input
            type="text"
            value={team1}
            onChange={(e) => setTeam1(e.target.value)}
          />
        </label>
        <br />
        <label>
          Wynik 1:
          <input
            type="text"
            value={score1}
            onChange={(e) => setScore1(e.target.value)}
          />
        </label>
        <br />
        <label>
          Zespół 2:
          <input
            type="text"
            value={team2}
            onChange={(e) => setTeam2(e.target.value)}
          />
        </label>
        <br />
        <label>
          Wynik 2:
          <input
            type="text"
            value={score2}
            onChange={(e) => setScore2(e.target.value)}
          />
        </label>
        <br />
        <button type="submit">Submit</button>
      </form>
      {saveError && <p style={{ color: "red" }}>{saveError}</p>}
      {team1 && <p>Team 1: {team1}</p>}
      {score1 && <p>Score 1: {score1}</p>}
      {team2 && <p>Team 2: {team2}</p>}
      {score2 && <p>Score 2: {score2}</p>}
    </div>
  );
}
