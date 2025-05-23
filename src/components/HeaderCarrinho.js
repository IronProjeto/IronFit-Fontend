import React, { useState, useEffect, useCallback, useContext } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";

import { usePesquisa } from "../context/PesquisaContext";
import { AuthContext } from "../context/AuthContext";

import "../css/global/partials/header.css";
import "../css/global/partials/headerBusca.css";

const Header = ({ tipo }) => {
  const navigate = useNavigate();
  const { authToken } = useContext(AuthContext);
  const [menuAberto, setMenuAberto] = useState(false);
  const [menuCarrinhoAberto, setMenuCarrinhoAberto] = useState(false);
  const [mostrarHeader, setMostrarHeader] = useState(true);

  const [produtos, setProdutos] = useState([]);
  const [ordenacao] = useState("relevancia");

  const location = useLocation();
  const { termoPesquisa, setTermoPesquisa } = usePesquisa();

  const fecharMenu = useCallback(() => setMenuAberto(false), []);

  const fecharMenuCarrinho = useCallback(() => {
    setMenuCarrinhoAberto(false);
    fecharMenu();
  }, [fecharMenu]);

  const alternarMenu = () => {
    setMenuAberto((prev) => {
      const novoEstado = !prev;
      if (novoEstado) {
        setTermoPesquisa("");
      }
      return novoEstado;
    });

    if (menuCarrinhoAberto) {
      setMenuCarrinhoAberto(false);
    }
  };

  const produtosFiltrados = produtos.filter((produto) =>
    produto.nome.toLowerCase().startsWith(termoPesquisa.toLowerCase())
  );

  const usarIncludes =
    termoPesquisa &&
    produtosFiltrados.length === 0 &&
    produtos.filter((produto) =>
      produto.nome.toLowerCase().includes(termoPesquisa.toLowerCase())
    );

  const resultadosPesquisa = produtosFiltrados.length > 0
    ? produtosFiltrados
    : usarIncludes || [];

  const produtosOrdenados = [...resultadosPesquisa].sort((a, b) => {
    if (ordenacao === "preco-asc") {
      return a.preco - b.preco;
    } else if (ordenacao === "preco-desc") {
      return b.preco - a.preco;
    } else if (ordenacao === "relevancia") {
      return 0.5 - Math.random();
    }
    return 0;
  });

  const [quantidadeProdutosPesquisa, setQuantidadeProdutosPesquisa] = useState(3);

  useEffect(() => {
    setTermoPesquisa("");
  }, [location.pathname, setTermoPesquisa]);

  useEffect(() => {
    fetch('https://ironfit-backend.onrender.com/produtos')
      .then(res => res.json())
      .then(data => setProdutos(data));
  }, []);

  useEffect(() => {
    setMostrarHeader(true);

    const timeout = setTimeout(() => {
      let prevScrollPos = window.pageYOffset;

      const handleScroll = () => {
        if (menuCarrinhoAberto) return;

        const currentScrollPos = window.pageYOffset;
        setMostrarHeader(prevScrollPos > currentScrollPos || currentScrollPos < 10);
        prevScrollPos = currentScrollPos;

        if (menuAberto) fecharMenu();
      };

      window.addEventListener("scroll", handleScroll);
      return () => window.removeEventListener("scroll", handleScroll);
    }, 300);

    return () => clearTimeout(timeout);
  }, [location, menuAberto, menuCarrinhoAberto, fecharMenu]);

  useEffect(() => {
    const atualizarQuantidade = () => {
      if (window.innerWidth >= 1920) {
        setQuantidadeProdutosPesquisa(5);
      } else if (window.innerWidth >= 1024) {
        setQuantidadeProdutosPesquisa(4);
      } else if (window.innerWidth >= 480) {
        setQuantidadeProdutosPesquisa(5);
      } else if (window.innerWidth >= 375) {
        setQuantidadeProdutosPesquisa(4);
      } else {
        setQuantidadeProdutosPesquisa(3);
      }
    };

    atualizarQuantidade();
    window.addEventListener("resize", atualizarQuantidade);

    return () => window.removeEventListener("resize", atualizarQuantidade);
  }, []);

  return (
    <header className={`cabecalho ${mostrarHeader ? "visivel" : "escondido"}`}>
      <nav className={`cabecalho_nav ${menuAberto ? "ativo" : ""}`}>
        <div className="div_titulo_academia">
          <Link to="/">
            <h1 className="titulo_academia">
              Iron <b className="titulo_academia_destaque">Fit</b>
            </h1>
          </Link>
        </div>

        <div className="links_1024">
          <Link to="/todos_produtos">
            <p className="item_menu_hamburguer link_1024">Nossos Produtos</p>
          </Link>
          <Link to="/#planos" onClick={fecharMenu}>
            <p className="item_menu_hamburguer link_1024">Planos</p>
          </Link>
          {authToken ? (
            <Link to="/perfil">
              <p className="item_menu_hamburguer link_1024 link_1280">Perfil</p>
            </Link>
          ) : (
            <Link to="/cadastro">
              <p className="item_menu_hamburguer link_1024 link_1280">Sua Conta</p>
            </Link>
          )}
        </div>

        {(location.pathname.startsWith("/todos_produtos") || location.pathname.startsWith("/produto/") || location.pathname.startsWith("/checkout")) && (
          <div className="campo-pesquisa">
            <input
              type="text"
              id="pesquisa"
              maxLength={85}
              placeholder="Encontre o que procura aqui..."
              className="input-pesquisa"
              value={termoPesquisa}
              onChange={(e) => {
                const termo = e.target.value;
                setTermoPesquisa(
                  termo.charAt(0).toUpperCase() + termo.slice(1).toLowerCase()
                );
                fecharMenuCarrinho();
              }}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  e.preventDefault();
                  navigate("/todos_produtos");
                }
              }}
            />
          </div>
        )}

        <AnimatePresence mode="wait">
          {termoPesquisa && resultadosPesquisa.length > 0 && (
            <motion.div
              className="destaques-home"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3, ease: "easeOut" }}
            >
              <h2 className="titulo_pesquisa">Resultado da Pesquisa:</h2>
              <div className="produtos-grid">
                {produtosOrdenados.slice(0, quantidadeProdutosPesquisa).map((produto) => (
                  <div
                    className="produto-card"
                    key={produto.idproduto}
                  >
                    <Link
                      to={`/produto/${produto.idproduto}`}
                      onClick={() => setTermoPesquisa("")}
                    >
                      <img className="img-pesquisado" src={produto.imagens} alt={produto.nome} />
                    </Link>
                    <div className="infos_pesquisa">
                      <Link
                        to={`/produto/${produto.idproduto}`}
                        onClick={() => setTermoPesquisa("")}
                      >
                        <h3>{produto.nome}</h3>
                        <p>R${produto.preco}</p>
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <button
          className={`cabecalho_nav_menu_hamburguer ${menuCarrinhoAberto ? "ativo" : ""}`}
          onClick={alternarMenu}
          aria-label="Menu"
        >
          <div className={`linhas_hamburguer ${menuAberto ? "ativo" : ""}`}>
            <div className="botao_hamburguer linha1"></div>
            <div className="botao_hamburguer linha2"></div>
            <div className="botao_hamburguer linha3"></div>
          </div>
        </button>

        <ul className={`nav-lista ${menuAberto ? "ativo" : ""}`}>
          <li className="nav-lista_item">
            <Link to="/#planos" onClick={fecharMenu}>
              <p className="item_menu_hamburguer menor_1024">Planos</p>
            </Link>
          </li>

          {authToken ? (
            <>
              <li className="nav-lista_item">
                <Link to="/perfil" onClick={fecharMenu}>
                  <p className="item_menu_hamburguer menor_1280">Perfil</p>
                </Link>
              </li>
            </>
          ) : (
            <li className="nav-lista_item">
              <Link to="/cadastro" onClick={fecharMenu}>
                <p className="item_menu_hamburguer menor_1280">Sua Conta</p>
              </Link>
            </li>
          )}

          <li className="nav-lista_item">
            <Link to="/todos_produtos">
              <p className="item_menu_hamburguer menor_1024">Nossos Produtos</p>
            </Link>
          </li>

          <li className="nav-lista_item">
            <Link to="/horarios" onClick={fecharMenu}>
              <p className="item_menu_hamburguer">Horários</p>
            </Link>
          </li>
        </ul>
      </nav>
    </header >
  );
};

export default Header;