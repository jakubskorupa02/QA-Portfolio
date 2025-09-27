import React from "react";
import "./Games.css";

export function PrevGame() {
  return (
    <>
      <div className="App">
        <div className="Content">
          <div className="grid-container">
            <div className="grid-item">
              <img
                src={require("../../assets/arsenal_logo.png")}
                alt="logo_afc"
              />
            </div>
            <div className="grid-item">
              <span>0:0</span>
            </div>
            <div className="grid-item">
              <img src={require("../../assets/lfc_logo.png")} alt="logo_lfc" />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
