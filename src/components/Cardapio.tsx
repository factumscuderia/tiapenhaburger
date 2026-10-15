"use client";

import { useState, useEffect, useRef } from "react";
import { motion, useInView } from "framer-motion";
import { useCart } from "@/contexts/CartContext";
import { LINKS } from "@/lib/config";

interface MenuItem {
  id: string;
  name: string;
  description: string;
  price: number | null;
  image: string | null;
  featured: boolean;
  placeholder: boolean;
}

interface MenuCategory {
  id: string;
  name: string;
  icon: string;
  items: MenuItem[];
}

interface MenuData {
  categories: MenuCategory[];
}

export default function Cardapio() {
  const [menu, setMenu] = useState<MenuData | null>(null);
  const [activeCategory, setActiveCategory] = useState(0);
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.1 });
  const { addItem } = useCart();

  useEffect(() => {
    fetch("/menu.json")
      .then((res) => res.json())
      .then((data: MenuData) => setMenu(data))
      .catch(console.error);
  }, []);

  if (!menu) return null;

  const currentCategory = menu.categories[activeCategory];

  return (
    <section
      ref={sectionRef}
      id="cardapio"
      className="relative section-padding overflow-hidden scroll-mt-24"
    >
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-[var(--bg-dark)] via-[var(--bg-card)] to-[var(--bg-dark)] pointer-events-none" />

      <div className="relative z-10 max-w-[1200px] mx-auto">
        {/* Título da Seção */}
        <div className="text-center mb-10 pt-2">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[var(--penha-gold)]/10 border border-[var(--penha-gold)]/30 mb-3">
            <span className="w-1.5 h-1.5 rounded-full bg-[var(--penha-gold)] animate-pulse" />
            <span className="font-slab text-[var(--penha-gold)] text-xs font-bold tracking-widest uppercase">
              Tradicional & Artesanal
            </span>
          </div>
          <h2 className="font-display text-5xl sm:text-6xl md:text-7xl text-[var(--penha-cream)] leading-none uppercase tracking-tight">
            NOSSO CARDÁPIO
          </h2>
          <p className="mt-3 font-body text-[var(--penha-cream)]/70 text-sm sm:text-base max-w-lg mx-auto">
            Hambúrgueres preparados na chapa bem quente, entradas crocantes e sobremesas especiais da Tia Penha.
          </p>
        </div>

        {/* Abas de categoria */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="flex justify-center gap-2 md:gap-4 mb-12 flex-wrap"
        >
          {menu.categories.map((cat, i) => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(i)}
              className={`px-5 py-2.5 rounded-full font-body text-sm font-medium transition-all duration-300 flex items-center gap-2 ${
                activeCategory === i
                  ? "bg-[var(--penha-gold)] text-[var(--bg-dark)] shadow-lg shadow-[var(--penha-gold)]/20"
                  : "bg-[var(--bg-card)] text-[var(--penha-cream)]/70 hover:bg-[var(--penha-cream)]/10 border border-[var(--penha-cream)]/10"
              }`}
            >
              <span>{cat.icon}</span>
              {cat.name}
            </button>
          ))}
        </motion.div>

        {/* Grid de itens */}
        <motion.div
          key={currentCategory.id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5"
        >
          {currentCategory.items.map((item, i) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: i * 0.07 }}
              className="glass-card group hover:border-[var(--penha-gold)]/20 transition-all duration-500 flex flex-col overflow-hidden"
            >
              {/* Imagem / Placeholder */}
              <div className="relative h-44 overflow-hidden bg-[var(--bg-card)]">
                {item.image ? (
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                ) : (
                  <div className="w-full h-full img-placeholder flex flex-col items-center justify-center gap-2 text-3xl">
                    {currentCategory.icon}
                    <span className="text-[10px] text-[var(--penha-cream)]/20">
                      foto em breve
                    </span>
                  </div>
                )}
                {item.featured && (
                  <span className="absolute top-3 left-3 px-2.5 py-1 bg-[var(--penha-gold)] text-[var(--bg-dark)] text-[10px] font-bold uppercase rounded-full tracking-wider">
                    Destaque
                  </span>
                )}
              </div>

              {/* Info */}
              <div className="p-5 flex flex-col flex-1">
                <h3 className="font-slab text-[var(--penha-cream)] text-base font-bold mb-2">
                  {item.name}
                </h3>
                <p className="font-body text-[var(--penha-cream)]/50 text-xs leading-relaxed mb-4 flex-1">
                  {item.description}
                </p>

                <div className="flex items-center justify-between mt-auto">
                  <span className="font-slab text-[var(--penha-gold)] text-lg font-bold">
                    {item.price
                      ? `R$ ${item.price.toFixed(2).replace(".", ",")}`
                      : "Consultar"}
                  </span>
                  <button
                    onClick={() =>
                      addItem({
                        id: item.id,
                        name: item.name,
                        price: item.price,
                        image: item.image,
                      })
                    }
                    className="w-9 h-9 rounded-full bg-[var(--penha-gold)]/10 border border-[var(--penha-gold)]/30 flex items-center justify-center hover:bg-[var(--penha-gold)] hover:text-[var(--bg-dark)] text-[var(--penha-gold)] transition-all duration-300"
                    aria-label={`Adicionar ${item.name} à sacola`}
                  >
                    <svg
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <line x1="12" y1="5" x2="12" y2="19" />
                      <line x1="5" y1="12" x2="19" y2="12" />
                    </svg>
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.6 }}
          className="text-center mt-12"
        >
          <a
            href={LINKS.delivery}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-gold btn-gold-pulse"
          >
            VER CARDÁPIO COMPLETO
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
              <path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6" />
              <polyline points="15 3 21 3 21 9" />
              <line x1="10" y1="14" x2="21" y2="3" />
            </svg>
          </a>
        </motion.div>
      </div>
    </section>
  );
}
