"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { NAV_ITEMS, LINKS, HOURS } from "@/lib/config";
import { useIsOpen } from "@/hooks/useIsOpen";
import { useCart } from "@/contexts/CartContext";

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const isOpen = useIsOpen();
  const { totalItems, openDrawer } = useCart();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Trava o scroll quando o menu mobile está aberto
  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [mobileOpen]);

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled
            ? "bg-[#5e0b16]/95 backdrop-blur-xl shadow-2xl"
            : "bg-[#5e0b16]/60 backdrop-blur-md"
        }`}
        style={{ borderBottom: "1px solid rgba(255,243,220,0.1)" }}
      >
        <div className="max-w-[1400px] mx-auto px-4 md:px-8 flex items-center justify-between h-[72px] md:h-[80px]">
          {/* Logo */}
          <a href="#inicio" className="flex-shrink-0 group">
            <motion.div
              whileHover={{ rotate: [0, -5, 5, -3, 0] }}
              transition={{ duration: 0.6 }}
              className="w-12 h-12 md:w-14 md:h-14 rounded-full overflow-hidden border-2 border-[var(--penha-cream)]/20"
            >
              {/* PLACEHOLDER: Substituir pela logo real */}
              <div className="w-full h-full bg-[var(--penha-red)] flex items-center justify-center">
                <span className="font-slab text-[var(--penha-cream)] text-xs font-bold leading-tight text-center">
                  TP
                </span>
              </div>
            </motion.div>
          </a>

          {/* Nav Desktop */}
          <nav className="hidden lg:flex items-center gap-1">
            {NAV_ITEMS.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="px-4 py-2 text-[var(--penha-cream)]/80 hover:text-[var(--penha-cream)] text-sm font-medium transition-colors duration-300 relative group"
              >
                {item.label}
                <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-[2px] bg-[var(--penha-gold)] transition-all duration-300 group-hover:w-3/4" />
              </a>
            ))}

            {/* Pílula Aberto/Fechado */}
            <div
              className={`ml-3 px-3 py-1 rounded-full text-xs font-semibold flex items-center gap-1.5 ${
                isOpen
                  ? "bg-green-500/20 text-green-400 border border-green-500/30"
                  : "bg-red-500/20 text-red-400 border border-red-500/30"
              }`}
            >
              <span
                className={`w-2 h-2 rounded-full ${
                  isOpen ? "bg-green-400 animate-pulse" : "bg-red-400"
                }`}
              />
              {isOpen ? "Aberto agora" : `Abre às ${HOURS.open}h`}
            </div>
          </nav>

          {/* Actions */}
          <div className="flex items-center gap-3">
            {/* CTA Desktop */}
            <a
              href={LINKS.delivery}
              target="_blank"
              rel="noopener noreferrer"
              className="hidden md:inline-flex btn-gold btn-gold-pulse text-xs px-5 py-2.5"
            >
              PEÇA AGORA
            </a>

            {/* Instagram */}
            <a
              href={LINKS.instagram}
              target="_blank"
              rel="noopener noreferrer"
              className="hidden md:flex w-9 h-9 items-center justify-center rounded-full hover:bg-white/10 transition-colors"
              aria-label="Instagram"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                <circle cx="12" cy="12" r="5" />
                <circle cx="17.5" cy="6.5" r="1.5" fill="currentColor" stroke="none" />
              </svg>
            </a>

            {/* WhatsApp */}
            <a
              href={LINKS.whatsapp}
              target="_blank"
              rel="noopener noreferrer"
              className="hidden md:flex w-9 h-9 items-center justify-center rounded-full hover:bg-white/10 transition-colors"
              aria-label="WhatsApp"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
              </svg>
            </a>

            {/* Sacola */}
            <button
              onClick={openDrawer}
              className="relative w-9 h-9 flex items-center justify-center rounded-full hover:bg-white/10 transition-colors"
              aria-label={`Sacola com ${totalItems} itens`}
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z" />
                <line x1="3" y1="6" x2="21" y2="6" />
                <path d="M16 10a4 4 0 01-8 0" />
              </svg>
              {totalItems > 0 && (
                <motion.span
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="absolute -top-1 -right-1 w-5 h-5 bg-[var(--penha-gold)] text-[var(--bg-dark)] text-[10px] font-bold rounded-full flex items-center justify-center"
                >
                  {totalItems}
                </motion.span>
              )}
            </button>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="lg:hidden flex flex-col justify-center items-center w-9 h-9 gap-1.5"
              aria-label="Menu"
            >
              <motion.span
                animate={mobileOpen ? { rotate: 45, y: 7 } : { rotate: 0, y: 0 }}
                className="block w-6 h-[2px] bg-[var(--penha-cream)] rounded-full origin-center"
              />
              <motion.span
                animate={mobileOpen ? { opacity: 0 } : { opacity: 1 }}
                className="block w-6 h-[2px] bg-[var(--penha-cream)] rounded-full"
              />
              <motion.span
                animate={mobileOpen ? { rotate: -45, y: -7 } : { rotate: 0, y: 0 }}
                className="block w-6 h-[2px] bg-[var(--penha-cream)] rounded-full origin-center"
              />
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Fullscreen Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, x: "100%" }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: "100%" }}
            transition={{ type: "spring", damping: 30, stiffness: 300 }}
            className="fixed inset-0 z-[60] bg-[var(--penha-red)] flex flex-col"
          >
            {/* Close Button */}
            <div className="flex justify-end p-6">
              <button
                onClick={() => setMobileOpen(false)}
                className="w-10 h-10 flex items-center justify-center text-[var(--penha-cream)]"
                aria-label="Fechar menu"
              >
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <line x1="18" y1="6" x2="6" y2="18" />
                  <line x1="6" y1="6" x2="18" y2="18" />
                </svg>
              </button>
            </div>

            {/* Logo grande no topo */}
            <div className="flex justify-center mb-8">
              <div className="w-24 h-24 rounded-full bg-[var(--penha-burgundy)] flex items-center justify-center border-2 border-[var(--penha-cream)]/20">
                <span className="font-slab text-[var(--penha-cream)] text-2xl font-bold">TP</span>
              </div>
            </div>

            {/* Links */}
            <nav className="flex-1 flex flex-col items-center justify-center gap-6">
              {NAV_ITEMS.map((item, i) => (
                <motion.a
                  key={item.href}
                  href={item.href}
                  onClick={() => setMobileOpen(false)}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.08 }}
                  className="font-display text-3xl text-[var(--penha-cream)] hover:text-[var(--penha-gold)] transition-colors"
                >
                  {item.label}
                </motion.a>
              ))}

              {/* Status pílula */}
              <div
                className={`mt-4 px-4 py-1.5 rounded-full text-sm font-semibold flex items-center gap-2 ${
                  isOpen
                    ? "bg-green-500/20 text-green-300 border border-green-500/30"
                    : "bg-red-900/30 text-red-300 border border-red-400/30"
                }`}
              >
                <span className={`w-2 h-2 rounded-full ${isOpen ? "bg-green-400 animate-pulse" : "bg-red-400"}`} />
                {isOpen ? "Aberto agora" : `Abre às ${HOURS.open}h`}
              </div>
            </nav>

            {/* CTA no fundo */}
            <div className="p-6 pb-10">
              <a
                href={LINKS.delivery}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-gold btn-gold-pulse w-full justify-center text-base py-4"
                onClick={() => setMobileOpen(false)}
              >
                PEÇA AGORA
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
