import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

import "../css/global/partials/header.css";

const Header = () => {
  const [menuAberto, setmenuAberto] = useState(false);
  const [mostrarHeader, setMostrarHeader] = useState(true);

  const alternarMenu = () => setmenuAberto((prev) => !prev);
  const fecharMenu = () => setmenuAberto(false);

  // Detectar o scroll para exibir ou esconder o header
  useEffect(() => {
    let prevScrollPos = window.pageYOffset;

    const handleScroll = () => {
      const currentScrollPos = window.pageYOffset;
      if (prevScrollPos > currentScrollPos) {
        setMostrarHeader(true); // Rolou para cima, mostra o header
      } else {
        setMostrarHeader(false); // Rolou para baixo, esconde o header
      }
      prevScrollPos = currentScrollPos;
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  // Detectar o scroll para exibir ou esconder o header e fechar o menu se necessário
  useEffect(() => {
    let prevScrollPos = window.pageYOffset;

    const handleScroll = () => {
      const currentScrollPos = window.pageYOffset;

      // Se o usuário rolou para baixo e o menu está aberto, fechamos o menu
      if (prevScrollPos < currentScrollPos && menuAberto) {
        setmenuAberto(false);
      }

      // Se o usuário rolou para cima, mostramos o header
      if (prevScrollPos > currentScrollPos) {
        setMostrarHeader(true);
      } else {
        setMostrarHeader(false);
      }

      prevScrollPos = currentScrollPos;
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [menuAberto]);

  return (
    <header className={`cabecalho ${mostrarHeader ? "visivel" : "escondido"}`}>
      <nav className={`cabecalho__nav ${menuAberto ? "ativo" : ""}`}>
        <h1 className="titulo_academia">Iron <b className="titulo_academia_destaque">Fit</b></h1>
        <button
          className="cabecalho__nav__menu_hamburguer"
          onClick={alternarMenu}
          aria-label="Menu"
        >
          <div className={`linhas_harburguer ${menuAberto ? "ativo" : ""}`}>
            <div className="linha1"></div>
            <div className="linha2"></div>
            <div className="linha3"></div>
          </div>
        </button>

        <ul className={`nav-lista ${menuAberto ? "ativo" : ""}`}>
          <li className="nav-lista__item">
            <Link to="/" onClick={fecharMenu}>
              <p className="item_menu_hamburguer">Teste 1</p>
            </Link>
          </li>

          <li className="nav-lista__item">
            <Link to="/" onClick={fecharMenu}>
              <p className="item_menu_hamburguer">Teste 2</p>
            </Link>
          </li>

          <li className="nav-lista__item">
            <Link to="/" onClick={fecharMenu}>
              <p className="item_menu_hamburguer">Teste 3</p>
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;