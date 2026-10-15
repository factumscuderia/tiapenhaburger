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
    text: "O croissant supreme é a melhor sobremesa que já comi num burger shop. Nota 1000!",
    stars: 5,
  },
];

export default function Clientes() {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.1 });

  return (
    <section
      ref={sectionRef}
      id="clientes"
      className="relative section-padding overflow-hidden scroll-mt-24"
    >
      {/* Background gradients */}
      <div className="absolute inset-0 bg-gradient-to-b from-[var(--bg-dark)] via-[#160a0c] to-[var(--bg-dark)] pointer-events-none" />
      <div className="absolute bottom-10 -right-20 w-96 h-96 bg-[var(--penha-red)]/10 rounded-full blur-[140px] pointer-events-none" />

      <div className="relative z-10 max-w-[1300px] mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Título da Seção */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-14"
        >
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[var(--penha-gold)]/10 border border-[var(--penha-gold)]/30 mb-3">
            <span className="w-1.5 h-1.5 rounded-full bg-[var(--penha-gold)] animate-pulse" />
            <span className="font-slab text-[var(--penha-gold)] text-xs font-bold tracking-widest uppercase">
              Depoimentos Reais
            </span>
          </div>
          <h2 className="font-display text-5xl sm:text-6xl md:text-7xl text-[var(--penha-cream)] leading-none uppercase tracking-tight">
            QUEM PROVOU, <br className="hidden sm:inline" />
            <span className="text-[var(--penha-gold)]">APROVOU</span>
          </h2>
          <p className="mt-3 font-body text-[var(--penha-cream)]/70 text-sm sm:text-base max-w-lg mx-auto">
            Mais que clientes, parte da família Tia Penha. Veja o que diz quem já experimentou.
          </p>
        </motion.div>

        {/* ─── Layout Integrado: Vídeo de Experiência Real + Grid de Depoimentos ─── */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* COLUNA ESQUERDA: Card do Vídeo do Cliente (Tamanho Original, Com Áudio, Sem Cortes) */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="lg:col-span-5 flex justify-center w-full"
          >
            <div className="w-full max-w-[340px] sm:max-w-[380px] rounded-2xl bg-[#1b0f11]/95 border border-[var(--penha-gold)]/40 p-3.5 sm:p-4 shadow-[0_20px_50px_rgba(0,0,0,0.6)] backdrop-blur-xl group hover:border-[var(--penha-gold)] transition-all duration-300">
              
              {/* Header do Card de Vídeo */}
              <div className="flex items-center justify-between mb-3 pb-2.5 border-b border-white/10">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-red-600 animate-pulse" />
                  <span className="font-slab text-xs font-bold text-[var(--penha-cream)] uppercase tracking-wider">
                    Experiência Real
                  </span>
                </div>

                {/* 5 estrelas */}
                <div className="flex gap-0.5">
                  {Array.from({ length: 5 }).map((_, s) => (
                    <svg
                      key={s}
                      width="13"
                      height="13"
                      viewBox="0 0 24 24"
                      fill="var(--penha-gold)"
                    >
                      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                    </svg>
                  ))}
                </div>
              </div>

              {/* Player do Vídeo sem cortes / tamanho original com áudio */}
              <div className="relative rounded-xl overflow-hidden border border-white/10 shadow-inner">
                <video
                  src="/images/feedback-video.mp4"
                  playsInline
                  controls
                  preload="metadata"
                  className="w-full h-auto max-h-[520px] object-contain rounded-xl block mx-auto"
                />
              </div>

              {/* Legenda explicativa do vídeo */}
              <div className="mt-3.5 space-y-1">
                <h4 className="font-display text-sm tracking-wide text-[var(--penha-cream)] uppercase flex items-center gap-1.5">
                  <span className="text-[var(--penha-gold)]">★</span> Sabor que Conquista
                </h4>
                <p className="text-xs text-[var(--penha-cream)]/70 font-body leading-relaxed">
                  Confira a reação e os detalhes de quem saboreou o verdadeiro hambúrguer e as sobremesas da Tia Penha.
                </p>
              </div>

            </div>
          </motion.div>

          {/* COLUNA DIREITA: Grid de Depoimentos em Cards de Vidro */}
          <div className="lg:col-span-7 grid sm:grid-cols-2 gap-5">
            {testimonials.map((t, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.15 + i * 0.08 }}
                className="glass-card p-5 sm:p-6 relative group hover:border-[var(--penha-gold)]/30 hover:-translate-y-0.5 transition-all duration-300 flex flex-col justify-between"
              >
                {/* Aspas decorativas */}
                <span className="absolute top-3 right-4 font-display text-6xl text-[var(--penha-cream)]/[0.04] leading-none select-none">
                  &ldquo;
                </span>

                <div>
                  {/* Estrelas */}
                  <div className="flex gap-1 mb-3">
                    {Array.from({ length: t.stars }).map((_, s) => (
                      <svg
                        key={s}
                        width="14"
                        height="14"
                        viewBox="0 0 24 24"
                        fill="var(--penha-gold)"
                      >
                        <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                      </svg>
                    ))}
                  </div>

                  <p className="font-body text-[var(--penha-cream)]/75 text-xs sm:text-sm leading-relaxed mb-4 italic">
                    &ldquo;{t.text}&rdquo;
                  </p>
                </div>

                {/* Autor */}
                <div className="flex items-center gap-3 pt-3 border-t border-white/5">
                  <div className="w-8 h-8 rounded-full bg-[var(--penha-red)]/30 border border-[var(--penha-cream)]/10 flex items-center justify-center flex-shrink-0">
                    <span className="font-slab text-[var(--penha-gold)] text-xs font-bold">
                      {t.name.charAt(0)}
                    </span>
                  </div>
                  <div>
                    <span className="font-slab text-[var(--penha-cream)] text-xs font-semibold block">
                      {t.name}
                    </span>
                    <span className="font-body text-[var(--penha-cream)]/40 text-[10px]">
                      Cliente Verificado
                    </span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

        </div>

      </div>
    </section>
  );
}
