import React, { useState, useEffect } from "react";
import "./Table.css";

export function Table() {
  const [teamData, setTeamData] = useState([
    { name: "Manchester City", GP: 2, W: 2, D: 0, L: 0, GD: 5, PTS: 6 },
    { name: "Liverpool", GP: 2, W: 2, D: 0, L: 0, GD: 4, PTS: 6 },
    { name: "Chelsea", GP: 2, W: 2, D: 0, L: 0, GD: 3, PTS: 6 },
    { name: "Arsenal", GP: 2, W: 2, D: 0, L: 0, GD: 5, PTS: 6 },
    { name: "Everton", GP: 2, W: 2, D: 0, L: 0, GD: 4, PTS: 6 },
    { name: "West Ham United", GP: 2, W: 0, D: 2, L: 0, GD: 3, PTS: 2 },
    { name: "Aston Villa", GP: 2, W: 2, D: 0, L: 0, GD: 5, PTS: 0 },
    { name: "Fulham", GP: 2, W: 0, D: 0, L: 2, GD: 4, PTS: 0 },
    { name: "Newcastle United", GP: 2, W: 2, D: 0, L: 2, GD: 3, PTS: 0 },
    { name: "Wolves", GP: 2, W: 0, D: 0, L: 2, GD: 5, PTS: 0 },
    { name: "Southampton", GP: 2, W: 1, D: 1, L: 0, GD: 4, PTS: 0 },
    { name: "Leicester", GP: 2, W: 0, D: 0, L: 2, GD: 3, PTS: 0 },
    // ... reszta danych
  ]);

  const [team1, setTeam1] = useState("");
  const [team2, setTeam2] = useState("");
  const [goalsTeam1, setGoalsTeam1] = useState("");
  const [goalsTeam2, setGoalsTeam2] = useState("");

  const updateResult = () => {
    if (team1 && team2 && goalsTeam1 !== "" && goalsTeam2 !== "") {
      const updatedTeamData = [...teamData];
      const team1Index = updatedTeamData.findIndex(
        (team) => team.name === team1
      );
      const team2Index = updatedTeamData.findIndex(
        (team) => team.name === team2
      );

      if (team1Index !== -1 && team2Index !== -1) {
        const goals1 = parseInt(goalsTeam1, 10);
        const goals2 = parseInt(goalsTeam2, 10);

        updatedTeamData[team1Index].GP += 1;
        updatedTeamData[team2Index].GP += 1;

        if (goals1 > goals2) {
          updatedTeamData[team1Index].W += 1;
          updatedTeamData[team1Index].PTS += 3;
          updatedTeamData[team2Index].L += 1;
        } else if (goals1 < goals2) {
          updatedTeamData[team2Index].W += 1;
          updatedTeamData[team2Index].PTS += 3;
          updatedTeamData[team1Index].L += 1;
        } else {
          updatedTeamData[team1Index].D += 1;
          updatedTeamData[team1Index].PTS += 1;
          updatedTeamData[team2Index].D += 1;
          updatedTeamData[team2Index].PTS += 1;
        }

        // Zaktualizuj GD (Gole różnica) dla obu drużyn
        updatedTeamData[team1Index].GD += goals1 - goals2;
        updatedTeamData[team2Index].GD += goals2 - goals1;

        // Sortuj tablicę drużyn według punktów (PTS) w malejącej kolejności
        updatedTeamData.sort((a, b) => b.PTS - a.PTS);

        // Przypisz nowe pozycje drużynom
        updatedTeamData.forEach((team, index) => {
          team.position = index + 1;
        });

        setTeamData(updatedTeamData);
      } else {
        alert("Nie znaleziono drużyn o podanych nazwach.");
      }
    } else {
      alert("Wprowadź nazwy obu drużyn i wynik meczu.");
    }
  };

  const saveResultsToDatabase = async () => {
    const resultsToSave = teamData.map((team) => {
      return {
        team1: team.name,
        score1: team.GD,
        team2: "",
        score2: 0,
      };
    });

    console.log("Results to save:", resultsToSave);

    try {
      const response = await fetch("http://localhost:3001/saveResults", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(resultsToSave),
      });

      console.log("Server Response:", response);

      if (response.ok) {
        console.log("Results saved to database successfully!");
        // Add any additional logic here
      } else {
        console.error("Error saving results to database:", response.statusText);
      }
    } catch (error) {
      console.error("Error saving results to database:", error.message);
    }
  };

  useEffect(() => {
    saveResultsToDatabase();
  }, [teamData]);

  const getExistingEntry = async (result) => {
    const response = await fetch("http://localhost:3001/getExistingEntry", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ team1: result.team1, team2: result.team2 }),
    });

    return response.json();
  };

  const updateExistingEntry = async (result) => {
    // Implement the logic to update the existing entry
    // ...
  };

  const insertNewEntry = async (result) => {
    const values = [result.team1, result.score1, result.team2, result.score2];

    const response = await fetch("http://localhost:3001/insertNewEntry", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ values }),
    });

    return response.json();
  };

  return (
    <>
      <div className="App">
        <div className="Content">
          <div className="ptable">
            <table>
              <tbody>
                {teamData.map((team) => (
                  <tr key={team.name} className="wpos">
                    <td>{team.position}</td>
                    <td>{team.name}</td>
                    <td>{team.GP}</td>
                    <td>{team.W}</td>
                    <td>{team.D}</td>
                    <td>{team.L}</td>
                    <td>{team.GD}</td>
                    <td>{team.PTS}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="form-container">
            <input
              type="text"
              placeholder="Nazwa drużyny 1"
              value={team1}
              onChange={(e) => setTeam1(e.target.value)}
              style={{ width: "150px", margin: "20px" }}
            />
            <input
              type="text"
              placeholder="Nazwa drużyny 2"
              value={team2}
              onChange={(e) => setTeam2(e.target.value)}
              style={{ width: "150px", margin: "20px" }}
            />
            <input
              type="number"
              placeholder="Bramki drużyny 1"
              value={goalsTeam1}
              onChange={(e) => setGoalsTeam1(e.target.value)}
              style={{ width: "150px", margin: "20px" }}
            />
            <input
              type="number"
              placeholder="Bramki drużyny 2"
              value={goalsTeam2}
              onChange={(e) => setGoalsTeam2(e.target.value)}
              style={{ width: "150px", margin: "20px" }}
            />
            <button type="button" onClick={updateResult}>
              Zaktualizuj Wyniki
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
