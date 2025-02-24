import { Link } from "react-router-dom";

import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

import "../css/pages/Home/home.css";

function Home() {
  return (
    <main className="principal">
      <section className="container_principal">
        <div className="gradiente">
          <div className="div_img_academia_fundo">
            <img className="img_academia_fundo" src="./images/global/Icon_circulo_128.svg" alt="Ícone" />
          </div>
          <div className="div_texto_inicial">
            <p className="texto_inicial">Comece uma forma melhor de você!</p>
            <p className="texto_inicial">Venha se juntar a nós!</p>
          </div>
          <Link>
            <p className="texto_comecar">Começar Agora</p>
          </Link>
        </div>
      </section>

      <section className="mais_sobre_nos">
        <div className="div_texto_sobre_nos">
          <h2 className="titulo_sobre_nos">Por que escolher nossa academia?</h2>
          <p className="paragrafo_sobre_nos">
            Descubra o que torna nossa unidade a escolha ideal para uma vida mais saudável.
          </p>
        </div>

        <div className="bloco_mais_sobre">
          <img className="img_icon_mais_sobre" src="./images/pages/Home/Icon_halter_dumbbell.svg" alt="Halteres" />
          <h2 className="titulo_bloco_sobre">Estrutura Completa e Moderna</h2>
          <p>Equipamentos de última geração e ambientes projetados para o seu conforto e desempenho.</p>
        </div>

        <div className="bloco_mais_sobre">
          <img className="img_icon_mais_sobre" src="./images/pages/Home/Icon_halter.svg" alt="Halter" />
          <h2 className="titulo_bloco_sobre">Variedade de Modalidades</h2>
          <p>Desde musculação até pilates e artes marciais, temos aulas para todos os gostos e objetivos.</p>
        </div>

        <div className="bloco_mais_sobre">
          <img className="img_icon_mais_sobre" src="./images/pages/Home/Icon_halter_lista.svg" alt="Lista de exercícios" />
          <h2 className="titulo_bloco_sobre">Planos Flexíveis para o Seu Bolso</h2>
          <p>Escolha o plano que melhor se adapta à sua rotina, com total transparência.</p>
        </div>
      </section>

      <section className="unidade">
        <div className="div_unidade">
          <div className="titulo_texto_unidade">
            <h2 className="titulo_unidade">Venha Conhecer nossa Unidade</h2>
            <p className="texto_unidade">
              Descubra o espaço que combina modernidade, conforto e equipamentos de alta performance para o seu melhor treino
            </p>
          </div>

          <div className="imgs_unidade">
            <div className="bloco_imgs_unidade">
              <Swiper
                modules={[Autoplay]}
                loop={true}
                rewind={true}
                autoplay={{ delay: 5000, disableOnInteraction: false }}
                speed={1000}
                slidesPerView={1}
                spaceBetween={10}
                className="carrossel"
              >
                <SwiperSlide>
                  <img className="img_unidade" src="./images/pages/Home/fachada_academia.jpg" alt="Fachada da academia" />
                </SwiperSlide>

                <SwiperSlide>
                  <img className="img_unidade" src="./images/pages/Home/sala_academia.jpg" alt="Sala da academia" />
                </SwiperSlide>

                <SwiperSlide>
                  <img className="img_unidade" src="./images/pages/Home/corredor_academia.jpg" alt="Corredor da academia" />
                </SwiperSlide>

                <SwiperSlide>
                  <img className="img_unidade" src="./images/pages/Home/canto_academia.jpg" alt="Canto da academia" />
                </SwiperSlide>
              </Swiper>

              <Link to="/">
                <div className="texto_local">
                  <h2 className="nome_cidade_unidade">Metrópolis</h2>
                  <div className="flex_column">
                    <img className="img_icon_local" src="./images/pages/Home/icon_local.svg" alt="Ícone de localização" />
                    <p className="nome_rua_unidade">Clinton Street, 344</p>
                  </div>
                  <p className="nome_rua_unidade">New Troy, Metrópolis - EUA</p>
                </div>
              </Link>

              <div className="links_unidade">
                <Link to="/">
                  <p className="texto_matricula">Matricule-se</p>
                </Link>
                <Link to="/">
                  <p className="texto_ver_mais">Ver Mais</p>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main >
  );
}

export default Home;