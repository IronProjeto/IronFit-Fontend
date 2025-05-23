import { createContext, useContext, useState, useEffect } from "react";

const CarrinhoContext = createContext();

export const CarrinhoProvider = ({ children }) => {

  const [carrinho, setCarrinho] = useState(() => {
    const carrinhoSalvo = localStorage.getItem("carrinho");
    return carrinhoSalvo ? JSON.parse(carrinhoSalvo) : [];
  });

  const totalCarrinho = Number(
    carrinho.reduce((total, item) => total + item.preco * item.quantidade, 0).toFixed(2)
  );

  const limparCarrinho = () => {
    setCarrinho([]);
  };

  useEffect(() => {
    localStorage.setItem('carrinho', JSON.stringify(carrinho));
  }, [carrinho]);

  const adicionarAoCarrinho = (produto) => {
    setCarrinho((prevCarrinho) => {
      const itemExistente = prevCarrinho.find((item) => item.idproduto === produto.idproduto);

      if (itemExistente) {
        return prevCarrinho.map((item) =>
          item.idproduto === produto.idproduto ? { ...item, quantidade: item.quantidade + 1 } : item
        );
      } else {
        return [...prevCarrinho, { ...produto, quantidade: 1 }];
      }
    });
  };

  const removerDoCarrinho = (id) => {
    setCarrinho((prevCarrinho) => prevCarrinho.filter((item) => item.idproduto !== id));
  };

  const alterarQuantidade = (idproduto, quantidade) => {
    setCarrinho((carrinhoAtual) =>
      carrinhoAtual.map((produto) => {
        if (produto.idproduto === idproduto) {
          const novaQuantidade = produto.quantidade + quantidade;

          if (novaQuantidade < 1) return produto;
          if (novaQuantidade > 5) return produto;

          return { ...produto, quantidade: novaQuantidade };
        }
        return produto;
      })
    );
  };

  return (
    <CarrinhoContext.Provider value={{
      carrinho,
      adicionarAoCarrinho,
      removerDoCarrinho,
      alterarQuantidade,
      totalCarrinho,
      limparCarrinho
    }}>
      {children}
    </CarrinhoContext.Provider>
  );
};

export const useCarrinho = () => useContext(CarrinhoContext);