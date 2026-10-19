"use client";

import { useState, useEffect, useRef } from "react";
import { motion, useInView } from "framer-motion";
import { useCart } from "@/contexts/CartContext";
import { LINKS } from "@/lib/config";
import BurgerCustomizationModal, {
  BurgerCustomizationData,
} from "@/components/BurgerCustomizationModal";

interface MenuItem {
  id: string;
  name: string;
  description: string;
  price: number | null;
  image: string | null;
  featured: boolean;
  isBurger?: boolean;
}

interface MenuCategory {
  id: string;
  name: string;
  icon: string;
  items: MenuItem[];
}

interface MenuData {
  categories: MenuCategory[];
  burgerCustomization?: BurgerCustomizationData;
}

export default function Cardapio() {
  const [menu, setMenu] = useState<MenuData | null>(null);
  const [activeCategory, setActiveCategory] = useState(0);
  const [selectedItemForModal, setSelectedItemForModal] =
    useState<MenuItem | null>(null);
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
          <h2 className="font-display text-5xl sm:text-6xl md:text-7xl text-[var(--penha-cream)] leading-none uppercase tracking-tight">
            NOSSO CARDÁPIO
          </h2>
        </div>

        {/* Abas de categoria */}
        <div className="flex justify-center gap-2 md:gap-3 mb-10 flex-wrap px-2">
          {menu.categories.map((cat, i) => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(i)}
              className={`px-5 py-2.5 rounded-full font-body text-xs sm:text-sm font-semibold transition-all duration-300 flex items-center gap-2 cursor-pointer ${
                activeCategory === i
                  ? "bg-[var(--penha-gold)] text-[var(--bg-dark)] shadow-lg shadow-[var(--penha-gold)]/25 scale-105"
                  : "bg-[var(--bg-card)] text-[var(--penha-cream)]/75 hover:bg-[var(--penha-cream)]/10 hover:text-[var(--penha-cream)] border border-[var(--penha-cream)]/10"
              }`}
            >
              <span className="text-base">{cat.icon}</span>
              <span>{cat.name}</span>
              <span
                className={`text-[10px] px-2 py-0.5 rounded-full font-mono font-bold ${
                  activeCategory === i
                    ? "bg-[var(--bg-dark)]/20 text-[var(--bg-dark)]"
                    : "bg-white/10 text-[var(--penha-cream)]/60"
                }`}
              >
                {cat.items.length}
              </span>
            </button>
          ))}
        </div>

        {/* Grid de itens */}
        <motion.div
          key={currentCategory.id}
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35 }}
          className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5"
        >
          {currentCategory.items.map((item, i) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.35, delay: Math.min(i * 0.05, 0.4) }}
              className="glass-card group hover:border-[var(--penha-gold)]/30 hover:shadow-xl hover:shadow-[var(--penha-gold)]/5 transition-all duration-300 flex flex-col overflow-hidden cursor-pointer"
              onClick={() => setSelectedItemForModal(item)}
            >
              {/* Imagem / Espaço reservado para a foto */}
              <div className="relative h-44 overflow-hidden bg-[#180f10]">
                {item.image ? (
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                ) : (
                  <div className="w-full h-full flex flex-col items-center justify-center p-4 text-center border-b border-dashed border-[var(--penha-gold)]/20 bg-gradient-to-b from-[#231416] to-[#160d0e]">
                    <div className="w-12 h-12 rounded-full bg-[var(--penha-gold)]/10 border border-[var(--penha-gold)]/25 flex items-center justify-center text-2xl mb-2 group-hover:scale-110 transition-transform duration-300">
                      {currentCategory.icon}
                    </div>
                    <span className="text-[11px] font-slab uppercase tracking-wider text-[var(--penha-cream)]/75">
                      {item.name}
                    </span>
                    <span className="text-[10px] text-[var(--penha-gold)]/70 mt-0.5">
                      Espaço reservado para foto
                    </span>
                  </div>
                )}
                <div className="absolute top-3 left-3 flex flex-col gap-1 z-10">
                  {item.featured && (
                    <span className="px-2.5 py-1 bg-[var(--penha-gold)] text-[var(--bg-dark)] text-[10px] font-bold uppercase rounded-full tracking-wider shadow-md">
                      Destaque
                    </span>
                  )}
                  {item.isBurger && (
                    <span className="px-2 py-0.5 bg-black/70 backdrop-blur-sm text-[var(--penha-gold)] text-[9px] font-bold uppercase rounded-md tracking-wider border border-[var(--penha-gold)]/30">
                      Personalizável
                    </span>
                  )}
                </div>
              </div>

              {/* Info */}
              <div className="p-5 flex flex-col flex-1">
                <h3 className="font-slab text-[var(--penha-cream)] text-base font-bold mb-2 group-hover:text-[var(--penha-gold)] transition-colors">
                  {item.name}
                </h3>
                <p className="font-body text-[var(--penha-cream)]/60 text-xs leading-relaxed mb-4 flex-1 line-clamp-3">
                  {item.description}
                </p>

                <div className="flex items-center justify-between mt-auto pt-3 border-t border-white/5">
                  <span className="font-slab text-[var(--penha-gold)] text-lg font-bold">
                    {item.price
                      ? `R$ ${item.price.toFixed(2).replace(".", ",")}`
                      : "Consultar"}
                  </span>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      if (item.isBurger) {
                        setSelectedItemForModal(item);
                      } else {
                        addItem({
                          id: item.id,
                          name: item.name,
                          price: item.price,
                          image: item.image,
                        });
                      }
                    }}
                    className="w-9 h-9 rounded-full bg-[var(--penha-gold)]/15 border border-[var(--penha-gold)]/40 flex items-center justify-center hover:bg-[var(--penha-gold)] hover:text-[var(--bg-dark)] text-[var(--penha-gold)] transition-all duration-300 shadow-sm cursor-pointer"
                    aria-label={
                      item.isBurger
                        ? `Personalizar ${item.name}`
                        : `Adicionar ${item.name} à sacola`
                    }
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

        {/* Modal de Customização / Ponto da Carne e Complementos */}
        {selectedItemForModal && (
          <BurgerCustomizationModal
            item={selectedItemForModal}
            customizationData={menu.burgerCustomization}
            onClose={() => setSelectedItemForModal(null)}
          />
        )}

        {/* CTA */}
        <div className="text-center mt-12">
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
        </div>
      </div>
    </section>
  );
}
