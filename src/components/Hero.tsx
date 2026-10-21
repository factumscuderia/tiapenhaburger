"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { LINKS, MARQUEE_TEXT } from "@/lib/config";

const heroBurgers = [
  {
    id: "tia-penha",
    title: "TIA PENHA",
    tagline: "O CLÁSSICO DA CASA FEITO DO JEITO CERTO",
    description:
      "Blend Angus 160g suculento, queijo prato derretido, salada fresca, cebola roxa, picles e molho especial da casa no pão brioche selado.",
    image: "/images/burgers/tia-penha.png",
  },
  {
    id: "cheddar-bacon",
    title: "CHEDDAR BACON",
    tagline: "BLEND ANGUS COM CHEDDAR DUPLO E BACON CROCANTE",
    description:
      "Blend Angus 160g suculento, cheddar duplo derretido, bacon crocante, cebola caramelizada e maionese de bacon da casa no pão brioche selado.",
    image: "/images/burgers/cheddar-bacon.png",
  },
  {
    id: "duplo-bacon",
    title: "DUPLO BACON",
    tagline: "DOIS BLENDS ANGUS 160G COM MUITO BACON",
    description:
      "Pra quem não faz meio termo. Dois blends Angus de 160g cada, cheddar duplo derretido, bacon crocante e molho especial da casa.",
    image: "/images/burgers/duplo-bacon.png",
  },
  {
    id: "gorgonzola-special",
    title: "GORGONZOLA SPECIAL",
    tagline: "INTENSO, CROCANTE E FORA DO ÓBVIO",
    description:
      "Blend Angus 160g suculento, gorgonzola marcante, cebola crispy, farofa de bacon com mel e molho da casa.",
    image: "/images/burgers/gorgonzola-special.png",
  },
  {
    id: "trufado",
    title: "TRUFADO",
    tagline: "SOFISTICAÇÃO QUE DERRETE NA BOCA",
    description:
      "Blend Angus 160g suculento, queijo prato duplo bem cremoso e molho trufado especial com cebola caramelizada.",
    image: "/images/burgers/trufado.png",
  },
  {
    id: "sabara",
    title: "SABARÁ",
    tagline: "MINAS EM FORMA DE BURGER COM GELEIA DE JABUTICABA",
    description:
      "Blend Angus 160g suculento, queijo minas fresco, rúcula e geleia artesanal de jabuticaba de Sabará.",
    image: "/images/burgers/sabara.png",
  },
];

export default function Hero() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(1);

  const currentBurger = heroBurgers[currentIndex];
  const nextIndex = (currentIndex + 1) % heroBurgers.length;
  const nextBurger = heroBurgers[nextIndex];

  const goToNext = () => {
    setDirection(1);
    setCurrentIndex((prev) => (prev + 1) % heroBurgers.length);
  };

  const goToPrev = () => {
    setDirection(-1);
    setCurrentIndex((prev) => (prev - 1 + heroBurgers.length) % heroBurgers.length);
  };

  return (
    <section
      id="hero"
      className="relative min-h-screen flex flex-col justify-between overflow-hidden bg-[#0e0708] pt-24 pb-8"
    >
      {/* Background radial glow */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#0a0506] via-[#12080a] to-[#1a0b0e] pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[500px] bg-[var(--penha-red)]/10 rounded-full blur-[140px] pointer-events-none" />

      {/* ─── Palavra Gigante BURGERS ao Fundo (Como na Referência) ─── */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full flex items-center justify-center pointer-events-none select-none z-0">
        <h2 className="font-display font-black text-[22vw] md:text-[18vw] text-white/[0.07] tracking-wider leading-none uppercase whitespace-nowrap">
          BURGERS
        </h2>
      </div>

      {/* ─── Conteúdo Principal em 3 Colunas ─── */}
      <div className="relative z-10 max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 w-full my-auto py-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          
          {/* COLUNA ESQUERDA: Nome do Hambúrguer, Descrição e Botão Peça Já */}
          <div className="lg:col-span-5 flex flex-col justify-center text-center lg:text-left z-20">
            <AnimatePresence mode="wait" custom={direction}>
              <motion.div
                key={currentBurger.id}
                initial={{ opacity: 0, y: direction * 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -direction * 20 }}
                transition={{ duration: 0.4 }}
              >
                <span className="font-slab text-[var(--penha-gold)] text-xs sm:text-sm font-semibold tracking-widest uppercase block mb-2">
                  {currentBurger.tagline}
                </span>

                <h1 className="font-display text-5xl sm:text-6xl lg:text-7xl text-[var(--penha-cream)] leading-[0.95] tracking-tight uppercase mb-4">
                  {currentBurger.title}
                </h1>

                <p className="font-body text-[var(--penha-cream)]/75 text-sm sm:text-base leading-relaxed max-w-md mx-auto lg:mx-0 mb-8">
                  {currentBurger.description}
                </p>
              </motion.div>
            </AnimatePresence>

            {/* Botão PEÇA JÁ enviando para #cardapio */}
            <div className="flex items-center justify-center lg:justify-start gap-4">
              <a
                href="#cardapio"
                className="inline-flex items-center gap-2.5 bg-[var(--penha-gold)] hover:bg-[#ffc955] text-[var(--bg-dark)] font-display text-base font-bold tracking-wider px-8 py-3.5 rounded-full shadow-[0_10px_25px_rgba(233,180,76,0.35)] hover:scale-105 active:scale-95 transition-all duration-200 uppercase"
              >
                <span>PEÇA JÁ</span>
                <span className="text-xl leading-none font-sans font-bold">›</span>
              </a>

              <a
                href="#cardapio"
                className="text-[var(--penha-cream)]/70 hover:text-[var(--penha-cream)] text-sm font-medium transition-colors hidden sm:inline-flex items-center gap-1.5"
              >
                Ver cardápio completo →
              </a>
            </div>

            {/* Ícones sociais na lateral inferior esquerda (Estilo referência) */}
            <div className="hidden lg:flex items-center gap-4 mt-12 text-[var(--penha-cream)]/50">
              <a
                href={LINKS.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-[var(--penha-gold)] transition-colors"
                aria-label="Instagram"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                  <circle cx="12" cy="12" r="5" />
                  <circle cx="17.5" cy="6.5" r="1.5" fill="currentColor" stroke="none" />
                </svg>
              </a>
              <a
                href={LINKS.whatsapp}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-[var(--penha-gold)] transition-colors"
                aria-label="WhatsApp"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                </svg>
              </a>
              <span className="text-xs font-mono uppercase tracking-widest text-white/30">
                BH • SANTA INÊS
              </span>
            </div>
          </div>

          {/* COLUNA CENTRAL: Hambúrguer em Destaque Gigante sobre a Tábua de Madeira */}
          <div className="lg:col-span-6 flex flex-col items-center justify-center relative min-h-[440px] sm:min-h-[500px] lg:min-h-[560px]">
            
            {/* Container do Hambúrguer e Tábua Ampliados */}
            <div className="relative w-full max-w-lg sm:max-w-xl md:max-w-2xl flex flex-col items-center justify-end pb-4">
              
              {/* Slot do Hambúrguer com Tamanho Aumentado */}
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentBurger.id}
                  initial={{ opacity: 0, scale: 0.92, y: 15 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.92, y: -15 }}
                  transition={{ duration: 0.4 }}
                  className="w-full flex-1 flex flex-col items-center justify-end relative z-20"
                >
                  {currentBurger.image ? (
                    <img
                      src={currentBurger.image}
                      alt={currentBurger.title}
                      className="w-full max-w-[440px] sm:max-w-[500px] md:max-w-[560px] max-h-[380px] sm:max-h-[440px] md:max-h-[480px] object-contain filter drop-shadow-[0_25px_35px_rgba(0,0,0,0.9)] translate-y-10 sm:translate-y-12 md:translate-y-14 select-none pointer-events-none"
                    />
                  ) : (
                    <div className="w-72 h-72 sm:w-96 sm:h-96 rounded-full border-2 border-dashed border-[var(--penha-gold)]/25 flex flex-col items-center justify-center p-6 text-center bg-black/15 backdrop-blur-[2px]">
                      <div className="w-20 h-20 rounded-full bg-[var(--penha-gold)]/10 border border-[var(--penha-gold)]/30 flex items-center justify-center mb-3">
                        <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="var(--penha-gold)" strokeWidth="1.5">
                          <rect x="3" y="3" width="18" height="18" rx="4" />
                          <circle cx="8.5" cy="8.5" r="1.5" />
                          <path d="M21 15l-5-5L5 21" />
                        </svg>
                      </div>
                      <span className="font-display text-base uppercase tracking-wider text-[var(--penha-cream)]">
                        {currentBurger.title}
                      </span>
                    </div>
                  )}
                </motion.div>
              </AnimatePresence>

              {/* Base de Madeira Rústica / Tábua Redonda / Prato Ampliado */}
              <div className="relative w-84 sm:w-[460px] md:w-[520px] h-18 sm:h-20 -mt-2 z-10 pointer-events-none">
                {/* Sombra de contato do hambúrguer diretamente sobre a tábua */}
                <div className="absolute inset-x-12 sm:inset-x-16 top-1 h-7 bg-black/95 rounded-full blur-[8px]" />
                {/* Sombra projetada no fundo */}
                <div className="absolute inset-x-6 sm:inset-x-8 bottom-0 h-8 bg-black/95 rounded-full blur-lg" />
                
                {/* Tábua de madeira redonda */}
                <div className="relative w-full h-12 sm:h-14 rounded-[100%] bg-gradient-to-b from-[#3a2215] via-[#24130a] to-[#120803] border-t-2 border-[#6d4128]/70 shadow-[0_20px_45px_rgba(0,0,0,0.98)] flex items-center justify-center">
                  <div className="w-[94%] h-[80%] rounded-[100%] border border-[#7a482b]/30 bg-gradient-to-r from-transparent via-[#452718]/40 to-transparent" />
                </div>
              </div>
            </div>
          </div>

          {/* COLUNA DIREITA: Apenas botões de navegação limpos, sem caixas pretas */}
          <div className="lg:col-span-1 flex flex-row lg:flex-col items-center justify-center gap-3 z-20">
            <button
              type="button"
              onClick={goToPrev}
              className="w-12 h-12 rounded-full bg-white/5 hover:bg-[var(--penha-gold)] text-[var(--penha-cream)] hover:text-[var(--bg-dark)] border border-white/10 hover:border-[var(--penha-gold)] flex items-center justify-center transition-all duration-200 cursor-pointer shadow-lg active:scale-95"
              aria-label="Hambúrguer anterior"
            >
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <polyline points="18 15 12 9 6 15" />
              </svg>
            </button>

            <button
              type="button"
              onClick={goToNext}
              className="w-12 h-12 rounded-full bg-white/5 hover:bg-[var(--penha-gold)] text-[var(--penha-cream)] hover:text-[var(--bg-dark)] border border-white/10 hover:border-[var(--penha-gold)] flex items-center justify-center transition-all duration-200 cursor-pointer shadow-lg active:scale-95"
              aria-label="Próximo hambúrguer"
            >
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <polyline points="6 9 12 15 18 9" />
              </svg>
            </button>
          </div>

        </div>
      </div>

      {/* ─── Rodapé do Hero: Pontos de Paginação e Subtítulo ─── */}
      <div className="relative z-10 max-w-[1400px] mx-auto px-4 w-full flex flex-col items-center justify-center gap-3">
        <span className="text-[11px] font-slab tracking-[0.25em] text-[var(--penha-cream)]/40 uppercase text-center">
          OPÇÕES DE HAMBÚRGUERES ARTESANAIS • TIA PENHA BURGER
        </span>

        {/* Pontos de paginação (Como na referência: ● ○ ○ ○) */}
        <div className="flex items-center gap-2.5">
          {heroBurgers.map((burger, i) => (
            <button
              key={burger.id}
              onClick={() => {
                setDirection(i > currentIndex ? 1 : -1);
                setCurrentIndex(i);
              }}
              className={`transition-all duration-300 cursor-pointer rounded-full ${
                i === currentIndex
                  ? "w-8 h-2.5 bg-[var(--penha-gold)] shadow-[0_0_12px_rgba(233,180,76,0.6)]"
                  : "w-2.5 h-2.5 bg-white/20 hover:bg-white/50"
              }`}
              aria-label={`Ir para ${burger.title}`}
            />
          ))}
        </div>
      </div>

      {/* ─── Faixa Marquee na base inferior ─── */}
      <div className="mt-6 bg-[var(--penha-red)] py-2.5 overflow-hidden border-y border-[var(--penha-gold)]/20">
        <div className="animate-marquee whitespace-nowrap flex">
          {Array.from({ length: 4 }).map((_, i) => (
            <span
              key={i}
              className="font-display text-[var(--penha-cream)] text-xs md:text-sm tracking-[0.25em] mx-6 uppercase"
            >
              {MARQUEE_TEXT}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
