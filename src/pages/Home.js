import { Link } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
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
        <div className="div_textp_sobre_nos">
          <h2 className="titulo_sobre_nos">Por que escolher nossa academia?</h2>
          <p className="paragrafo_sobre_nos">
            Descubra o que torna nossa unidade a escolha ideal para uma vida mais saudável.
          </p>
        </div>

        <Swiper
          modules={[Navigation, Pagination, Autoplay]}
          spaceBetween={25}
          slidesPerView={1}
          autoplay={{ delay: 5000 }}
          loop={true}
          centeredSlides={true}
          className="carrossel"
        >
          <SwiperSlide>
            <div className="bloco_mais_sobre">
              <img className="img_icon_mais_sobre" src="./images/pages/Home/Icon_halter_dumbbell.svg" alt="Halteres" />
              <h2 className="titulo_bloco_sobre">Estrutura Completa e Moderna</h2>
              <p>Equipamentos de última geração e ambientes projetados para o seu conforto e desempenho.</p>
            </div>
          </SwiperSlide>

          <SwiperSlide>
            <div className="bloco_mais_sobre">
              <img className="img_icon_mais_sobre" src="./images/pages/Home/Icon_halter.svg" alt="Halter" />
              <h2 className="titulo_bloco_sobre">Variedade de Modalidades</h2>
              <p>Desde musculação até pilates e artes marciais, temos aulas para todos os gostos e objetivos.</p>
            </div>
          </SwiperSlide>

          <SwiperSlide>
            <div className="bloco_mais_sobre">
              <img className="img_icon_mais_sobre" src="./images/pages/Home/Icon_halter_lista.svg" alt="Lista de exercícios" />
              <h2 className="titulo_bloco_sobre">Planos Flexíveis para o Seu Bolso</h2>
              <p>Escolha o plano que melhor se adapta à sua rotina, com total transparência.</p>
            </div>
          </SwiperSlide>
        </Swiper>
      </section>

      <section className="unidade">
        <div className="div_unidade">
          <div>
            <p>Venha Conhecer nossa Unidade</p>
          </div>
        </div>
      </section>
    </main>
  );
}

export default Home;