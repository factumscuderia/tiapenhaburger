"use client";

import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";

const testimonials = [
  {
    name: "Lucas M.",
    text: "Melhor hambúrguer de BH, sem dúvidas! O smash cheddar é absurdo. Virei cliente fiel!",
    stars: 5,
  },
  {
    name: "Mariana S.",
    text: "Toda sexta-feira é Tia Penha aqui em casa. A família inteira ama! O atendimento é um carinho só.",
    stars: 5,
  },
  {
    name: "Pedro H.",
    text: "Pedi pelo delivery e chegou quente, montado certinho. A batata cheddar e bacon é viciante demais!",
    stars: 5,
  },
  {
    name: "Carolina R.",
    text: "Hambúrguer com gosto de comida de casa. Ingredientes frescos e muito sabor. Recomendo o Tia Penha Especial!",
    stars: 5,
  },
  {
    name: "Rafael A.",
    text: "Descobri a Tia Penha por indicação de amigo e não me arrependi. Preço justo e qualidade incomparável.",
    stars: 5,
  },
  {
    name: "Juliana F.",
    text: "O brownie com sorvete é a melhor sobremesa que já comi num burger shop. Nota 1000!",
    stars: 5,
  },
];

export default function Clientes() {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.15 });

  return (
    <section
      ref={sectionRef}
      id="clientes"
      className="relative section-padding overflow-hidden"
    >
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-[var(--bg-dark)] to-[var(--penha-burgundy)]/15" />

      <div className="relative z-10 max-w-[1200px] mx-auto">
        {/* Título */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="text-center mb-16"
        >
          <span className="font-slab text-[var(--penha-gold)] text-sm font-semibold tracking-widest uppercase block mb-2">
            Depoimentos
          </span>
          <h2 className="font-display text-5xl md:text-7xl text-[var(--penha-cream)] leading-none">
            QUEM PROVOU,
            <br />
            <span className="text-[var(--penha-gold)]">APROVOU</span>
          </h2>
        </motion.div>

        {/* Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {testimonials.map((t, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 40 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.15 + i * 0.1 }}
              className="glass-card p-7 relative group hover:border-[var(--penha-gold)]/20 transition-all duration-500"
            >
              {/* Aspas decorativas */}
              <span className="absolute top-4 right-6 font-display text-7xl text-[var(--penha-cream)]/[0.04] leading-none select-none">
                &ldquo;
              </span>

              {/* Estrelas */}
              <div className="flex gap-1 mb-4">
                {Array.from({ length: t.stars }).map((_, s) => (
                  <svg
                    key={s}
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="var(--penha-gold)"
                  >
                    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                  </svg>
                ))}
              </div>

              <p className="font-body text-[var(--penha-cream)]/70 text-sm leading-relaxed mb-6 italic">
                &ldquo;{t.text}&rdquo;
              </p>

              {/* Autor */}
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-[var(--penha-red)]/30 border border-[var(--penha-cream)]/10 flex items-center justify-center">
                  <span className="font-slab text-[var(--penha-gold)] text-sm font-bold">
                    {t.name.charAt(0)}
                  </span>
                </div>
                <div>
                  <span className="font-slab text-[var(--penha-cream)] text-sm font-semibold block">
                    {t.name}
                  </span>
                  <span className="font-body text-[var(--penha-cream)]/40 text-xs">
                    Cliente
                  </span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
