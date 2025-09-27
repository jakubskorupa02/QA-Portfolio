import React from "react";
import "./Games.css";

export function NextGame() {
  return (
    <>
      <div className="App">
        <div className="Content">
          <div className="grid-container">
            <div className="grid-item">
              <img
                src={require("../../assets/manu_logo.png")}
                alt="logo_manu"
              />
            </div>
            <div className="grid-item">
              <span>?:?</span>
            </div>
            <div className="grid-item">
              <img
                src={require("../../assets/arsenal_logo.png")}
                alt="logo_afc"
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
