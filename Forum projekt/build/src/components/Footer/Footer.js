
import React, { useEffect, useState } from "react";
import "./Footer.css";

export default function Footer() {
  const [clock, setClock] = useState();

  useEffect(() => {
    setInterval(() => {
      const date = new Date();
      const h = date.getHours();
      const m = (date.getMinutes() < 10 ? "0" : "") + date.getMinutes();
      const s = (date.getSeconds() < 10 ? "0" : "") + date.getSeconds();
      setClock(h + ":" + m + ":" + s);
    }, 1000);
  }, []);

  return (
    <footer className="Footer">
      <div>
        <span>{clock}</span>
      </div>
      <button id="backToTop">
        <a href="#top">↑</a>
      </button>
      © Jakub Skorupa, Bartłomiej Sacha
    </footer>
  );
}
