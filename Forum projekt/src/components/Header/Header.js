
import React, { useState, useEffect } from "react";
import "./Header.css";
import { CSSTransition } from "react-transition-group";
import { Link } from "react-router-dom";

export default function Header() {
  const [isNavVisible, setNavVisibility] = useState(false);
  const [isSmallScreen, setIsSmallScreen] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(max-width: 700px)");
    mediaQuery.addEventListener("change", () => {
      handleMediaQueryChange(mediaQuery);
    });

    return () => {
      mediaQuery.removeEventListener(handleMediaQueryChange);
    };
  }, []);

  const handleMediaQueryChange = (mediaQuery) => {
    if (mediaQuery.matches) {
      setIsSmallScreen(true);
    } else {
      setIsSmallScreen(false);
    }
  };

  const toggleNav = () => {
    setNavVisibility(!isNavVisible);
  };

  return (
    <header className="Header">
      <img
        src={require("../../assets/arsenal_logo.png")}
        className="Logo"
        alt="logo"
      />
      <CSSTransition
        in={!isSmallScreen || isNavVisible}
        timeout={350}
        classNames="NavAnimation"
        unmountOnExit
      >
        <nav className="Nav">
          <Link to="/">Strona główna</Link>
          <Link to="/tabela">Tabela</Link>
          <Link to="/historia">Historia</Link>
          <Link to="/poprzedni-mecz">Poprzedni mecz</Link>
          <Link to="/nastepny-mecz">Następny mecz</Link>
          <Link to="/forum">Forum</Link>
        
       
        </nav>
      </CSSTransition>
      <button onClick={toggleNav} className="Burger">
        <img
          src={require("../../assets/menu_button.png")}
          className="BurgerLogo"
          alt="BurgerLogo"
        />
      </button>
    </header>
  );
}
