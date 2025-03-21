import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom"; // Importando o useLocation

import "../css/global/partials/header.css";

const Header = ({ tipo }) => {
  const [menuAberto, setMenuAberto] = useState(false);
  const [mostrarHeader, setMostrarHeader] = useState(true);

  const alternarMenu = () => setMenuAberto((prev) => !prev);
  const fecharMenu = () => setMenuAberto(false);

  const location = useLocation(); // Obtém a localização atual

  useEffect(() => {
    let prevScrollPos = window.pageYOffset;

    const handleScroll = () => {
      const currentScrollPos = window.pageYOffset;
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
  }, []);

  useEffect(() => {
    let prevScrollPos = window.pageYOffset;

    const handleScroll = () => {
      const currentScrollPos = window.pageYOffset;

      if (prevScrollPos < currentScrollPos && menuAberto) {
        setMenuAberto(false);
      }

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
      <nav className={`cabecalho_nav ${menuAberto ? "ativo" : ""}`}>
        <div className="div_titulo_academia">
          <Link to="/">
            <h1 className="titulo_academia">Iron <b className="titulo_academia_destaque">Fit</b></h1>
          </Link>
        </div>
        
        <div className="links_1024">
          <Link to="/todos_produtos">
            <p className="item_menu_hamburguer link_1024">Nossos Produtos</p>
          </Link>
          <Link to="/">
            <p className="item_menu_hamburguer link_1024">Planos</p>
          </Link>
          <Link to="/">
            <p className="item_menu_hamburguer link_1024 link_1280">Sua Conta</p>
          </Link>
        </div>

        {/* Adicionando o campo de pesquisa se a rota for "/todos_produtos" */}
        {location.pathname === '/todos_produtos' && (
          <div className="campo-pesquisa">
            <input
              type="text"
              placeholder="Buscar produtos..."
              className="input-pesquisa"
            />
          </div>
        )}

        <button
          className="cabecalho_nav_menu_hamburguer"
          onClick={alternarMenu}
          aria-label="Menu"
        >
          <div className={`linhas_harburguer ${menuAberto ? "ativo" : ""}`}>
            <div className="botao_hamburguer linha1"></div>
            <div className="botao_hamburguer linha2"></div>
            <div className="botao_hamburguer linha3"></div>
          </div>
        </button>

        <ul className={`nav-lista ${menuAberto ? "ativo" : ""}`}>
          <li className="nav-lista_item">
            <Link to="/" onClick={fecharMenu}>
              <p className="item_menu_hamburguer">Chat AI</p>
            </Link>
          </li>

          <li className="nav-lista_item">
            <Link to="/" onClick={fecharMenu}>
              <p className="item_menu_hamburguer menor_1280">Sua Conta</p>
            </Link>
          </li>

          <li className="nav-lista_item">
            <Link to="/todos_produtos" onClick={fecharMenu}>
              <p className="item_menu_hamburguer menor_1024">Nossos Produtos</p>
            </Link>
          </li>

          <li className="nav-lista_item">
            <Link to="/" onClick={fecharMenu}>
              <p className="item_menu_hamburguer menor_1024">Planos</p>
            </Link>
          </li>

          <li className="nav-lista_item">
            <Link to="/" onClick={fecharMenu}>
              <p className="item_menu_hamburguer">Seu Carrinho</p>
            </Link>
          </li>

          <li className="nav-lista_item">
            <Link to="/horarios" onClick={fecharMenu}>
              <p className="item_menu_hamburguer">Horários</p>
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;