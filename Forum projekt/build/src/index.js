import React from "react";
import ReactDOM from "react-dom";
import "./styles.css";
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import { HomePage } from "./components/HomePage/HomePage";
import { Table } from "./components/Table/Table";
import { History } from "./components/History/History";
import { NextGame } from "./components/Games/NextGame";
import { PrevGame } from "./components/Games/PrevGame";
import { Forum } from "./components/Forum/forum";
import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/tabela" element={<Table />}></Route>
          <Route path="/historia" element={<History />}></Route>
          <Route path="/nastepny-mecz" element={<NextGame />}></Route>
          <Route path="/poprzedni-mecz" element={<PrevGame />}></Route>
          <Route path="/forum" element={<Forum />}></Route>
         
          
        </Routes>
        <Footer />
      </BrowserRouter>
    </div>
  );
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
