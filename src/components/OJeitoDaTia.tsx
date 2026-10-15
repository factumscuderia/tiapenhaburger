"use client";

import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";

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
  const isInView = useInView(sectionRef, { once: true, amount: 0.2 });

  return (
    <section
      ref={sectionRef}
      id="jeito-da-tia"
      className="relative section-padding overflow-hidden"
    >
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-[var(--penha-burgundy)]/20 to-[var(--bg-dark)]" />

      <div className="relative z-10 max-w-[1200px] mx-auto">
        {/* Título */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="text-center mb-16"
        >
          <h2 className="font-display text-5xl md:text-7xl text-[var(--penha-cream)] leading-none">
            O JEITO DA
          </h2>
          <span className="font-slab text-3xl md:text-5xl text-[var(--penha-gold)] font-bold italic">
            Tia Penha
          </span>
        </motion.div>

        {/* Cards + Burger */}
        <div className="relative">
          {/* Burger central flutuante — PLACEHOLDER */}
          <motion.div
            initial={{ opacity: 0, scale: 0.6 }}
            animate={isInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.8, delay: 0.5, type: "spring" }}
            className="hidden lg:flex absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-20 pointer-events-none"
          >
            <div className="w-72 h-72 rounded-full overflow-hidden animate-float border-2 border-[var(--penha-cream)]/10 shadow-2xl">
              <img
                src="/images/exploded-burger.jpg"
                alt="Hambúrguer artesanal"
                className="w-full h-full object-cover"
              />
            </div>
          </motion.div>

          {/* Grid de cards */}
          <div className="grid md:grid-cols-3 gap-6 lg:gap-8">
            {cards.map((card, i) => (
              <motion.div
                key={card.num}
                initial={{ opacity: 0, y: 60 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.2 + i * 0.15 }}
                className="glass-card p-8 relative group hover:border-[var(--penha-gold)]/20 transition-all duration-500"
              >
                {/* Número de fundo */}
                <span className="absolute top-4 right-6 font-display text-8xl text-[var(--penha-cream)]/[0.04] leading-none select-none">
                  {card.num}
                </span>

                {/* Ícone dourado */}
                <div className="w-12 h-12 rounded-full border border-[var(--penha-gold)]/30 flex items-center justify-center mb-6 group-hover:bg-[var(--penha-gold)]/10 transition-colors">
                  <span className="text-[var(--penha-gold)] font-slab font-bold text-sm">
                    {card.num}
                  </span>
                </div>

                <h3 className="font-slab text-[var(--penha-cream)] text-lg font-bold mb-4 leading-tight">
                  {card.title}
                </h3>

                <p className="font-body text-[var(--penha-cream)]/60 text-sm leading-relaxed">
                  {card.text}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
