import React, { useState } from "react";
import { Link } from "react-router-dom";
import "../css/global/partials/botao_hamburguer.css";

const Header = () => {
  const [menuAberto, setmenuAberto] = useState(false);

  const alternarMenu = () => setmenuAberto((prev) => !prev);
  const fecharMenu = () => setmenuAberto(false);

  return (
    <header className="cabecalho">
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