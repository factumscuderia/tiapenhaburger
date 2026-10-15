"use client";

import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef, useState } from "react";

const cards = [
  {
    num: "01",
    title: "HAMBÚRGUER TRADICIONAL",
    text: "Receita que atravessa gerações. Cada hambúrguer é preparado na hora, com carne selecionada e tempero exclusivo da Tia Penha. Nada de congelado, nada de pressa — só o sabor de verdade.",
  },
  {
    num: "02",
    title: "INGREDIENTES DE CONFIANÇA",
    text: "A Tia escolhe pessoalmente cada fornecedor. Pão artesanal fresco, carne de primeira, queijo que derrete no ponto certo e vegetais sempre frescos. Qualidade que você sente a cada mordida.",
  },
  {
    num: "03",
    title: "SABOR DE CASA",
    text: "Aqui você é tratado como família. O atendimento tem carinho, o ambiente tem calor de casa e cada pedido sai com a dedicação de quem cozinha para quem ama.",
  },
];

export default function OJeitoDaTia() {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.15 });
  const [isPlaying, setIsPlaying] = useState(true);
  const videoRef = useRef<HTMLVideoElement>(null);

  const toggleVideo = () => {
    if (!videoRef.current) return;
    if (videoRef.current.paused) {
      videoRef.current.play();
      setIsPlaying(true);
    } else {
      videoRef.current.pause();
      setIsPlaying(false);
    }
  };

  return (
    <section
      ref={sectionRef}
      id="jeito-da-tia"
      className="relative section-padding overflow-hidden bg-[var(--bg-dark)]"
    >
      {/* Background gradients decorativos */}
      <div className="absolute inset-0 bg-gradient-to-b from-[var(--penha-burgundy)]/25 via-[var(--bg-dark)] to-[var(--bg-dark)] pointer-events-none" />
      <div className="absolute top-1/4 -left-32 w-96 h-96 bg-[var(--penha-red)]/15 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute top-1/3 -right-32 w-96 h-96 bg-[var(--penha-gold)]/10 rounded-full blur-[140px] pointer-events-none" />

      <div className="relative z-10 max-w-[1300px] mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Top Eyebrow Badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="flex justify-center mb-8"
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[var(--penha-red)]/15 border border-[var(--penha-gold)]/30 backdrop-blur-md">
            <span className="w-2 h-2 rounded-full bg-[var(--penha-gold)] animate-pulse" />
            <span className="text-xs uppercase tracking-widest font-slab text-[var(--penha-cream)] font-semibold">
              O Segredo do Sabor • O Jeito da Tia Penha
            </span>
          </div>
        </motion.div>

        {/* ─── Showcase Principal (Layout Estilo Imagem de Referência) ─── */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-4 items-center mb-20 relative">
          
          {/* LADO ESQUERDO: Título de Impacto e Diferenciais */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="lg:col-span-4 flex flex-col justify-center text-center lg:text-left z-20"
          >
            <h2 className="font-display text-4xl sm:text-5xl lg:text-6xl text-[var(--penha-cream)] leading-[1.05] tracking-tight uppercase">
              O QUE TORNA <br />
              NOSSO BURGER <br />
              <span className="text-[var(--penha-gold)]">TÃO ESPECIAL?</span>
            </h2>

            <p className="mt-5 font-body text-[var(--penha-cream)]/75 text-sm sm:text-base leading-relaxed max-w-md mx-auto lg:mx-0">
              Cada hambúrguer é uma obra de arte na chapa quente. Carne 100% bovina fresca selecionada, prensada e selada com perfeição, queijo derretido no ponto e ingredientes colhidos a dedo.
            </p>

            <div className="mt-6 flex flex-wrap gap-2.5 justify-center lg:justify-start">
              <span className="px-3.5 py-1.5 rounded-full text-xs font-semibold bg-[var(--penha-red)]/20 text-[var(--penha-cream)] border border-[var(--penha-red)]/40">
                Blend Artesanal 100% Fresco
              </span>
              <span className="px-3.5 py-1.5 rounded-full text-xs font-semibold bg-[var(--penha-gold)]/15 text-[var(--penha-gold)] border border-[var(--penha-gold)]/30">
                Prensado na Chapa Quente
              </span>
              <span className="px-3.5 py-1.5 rounded-full text-xs font-semibold bg-white/5 text-[var(--penha-cream)]/80 border border-white/10">
                Pão Selado na Manteiga
              </span>
            </div>
          </motion.div>

          {/* CENTRO: Ilustração do Hambúrguer Explodindo (Fundo 100% Transparente PNG) */}
          <motion.div
            initial={{ opacity: 0, scale: 0.85 }}
            animate={isInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.8, delay: 0.2, type: "spring" }}
            className="lg:col-span-4 flex items-center justify-center relative z-10"
          >
            {/* Glow sutil atrás do hambúrguer */}
            <div className="absolute w-72 h-72 md:w-96 md:h-96 bg-[var(--penha-red)]/20 rounded-full blur-3xl pointer-events-none" />

            {/* Imagem do hambúrguer explodindo - PNG transparente sem fundo preto */}
            <div className="relative animate-float">
              <img
                src="/images/burger-exploded.png"
                alt="Hambúrguer artesanal Tia Penha explodindo em camadas"
                className="w-72 sm:w-80 md:w-96 lg:w-[420px] max-w-none h-auto object-contain filter drop-shadow-[0_25px_35px_rgba(0,0,0,0.85)]"
              />

              {/* Ponto de ancoragem na carne com pulso (Desktop) */}
              <div className="hidden lg:block absolute top-[68%] right-[22%] translate-x-1/2 -translate-y-1/2 z-30">
                <span className="relative flex h-5 w-5">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[var(--penha-gold)] opacity-75" />
                  <span className="relative inline-flex rounded-full h-5 w-5 bg-[var(--penha-gold)] border-2 border-[var(--bg-dark)] shadow-lg" />
                </span>
              </div>
            </div>
          </motion.div>

          {/* LADO DIREITO: Linha de Conexão + Card do Vídeo */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="lg:col-span-4 flex flex-col items-center lg:items-start justify-center relative z-20"
          >
            {/* SVG Connector Line visível em Desktop */}
            <div className="hidden lg:block absolute -left-16 top-[68%] -translate-y-full w-16 h-28 pointer-events-none">
              <svg className="w-full h-full overflow-visible" viewBox="0 0 70 110" fill="none">
                {/* Linha saindo do hambúrguer (carne), virando para cima e entrando no card */}
                <path
                  d="M 0 100 L 35 100 L 35 20 L 70 20"
                  stroke="var(--penha-gold)"
                  strokeWidth="2"
                  strokeDasharray="4 4"
                  className="animate-pulse"
                />
                <circle cx="0" cy="100" r="4" fill="var(--penha-gold)" />
                <circle cx="70" cy="20" r="4" fill="var(--penha-gold)" />
              </svg>
            </div>

            {/* Card com o Vídeo Real da Chapa (Tamanho Original, Sem Bordas Pretas, Sem 'Assistir com som') */}
            <div className="w-full max-w-[300px] sm:max-w-[320px] mx-auto rounded-2xl bg-[#1b0f11]/95 border border-[var(--penha-gold)]/40 p-3 sm:p-3.5 shadow-[0_20px_50px_rgba(0,0,0,0.6)] backdrop-blur-xl group hover:border-[var(--penha-gold)] transition-all duration-300">
              
              {/* Header do Card */}
              <div className="flex items-center justify-between mb-2.5 pb-2 border-b border-white/10">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-red-600 animate-pulse" />
                  <span className="font-slab text-xs font-bold text-[var(--penha-cream)] uppercase tracking-wider">
                    Preparado na Chapa
                  </span>
                </div>
                <span className="font-display text-[10px] tracking-widest text-[var(--penha-gold)] bg-[var(--penha-gold)]/10 px-2 py-0.5 rounded border border-[var(--penha-gold)]/30">
                  VÍDEO REAL
                </span>
              </div>

              {/* Player do Vídeo sem bordas pretas, tamanho original, som ativado via controles nativos */}
              <div className="relative rounded-xl overflow-hidden border border-white/10 shadow-inner">
                <video
                  ref={videoRef}
                  src="/images/burger-video.mp4"
                  playsInline
                  controls
                  preload="metadata"
                  className="w-full h-auto max-h-[500px] object-cover rounded-xl block"
                />
              </div>

              {/* Informações explicativas */}
              <div className="mt-3.5 space-y-1.5">
                <h4 className="font-display text-base tracking-wide text-[var(--penha-cream)] uppercase flex items-center gap-1.5">
                  <span className="text-[var(--penha-gold)]">✓</span> Sabor & Crosta Perfeita
                </h4>
                <p className="text-xs text-[var(--penha-cream)]/70 font-body leading-relaxed">
                  Prensado com precisão para atingir a reação de Maillard: carne suculenta por dentro, bordas crocantes por fora e sabor potencializado ao máximo.
                </p>
              </div>
            </div>
          </motion.div>
        </div>

        {/* ─── Grid de 3 Pilares da Tradição ─── */}
        <div className="grid md:grid-cols-3 gap-6 lg:gap-8 pt-6 border-t border-[var(--penha-cream)]/10">
          {cards.map((card, i) => (
            <motion.div
              key={card.num}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.3 + i * 0.12 }}
              className="glass-card p-7 relative group hover:border-[var(--penha-gold)]/30 hover:-translate-y-1 transition-all duration-300"
            >
              {/* Número de fundo suave */}
              <span className="absolute top-3 right-5 font-display text-7xl text-[var(--penha-cream)]/[0.04] leading-none select-none">
                {card.num}
              </span>

              {/* Ícone dourado */}
              <div className="w-10 h-10 rounded-full border border-[var(--penha-gold)]/30 flex items-center justify-center mb-4 group-hover:bg-[var(--penha-gold)]/10 transition-colors">
                <span className="text-[var(--penha-gold)] font-slab font-bold text-xs">
                  {card.num}
                </span>
              </div>

              <h3 className="font-slab text-[var(--penha-cream)] text-base font-bold mb-3 leading-tight">
                {card.title}
              </h3>

              <p className="font-body text-[var(--penha-cream)]/65 text-xs sm:text-sm leading-relaxed">
                {card.text}
              </p>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
