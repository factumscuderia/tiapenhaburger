"use client";

import { useState, useEffect } from "react";
import { LINKS, ADDRESS, HOURS, SITE_CONFIG } from "@/lib/config";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative bg-[var(--penha-burgundy)]/40 border-t border-[var(--penha-cream)]/5">
      {/* Main Footer */}
      <div className="max-w-[1200px] mx-auto px-4 md:px-8 py-16">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Logo & About */}
          <div className="lg:col-span-1">
            <div className="flex items-center gap-3 mb-5">
              <div className="w-12 h-12 rounded-full bg-[var(--penha-red)] flex items-center justify-center border border-[var(--penha-cream)]/10">
                <span className="font-slab text-[var(--penha-cream)] text-sm font-bold">
                  TP
                </span>
              </div>
              <div>
                <span className="font-display text-lg text-[var(--penha-cream)] block leading-none">
                  TIA PENHA
                </span>
                <span className="font-slab text-[var(--penha-gold)] text-xs italic">
                  Burger
                </span>
              </div>
            </div>
            <p className="font-body text-[var(--penha-cream)]/50 text-sm leading-relaxed">
              O tradicional hambúrguer de Belo Horizonte. Sabor de família, feito com carinho desde sempre.
            </p>
          </div>

          {/* Links */}
          <div>
            <h4 className="font-slab text-[var(--penha-cream)] font-bold text-sm mb-4 uppercase tracking-wider">
              Navegação
            </h4>
            <ul className="space-y-2.5">
              {[
                { label: "Início", href: "#inicio" },
                { label: "O Jeito da Tia", href: "#jeito-da-tia" },
                { label: "Cardápio", href: "#cardapio" },
                { label: "Depoimentos", href: "#clientes" },
                { label: "Onde Estamos", href: "#onde-estamos" },
              ].map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className="font-body text-[var(--penha-cream)]/50 text-sm hover:text-[var(--penha-gold)] transition-colors"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contato */}
          <div>
            <h4 className="font-slab text-[var(--penha-cream)] font-bold text-sm mb-4 uppercase tracking-wider">
              Contato
            </h4>
            <ul className="space-y-3">
              <li>
                <a
                  href={`tel:${LINKS.phoneRaw}`}
                  className="font-body text-[var(--penha-cream)]/50 text-sm hover:text-[var(--penha-gold)] transition-colors flex items-center gap-2"
                >
                  <svg
                    width="14"
                    height="14"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z" />
                  </svg>
                  {LINKS.phone}
                </a>
              </li>
              <li>
                <a
                  href={LINKS.whatsapp}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-body text-[var(--penha-cream)]/50 text-sm hover:text-[var(--penha-gold)] transition-colors flex items-center gap-2"
                >
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                  </svg>
                  WhatsApp
                </a>
              </li>
              <li>
                <a
                  href={LINKS.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-body text-[var(--penha-cream)]/50 text-sm hover:text-[var(--penha-gold)] transition-colors flex items-center gap-2"
                >
                  <svg
                    width="14"
                    height="14"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                    <circle cx="12" cy="12" r="5" />
                    <circle
                      cx="17.5"
                      cy="6.5"
                      r="1.5"
                      fill="currentColor"
                      stroke="none"
                    />
                  </svg>
                  {LINKS.instagramHandle}
                </a>
              </li>
            </ul>
          </div>

          {/* Endereço & Horário */}
          <div>
            <h4 className="font-slab text-[var(--penha-cream)] font-bold text-sm mb-4 uppercase tracking-wider">
              Visite-nos
            </h4>
            <p className="font-body text-[var(--penha-cream)]/50 text-sm leading-relaxed mb-4">
              {ADDRESS.street}
              <br />
              {ADDRESS.neighborhood}, {ADDRESS.city} – {ADDRESS.state}
            </p>
            <div className="flex items-center gap-2">
              <svg
                width="14"
                height="14"
                viewBox="0 0 24 24"
                fill="none"
                stroke="var(--penha-gold)"
                strokeWidth="2"
              >
                <circle cx="12" cy="12" r="10" />
                <polyline points="12 6 12 12 16 14" />
              </svg>
              <span className="font-slab text-[var(--penha-gold)] text-sm font-bold">
                {HOURS.days} — {HOURS.display}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-[var(--penha-cream)]/5">
        <div className="max-w-[1200px] mx-auto px-4 md:px-8 py-5 flex flex-col md:flex-row items-center justify-between gap-3">
          <p className="font-body text-[var(--penha-cream)]/30 text-xs text-center md:text-left">
            © {currentYear} {SITE_CONFIG.name}. Todos os direitos reservados.
          </p>
          <p className="font-body text-[var(--penha-cream)]/20 text-xs">
            Feito com ❤️ em Belo Horizonte
          </p>
        </div>
      </div>
    </footer>
  );
}
