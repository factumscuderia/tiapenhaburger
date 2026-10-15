"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { LINKS, MARQUEE_TEXT } from "@/lib/config";

export default function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });
  const bgY = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const textY = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);

  return (
    <section
      ref={sectionRef}
      id="hero"
      className="relative min-h-screen flex items-center overflow-hidden"
    >
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-[var(--bg-dark)] via-[var(--bg-dark)] to-[var(--penha-burgundy)]/30" />

      {/* Palavra gigante BURGERS atrás */}
      <motion.div
        style={{ y: textY }}
        className="absolute inset-0 flex items-center justify-center pointer-events-none select-none"
      >
        <h2 className="font-display text-[20vw] md:text-[18vw] lg:text-[16vw] text-[var(--penha-cream)]/[0.04] leading-none whitespace-nowrap">
          BURGERS
        </h2>
      </motion.div>

      {/* Content */}
      <div className="relative z-10 max-w-[1400px] mx-auto px-4 md:px-8 w-full pt-28 pb-16 md:pt-36 md:pb-20">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Texto à esquerda */}
          <motion.div
            initial={{ opacity: 0, x: -60 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            <motion.span
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="inline-block font-slab text-[var(--penha-gold)] text-sm md:text-base font-semibold tracking-wider uppercase mb-4"
            >
              O tradicional hambúrguer da Tia Penha
            </motion.span>

            <h1 className="font-display text-5xl md:text-7xl lg:text-8xl text-[var(--penha-cream)] leading-[0.9] mb-6">
              SABOR DE
              <br />
              <span className="text-[var(--penha-gold)]">FAMÍLIA</span>
            </h1>

            <p className="font-body text-[var(--penha-cream)]/70 text-base md:text-lg max-w-md mb-8 leading-relaxed">
              Cada mordida é feita com carinho, ingredientes selecionados e a
              receita que conquistou Belo Horizonte. Tradição de verdade,
              direto do coração da Tia Penha.
            </p>

            <div className="flex flex-wrap items-center gap-4">
              <a
                href={LINKS.delivery}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-gold btn-gold-pulse"
              >
                PEÇA O SEU
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <line x1="5" y1="12" x2="19" y2="12" />
                  <polyline points="12 5 19 12 12 19" />
                </svg>
              </a>

              <a
                href="#cardapio"
                className="text-[var(--penha-cream)]/70 hover:text-[var(--penha-cream)] text-sm font-medium transition-colors flex items-center gap-2 group"
              >
                Ver cardápio
                <span className="group-hover:translate-x-1 transition-transform">→</span>
              </a>
            </div>
          </motion.div>

          {/* Burger à direita — Placeholder para imagem */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.6, type: "spring" }}
            style={{ y: bgY }}
            className="relative flex items-center justify-center"
          >
            {/* Selo circular giratório */}
            <div className="absolute -top-4 -right-4 md:top-0 md:right-0 z-20">
              <svg className="animate-spin-seal w-24 h-24 md:w-32 md:h-32" viewBox="0 0 200 200">
                <defs>
                  <path
                    id="sealPath"
                    d="M 100, 100 m -80, 0 a 80,80 0 1,1 160,0 a 80,80 0 1,1 -160,0"
                  />
                </defs>
                <circle cx="100" cy="100" r="95" fill="none" stroke="var(--penha-gold)" strokeWidth="1" opacity="0.3" />
                <text fill="var(--penha-gold)" fontSize="14" fontFamily="var(--font-slab)" fontWeight="600" letterSpacing="4">
                  <textPath href="#sealPath" startOffset="0%">
                    O TRADICIONAL HAMBÚRGUER DA TIA PENHA •
                  </textPath>
                </text>
              </svg>
            </div>

            {/* Imagem do burger */}
            <div className="relative w-full max-w-lg aspect-square">
              <img
                src="/images/hero-burger.jpg"
                alt="Hambúrguer Tia Penha Burger"
                className="w-full h-full object-cover rounded-3xl"
              />

              {/* Decoração glow atrás */}
              <div className="absolute inset-0 -z-10 bg-[var(--penha-red)]/20 blur-[80px] rounded-full" />
            </div>
          </motion.div>
        </div>
      </div>

      {/* Marquee na base */}
      <div className="absolute bottom-0 left-0 right-0 bg-[var(--penha-red)] py-3 overflow-hidden">
        <div className="animate-marquee whitespace-nowrap flex">
          {Array.from({ length: 4 }).map((_, i) => (
            <span
              key={i}
              className="font-display text-[var(--penha-cream)] text-sm md:text-base tracking-[0.2em] mx-8"
            >
              {MARQUEE_TEXT} •{" "}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
