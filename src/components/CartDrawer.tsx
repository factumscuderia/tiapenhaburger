"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useCart } from "@/contexts/CartContext";
import { LINKS } from "@/lib/config";

export default function CartDrawer() {
  const {
    items,
    removeItem,
    updateQuantity,
    clearCart,
    totalItems,
    subtotal,
    isDrawerOpen,
    closeDrawer,
  } = useCart();

  // Formatar mensagem do WhatsApp
  const buildWhatsAppMessage = () => {
    if (items.length === 0) return "";
    let msg = "🍔 *Pedido Tia Penha Burger*\n\n";
    items.forEach((item) => {
      const priceStr = item.price
        ? ` — R$ ${(item.price * item.quantity).toFixed(2).replace(".", ",")}`
        : "";
      msg += `• ${item.quantity}x ${item.name}${priceStr}\n`;
    });
    if (subtotal > 0) {
      msg += `\n💰 *Total: R$ ${subtotal.toFixed(2).replace(".", ",")}*`;
    }
    msg += "\n\nGostaria de fazer esse pedido!";
    return encodeURIComponent(msg);
  };

  return (
    <AnimatePresence>
      {isDrawerOpen && (
        <>
          {/* Overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeDrawer}
            className="fixed inset-0 z-[70] bg-black/60 backdrop-blur-sm"
          />

          {/* Drawer */}
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 30, stiffness: 300 }}
            className="fixed top-0 right-0 bottom-0 z-[80] w-full max-w-md bg-[var(--bg-dark)] border-l border-[var(--penha-cream)]/10 flex flex-col"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-[var(--penha-cream)]/10">
              <div className="flex items-center gap-3">
                <svg
                  width="22"
                  height="22"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="var(--penha-gold)"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z" />
                  <line x1="3" y1="6" x2="21" y2="6" />
                  <path d="M16 10a4 4 0 01-8 0" />
                </svg>
                <h2 className="font-slab text-[var(--penha-cream)] text-lg font-bold">
                  Sua Sacola
                </h2>
                {totalItems > 0 && (
                  <span className="px-2 py-0.5 bg-[var(--penha-gold)] text-[var(--bg-dark)] text-xs font-bold rounded-full">
                    {totalItems}
                  </span>
                )}
              </div>
              <button
                onClick={closeDrawer}
                className="w-9 h-9 flex items-center justify-center rounded-full hover:bg-[var(--penha-cream)]/10 transition-colors"
                aria-label="Fechar sacola"
              >
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <line x1="18" y1="6" x2="6" y2="18" />
                  <line x1="6" y1="6" x2="18" y2="18" />
                </svg>
              </button>
            </div>

            {/* Itens */}
            <div className="flex-1 overflow-y-auto p-6">
              {items.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-full text-center gap-4">
                  <span className="text-6xl">🛒</span>
                  <p className="font-slab text-[var(--penha-cream)]/50 text-lg">
                    Sua sacola está vazia
                  </p>
                  <p className="font-body text-[var(--penha-cream)]/30 text-sm">
                    Adicione itens do cardápio para começar seu pedido!
                  </p>
                  <button
                    onClick={closeDrawer}
                    className="btn-gold text-sm mt-2"
                  >
                    VER CARDÁPIO
                  </button>
                </div>
              ) : (
                <div className="space-y-4">
                  {items.map((item) => (
                    <motion.div
                      key={item.id}
                      layout
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      className="glass-card p-4 flex gap-4"
                    >
                      {/* Ícone do item */}
                      <div className="w-14 h-14 rounded-xl bg-[var(--bg-card)] flex items-center justify-center flex-shrink-0 text-2xl">
                        🍔
                      </div>

                      {/* Info */}
                      <div className="flex-1 min-w-0">
                        <h3 className="font-slab text-[var(--penha-cream)] text-sm font-bold truncate">
                          {item.name}
                        </h3>
                        <span className="font-body text-[var(--penha-gold)] text-sm font-semibold">
                          {item.price
                            ? `R$ ${item.price
                                .toFixed(2)
                                .replace(".", ",")}`
                            : "Consultar"}
                        </span>

                        {/* Controles de quantidade */}
                        <div className="flex items-center gap-3 mt-2">
                          <button
                            onClick={() =>
                              updateQuantity(item.id, item.quantity - 1)
                            }
                            className="w-7 h-7 rounded-full border border-[var(--penha-cream)]/20 flex items-center justify-center text-[var(--penha-cream)]/60 hover:border-[var(--penha-gold)] hover:text-[var(--penha-gold)] transition-colors"
                          >
                            <svg
                              width="12"
                              height="12"
                              viewBox="0 0 24 24"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth="2.5"
                            >
                              <line x1="5" y1="12" x2="19" y2="12" />
                            </svg>
                          </button>
                          <span className="font-slab text-[var(--penha-cream)] text-sm font-bold min-w-[20px] text-center">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() =>
                              updateQuantity(item.id, item.quantity + 1)
                            }
                            className="w-7 h-7 rounded-full border border-[var(--penha-cream)]/20 flex items-center justify-center text-[var(--penha-cream)]/60 hover:border-[var(--penha-gold)] hover:text-[var(--penha-gold)] transition-colors"
                          >
                            <svg
                              width="12"
                              height="12"
                              viewBox="0 0 24 24"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth="2.5"
                            >
                              <line x1="12" y1="5" x2="12" y2="19" />
                              <line x1="5" y1="12" x2="19" y2="12" />
                            </svg>
                          </button>
                        </div>
                      </div>

                      {/* Remover */}
                      <button
                        onClick={() => removeItem(item.id)}
                        className="self-start w-7 h-7 flex items-center justify-center text-[var(--penha-cream)]/30 hover:text-red-400 transition-colors"
                        aria-label={`Remover ${item.name}`}
                      >
                        <svg
                          width="16"
                          height="16"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                        >
                          <polyline points="3 6 5 6 21 6" />
                          <path d="M19 6v14a2 2 0 01-2 2H7a2 2 0 01-2-2V6m3 0V4a2 2 0 012-2h4a2 2 0 012 2v2" />
                        </svg>
                      </button>
                    </motion.div>
                  ))}

                  {/* Limpar sacola */}
                  <button
                    onClick={clearCart}
                    className="text-[var(--penha-cream)]/30 hover:text-red-400 text-xs font-medium transition-colors mt-2"
                  >
                    Limpar sacola
                  </button>
                </div>
              )}
            </div>

            {/* Footer com total */}
            {items.length > 0 && (
              <div className="border-t border-[var(--penha-cream)]/10 p-6 space-y-4">
                {subtotal > 0 && (
                  <div className="flex items-center justify-between">
                    <span className="font-body text-[var(--penha-cream)]/60 text-sm">
                      Subtotal
                    </span>
                    <span className="font-slab text-[var(--penha-cream)] text-xl font-bold">
                      R$ {subtotal.toFixed(2).replace(".", ",")}
                    </span>
                  </div>
                )}
                <a
                  href={`${LINKS.whatsapp}?text=${buildWhatsAppMessage()}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-gold btn-gold-pulse w-full justify-center py-4 text-base"
                  onClick={closeDrawer}
                >
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                  >
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                  </svg>
                  ENVIAR PEDIDO
                </a>
                <p className="font-body text-[var(--penha-cream)]/30 text-xs text-center">
                  O pedido será enviado via WhatsApp
                </p>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
