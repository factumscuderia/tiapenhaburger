"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useCart, CartComplemento } from "@/contexts/CartContext";

export interface CustomizationOption {
  id: string;
  name: string;
  price: number;
}

export interface BurgerCustomizationData {
  pontoCarne: {
    title: string;
    subtitle: string;
    required: boolean;
    options: CustomizationOption[];
  };
  complementos: {
    title: string;
    subtitle: string;
    maxChoices: number;
    options: CustomizationOption[];
  };
  viagem: {
    title: string;
    options: CustomizationOption[];
  };
}

export interface ModalMenuItem {
  id: string;
  name: string;
  description: string;
  price: number | null;
  image: string | null;
  featured?: boolean;
  isBurger?: boolean;
}

interface BurgerCustomizationModalProps {
  item: ModalMenuItem | null;
  customizationData?: BurgerCustomizationData;
  onClose: () => void;
}

export default function BurgerCustomizationModal({
  item,
  customizationData,
  onClose,
}: BurgerCustomizationModalProps) {
  const { addItem } = useCart();

  const [pontoCarne, setPontoCarne] = useState<string>("");
  const [complementos, setComplementos] = useState<Record<string, number>>({});
  const [paraViagem, setParaViagem] = useState<boolean>(false);
  const [observacoes, setObservacoes] = useState<string>("");
  const [quantity, setQuantity] = useState<number>(1);

  if (!item) return null;

  const data = customizationData || {
    pontoCarne: {
      title: "PONTO DA CARNE",
      subtitle: "Escolha pelo menos 1 opção",
      required: true,
      options: [
        { id: "ao-ponto", name: "AO PONTO", price: 0 },
        { id: "mal-passado", name: "MAL PASSADO", price: 0 },
        { id: "bem-passado", name: "BEM PASSADO", price: 0 },
      ],
    },
    complementos: {
      title: "COMPLEMENTOS (OPCIONAIS):",
      subtitle: "Escolha até 5 opções",
      maxChoices: 5,
      options: [
        { id: "hamburguer-extra", name: "HAMBÚRGUER EXTRA", price: 16 },
        { id: "queijo", name: "QUEIJO", price: 4 },
        { id: "bacon", name: "BACON", price: 8 },
        { id: "cebola", name: "CEBOLA", price: 4 },
        { id: "cogumelo", name: "COGUMELO", price: 5 },
        { id: "ovo", name: "OVO", price: 4 },
        { id: "picles", name: "PICLES", price: 4 },
        { id: "geleia-jab", name: "GELEIA JAB", price: 8 },
        { id: "salada", name: "SALADA (ALFACE E TOMATE)", price: 4 },
        { id: "cebola-caramelizada", name: "CEBOLA CARAMELIZADA", price: 4 },
        { id: "maionese-bacon", name: "MAIONESE DE BACON", price: 4 },
      ],
    },
    viagem: {
      title: "VIAGEM",
      options: [{ id: "para-viagem", name: "PARA VIAGEM", price: 0 }],
    },
  };

  const totalComplementosCount = Object.values(complementos).reduce(
    (acc, val) => acc + val,
    0
  );

  const handleComplementoChange = (id: string, delta: number) => {
    const current = complementos[id] || 0;
    const next = current + delta;
    if (next < 0) return;
    if (delta > 0 && totalComplementosCount >= data.complementos.maxChoices) {
      return;
    }
    setComplementos((prev) => ({
      ...prev,
      [id]: next,
    }));
  };

  // Cálculo de preço
  const basePrice = item.price || 0;
  const complementosTotal = Object.entries(complementos).reduce(
    (sum, [optId, qty]) => {
      const opt = data.complementos.options.find((o) => o.id === optId);
      return sum + (opt ? opt.price * qty : 0);
    },
    0
  );
  const unitPrice = basePrice + complementosTotal;
  const totalPrice = unitPrice * quantity;

  const isFormValid = !item.isBurger || (data.pontoCarne.required ? !!pontoCarne : true);

  const handleAddToCart = () => {
    if (!isFormValid) return;

    const selectedComplementosList: CartComplemento[] = Object.entries(
      complementos
    )
      .filter(([, qty]) => qty > 0)
      .map(([optId, qty]) => {
        const opt = data.complementos.options.find((o) => o.id === optId);
        return {
          name: opt ? opt.name : optId,
          quantity: qty,
          price: opt ? opt.price : 0,
        };
      });

    const compHash = selectedComplementosList
      .map((c) => `${c.name}:${c.quantity}`)
      .join("|");

    const uniqueId = `${item.id}-${pontoCarne || "none"}-${compHash}-${
      paraViagem ? "viagem" : "aqui"
    }-${observacoes.trim()}`;

    addItem({
      id: uniqueId,
      originalId: item.id,
      name: item.name,
      price: unitPrice,
      quantity,
      image: item.image,
      pontoCarne: pontoCarne || undefined,
      complementos:
        selectedComplementosList.length > 0
          ? selectedComplementosList
          : undefined,
      paraViagem: paraViagem || undefined,
      observacoes: observacoes.trim() || undefined,
    });

    onClose();
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[100] flex items-center justify-center p-0 sm:p-4 md:p-6 overflow-hidden">
        {/* Overlay */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-black/80 backdrop-blur-md"
        />

        {/* Modal Window */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 30 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 30 }}
          transition={{ type: "spring", damping: 25, stiffness: 300 }}
          className="relative w-full h-full sm:h-auto sm:max-h-[92vh] sm:max-w-xl bg-[#141211] border border-[var(--penha-cream)]/15 sm:rounded-3xl shadow-2xl flex flex-col z-10 overflow-hidden text-[#f4efe6]"
        >
          {/* Header da Barra Superior */}
          <div className="flex items-center justify-between p-4 px-5 border-b border-white/10 bg-[#1a1715]/80 backdrop-blur z-20">
            <span className="text-xs font-semibold tracking-wider uppercase text-[var(--penha-gold)]">
              Personalizar Pedido
            </span>
            <button
              onClick={onClose}
              className="w-8 h-8 rounded-full bg-white/5 hover:bg-white/10 flex items-center justify-center text-[#f4efe6]/70 hover:text-[#f4efe6] transition-colors"
              aria-label="Fechar"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            </button>
          </div>

          {/* Conteúdo com Scroll */}
          <div className="flex-1 overflow-y-auto divide-y divide-white/10 overscroll-contain">
            {/* Foto e Informações do Produto */}
            <div className="p-5 flex flex-col sm:flex-row gap-4 items-start bg-[#161413]">
              {item.image && (
                <div className="w-full sm:w-28 h-32 sm:h-28 rounded-2xl overflow-hidden bg-black/40 flex-shrink-0 border border-white/10">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-full h-full object-cover"
                  />
                </div>
              )}
              <div className="flex-1 min-w-0">
                <h3 className="font-slab text-xl font-bold text-[var(--penha-cream)] uppercase tracking-wide">
                  {item.name}
                </h3>
                <p className="font-body text-xs text-[var(--penha-cream)]/65 leading-relaxed mt-1.5 line-clamp-3">
                  {item.description}
                </p>
                <div className="font-slab text-[var(--penha-gold)] font-bold text-lg mt-2">
                  {item.price ? `R$ ${item.price.toFixed(2).replace(".", ",")}` : "Consultar"}
                </div>
              </div>
            </div>

            {/* SEÇÃO 1: PONTO DA CARNE */}
            {item.isBurger && (
              <div className="bg-[#12100f]">
                {/* Header da Seção estilo Saipos */}
                <div className="p-4 px-5 bg-[#1f1b19] flex items-center justify-between border-b border-white/5">
                  <div>
                    <h4 className="font-bold text-xs uppercase tracking-wider text-[var(--penha-cream)]">
                      {data.pontoCarne.title}
                    </h4>
                    <p className="text-[11px] text-[var(--penha-cream)]/50">
                      {data.pontoCarne.subtitle}
                    </p>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <span className="px-2 py-0.5 bg-black/40 text-[11px] font-mono text-[var(--penha-cream)]/80 rounded border border-white/10">
                      {pontoCarne ? "1/1" : "0/1"}
                    </span>
                    <span className="px-2 py-0.5 bg-[var(--penha-gold)]/20 text-[var(--penha-gold)] text-[10px] font-bold uppercase rounded tracking-wider border border-[var(--penha-gold)]/30">
                      OBRIGATÓRIO
                    </span>
                  </div>
                </div>

                {/* Opções de Ponto da Carne */}
                <div className="divide-y divide-white/5">
                  {data.pontoCarne.options.map((opt) => {
                    const isSelected = pontoCarne === opt.name;
                    return (
                      <label
                        key={opt.id}
                        onClick={() => setPontoCarne(opt.name)}
                        className={`flex items-center justify-between p-4 px-5 cursor-pointer transition-colors ${
                          isSelected
                            ? "bg-[var(--penha-gold)]/10"
                            : "hover:bg-white/[0.02]"
                        }`}
                      >
                        <div>
                          <div className="font-semibold text-xs uppercase text-[var(--penha-cream)]">
                            {opt.name}
                          </div>
                          <div className="text-[11px] text-[var(--penha-cream)]/50 mt-0.5">
                            {opt.price === 0
                              ? "Grátis"
                              : `+ R$ ${opt.price.toFixed(2).replace(".", ",")}`}
                          </div>
                        </div>

                        {/* Radio indicator */}
                        <div
                          className={`w-5 h-5 rounded-full border-2 flex items-center justify-center transition-all ${
                            isSelected
                              ? "border-[var(--penha-gold)] bg-[var(--penha-gold)]"
                              : "border-white/30"
                          }`}
                        >
                          {isSelected && (
                            <div className="w-2 h-2 rounded-full bg-[#12100f]" />
                          )}
                        </div>
                      </label>
                    );
                  })}
                </div>
              </div>
            )}

            {/* SEÇÃO 2: COMPLEMENTOS (OPCIONAIS) */}
            {item.isBurger && (
              <div className="bg-[#12100f]">
                {/* Header da Seção */}
                <div className="p-4 px-5 bg-[#1f1b19] flex items-center justify-between border-b border-white/5">
                  <div>
                    <h4 className="font-bold text-xs uppercase tracking-wider text-[var(--penha-cream)]">
                      {data.complementos.title}
                    </h4>
                    <p className="text-[11px] text-[var(--penha-cream)]/50">
                      {data.complementos.subtitle}
                    </p>
                  </div>
                  <span className="px-2 py-0.5 bg-black/40 text-[11px] font-mono text-[var(--penha-cream)]/80 rounded border border-white/10">
                    {totalComplementosCount}/{data.complementos.maxChoices}
                  </span>
                </div>

                {/* Lista de Complementos */}
                <div className="divide-y divide-white/5">
                  {data.complementos.options.map((opt) => {
                    const count = complementos[opt.id] || 0;
                    const canAdd =
                      totalComplementosCount < data.complementos.maxChoices;

                    return (
                      <div
                        key={opt.id}
                        className={`flex items-center justify-between p-3.5 px-5 transition-colors ${
                          count > 0 ? "bg-[var(--penha-gold)]/[0.04]" : ""
                        }`}
                      >
                        <div className="pr-4 flex-1">
                          <div className="font-semibold text-xs uppercase text-[var(--penha-cream)]">
                            {opt.name}
                          </div>
                          <div className="text-[11px] text-[var(--penha-gold)] font-medium mt-0.5">
                            + R$ {opt.price.toFixed(2).replace(".", ",")}
                          </div>
                        </div>

                        {/* Stepper (- 0 +) */}
                        <div className="flex items-center gap-3">
                          <button
                            type="button"
                            onClick={() => handleComplementoChange(opt.id, -1)}
                            disabled={count === 0}
                            className={`w-7 h-7 rounded-lg border flex items-center justify-center font-bold text-sm transition-all ${
                              count > 0
                                ? "border-[var(--penha-gold)] text-[var(--penha-gold)] hover:bg-[var(--penha-gold)]/10"
                                : "border-white/10 text-white/20 cursor-not-allowed"
                            }`}
                          >
                            —
                          </button>
                          <span className="w-5 text-center font-mono text-xs font-bold text-[var(--penha-cream)]">
                            {count}
                          </span>
                          <button
                            type="button"
                            onClick={() => handleComplementoChange(opt.id, 1)}
                            disabled={!canAdd}
                            className={`w-7 h-7 rounded-lg border flex items-center justify-center font-bold text-base transition-all ${
                              canAdd
                                ? "border-[var(--penha-gold)] text-[var(--penha-gold)] hover:bg-[var(--penha-gold)]/10"
                                : "border-white/10 text-white/20 cursor-not-allowed"
                            }`}
                          >
                            +
                          </button>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {/* SEÇÃO 3: VIAGEM */}
            <div className="bg-[#12100f]">
              <div className="p-4 px-5 bg-[#1f1b19] border-b border-white/5">
                <h4 className="font-bold text-xs uppercase tracking-wider text-[var(--penha-cream)]">
                  {data.viagem.title}
                </h4>
              </div>

              <label
                onClick={() => setParaViagem(!paraViagem)}
                className={`flex items-center justify-between p-4 px-5 cursor-pointer transition-colors ${
                  paraViagem
                    ? "bg-[var(--penha-gold)]/10"
                    : "hover:bg-white/[0.02]"
                }`}
              >
                <div>
                  <div className="font-semibold text-xs uppercase text-[var(--penha-cream)]">
                    PARA VIAGEM
                  </div>
                  <div className="text-[11px] text-[var(--penha-cream)]/50 mt-0.5">
                    Grátis
                  </div>
                </div>

                <div
                  className={`w-5 h-5 rounded-full border-2 flex items-center justify-center transition-all ${
                    paraViagem
                      ? "border-[var(--penha-gold)] bg-[var(--penha-gold)]"
                      : "border-white/30"
                  }`}
                >
                  {paraViagem && (
                    <div className="w-2 h-2 rounded-full bg-[#12100f]" />
                  )}
                </div>
              </label>
            </div>

            {/* SEÇÃO 4: OBSERVAÇÕES */}
            <div className="p-5 bg-[#141211]">
              <div className="flex items-center justify-between mb-2">
                <label
                  htmlFor="obs-textarea"
                  className="font-semibold text-xs text-[var(--penha-cream)]/80"
                >
                  Alguma observação?
                </label>
                <span className="text-[10px] font-mono text-[var(--penha-cream)]/40">
                  {observacoes.length}/500
                </span>
              </div>
              <textarea
                id="obs-textarea"
                maxLength={500}
                rows={3}
                value={observacoes}
                onChange={(e) => setObservacoes(e.target.value)}
                placeholder="Ex: sem cebola, maionese à parte, corte ao meio..."
                className="w-full bg-black/40 border border-white/10 rounded-xl p-3 text-xs text-[var(--penha-cream)] placeholder-[var(--penha-cream)]/30 focus:outline-none focus:border-[var(--penha-gold)]/50 transition-colors resize-none"
              />
            </div>
          </div>

          {/* FOOTER FIXO */}
          <div className="p-4 px-5 border-t border-white/10 bg-[#191614] flex items-center gap-4 z-20">
            {/* Quantidade do Produto */}
            <div className="flex items-center gap-2 bg-black/40 border border-white/10 rounded-xl p-1 px-2">
              <button
                type="button"
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                className="w-7 h-7 rounded-lg flex items-center justify-center font-bold text-sm text-[var(--penha-cream)]/70 hover:text-[var(--penha-gold)] transition-colors"
              >
                —
              </button>
              <span className="w-6 text-center font-slab font-bold text-sm text-[var(--penha-cream)]">
                {quantity}
              </span>
              <button
                type="button"
                onClick={() => setQuantity(quantity + 1)}
                className="w-7 h-7 rounded-lg flex items-center justify-center font-bold text-base text-[var(--penha-cream)]/70 hover:text-[var(--penha-gold)] transition-colors"
              >
                +
              </button>
            </div>

            {/* Botão Adicionar à Sacola */}
            <button
              type="button"
              onClick={handleAddToCart}
              disabled={!isFormValid}
              className={`flex-1 py-3.5 px-4 rounded-xl font-slab font-bold text-xs uppercase tracking-wider flex items-center justify-between transition-all duration-300 ${
                isFormValid
                  ? "bg-[var(--penha-gold)] text-[var(--bg-dark)] hover:shadow-lg hover:shadow-[var(--penha-gold)]/20 active:scale-[0.99]"
                  : "bg-white/10 text-white/30 cursor-not-allowed"
              }`}
            >
              <span>
                {item.isBurger && !pontoCarne
                  ? "Escolha o ponto da carne"
                  : "Adicionar à Sacola"}
              </span>
              <span className="font-mono text-sm">
                R$ {totalPrice.toFixed(2).replace(".", ",")}
              </span>
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
