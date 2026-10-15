"use client";

import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { ADDRESS, LINKS, HOURS } from "@/lib/config";

export default function OndeEstamos() {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.15 });

  return (
    <section
      ref={sectionRef}
      id="onde-estamos"
      className="relative section-padding overflow-hidden"
    >
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-[var(--penha-burgundy)]/10 to-[var(--bg-dark)]" />

      <div className="relative z-10 max-w-[1200px] mx-auto">
        {/* Título */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="text-center mb-16"
        >
          <span className="font-slab text-[var(--penha-gold)] text-sm font-semibold tracking-widest uppercase block mb-2">
            Localização
          </span>
          <h2 className="font-display text-5xl md:text-7xl text-[var(--penha-cream)] leading-none">
            ONDE ESTAMOS
          </h2>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-8 items-stretch">
          {/* Mapa */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="glass-card overflow-hidden min-h-[400px]"
          >
            <iframe
              src={`https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3750.5!2d${ADDRESS.lng}!3d${ADDRESS.lat}!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2s${encodeURIComponent(ADDRESS.full)}!5e0!3m2!1spt-BR!2sbr!4v1`}
              width="100%"
              height="100%"
              style={{ border: 0, minHeight: 400 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Localização Tia Penha Burger"
            />
          </motion.div>

          {/* Info */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="flex flex-col gap-6"
          >
            {/* Endereço */}
            <div className="glass-card p-7">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-full bg-[var(--penha-red)]/20 border border-[var(--penha-red)]/30 flex items-center justify-center flex-shrink-0">
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="var(--penha-gold)"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z" />
                    <circle cx="12" cy="10" r="3" />
                  </svg>
                </div>
                <div>
                  <h3 className="font-slab text-[var(--penha-cream)] text-lg font-bold mb-1">
                    Endereço
                  </h3>
                  <p className="font-body text-[var(--penha-cream)]/60 text-sm leading-relaxed">
                    {ADDRESS.street}
                    <br />
                    {ADDRESS.neighborhood}, {ADDRESS.city} – {ADDRESS.state}
                    <br />
                    CEP: {ADDRESS.zip}
                  </p>
                  <a
                    href={LINKS.googleMaps}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 text-[var(--penha-gold)] text-sm font-medium mt-3 hover:underline"
                  >
                    Abrir no Google Maps
                    <svg
                      width="14"
                      height="14"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                    >
                      <path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6" />
                      <polyline points="15 3 21 3 21 9" />
                      <line x1="10" y1="14" x2="21" y2="3" />
                    </svg>
                  </a>
                </div>
              </div>
            </div>

            {/* Horários */}
            <div className="glass-card p-7">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-full bg-[var(--penha-red)]/20 border border-[var(--penha-red)]/30 flex items-center justify-center flex-shrink-0">
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="var(--penha-gold)"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <circle cx="12" cy="12" r="10" />
                    <polyline points="12 6 12 12 16 14" />
                  </svg>
                </div>
                <div>
                  <h3 className="font-slab text-[var(--penha-cream)] text-lg font-bold mb-1">
                    Horário de Funcionamento
                  </h3>
                  <p className="font-body text-[var(--penha-cream)]/60 text-sm">
                    {HOURS.days}
                  </p>
                  <p className="font-slab text-[var(--penha-gold)] text-2xl font-bold mt-1">
                    {HOURS.display}
                  </p>
                </div>
              </div>
            </div>

            {/* Contato */}
            <div className="glass-card p-7">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-full bg-[var(--penha-red)]/20 border border-[var(--penha-red)]/30 flex items-center justify-center flex-shrink-0">
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="var(--penha-gold)"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z" />
                  </svg>
                </div>
                <div>
                  <h3 className="font-slab text-[var(--penha-cream)] text-lg font-bold mb-1">
                    Contato
                  </h3>
                  <a
                    href={`tel:${LINKS.phoneRaw}`}
                    className="font-body text-[var(--penha-cream)]/60 text-sm hover:text-[var(--penha-gold)] transition-colors"
                  >
                    {LINKS.phone}
                  </a>
                  <div className="flex gap-3 mt-4">
                    <a
                      href={LINKS.whatsapp}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn-gold text-xs px-4 py-2"
                    >
                      <svg
                        width="16"
                        height="16"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                      >
                        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                      </svg>
                      WhatsApp
                    </a>
                    <a
                      href={LINKS.instagram}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-4 py-2 rounded-full border border-[var(--penha-cream)]/20 text-[var(--penha-cream)]/70 hover:border-[var(--penha-gold)]/50 hover:text-[var(--penha-gold)] transition-all duration-300 text-xs font-medium flex items-center gap-2"
                    >
                      <svg
                        width="16"
                        height="16"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <rect
                          x="2"
                          y="2"
                          width="20"
                          height="20"
                          rx="5"
                          ry="5"
                        />
                        <circle cx="12" cy="12" r="5" />
                        <circle
                          cx="17.5"
                          cy="6.5"
                          r="1.5"
                          fill="currentColor"
                          stroke="none"
                        />
                      </svg>
                      Instagram
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
