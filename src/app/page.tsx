"use client";

import { CartProvider } from "@/contexts/CartContext";
import LoadingScreen from "@/components/LoadingScreen";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import OJeitoDaTia from "@/components/OJeitoDaTia";
import Cardapio from "@/components/Cardapio";
import Clientes from "@/components/Clientes";
import OndeEstamos from "@/components/OndeEstamos";
import Footer from "@/components/Footer";
import CartDrawer from "@/components/CartDrawer";
import WhatsAppFloat from "@/components/WhatsAppFloat";

export default function Home() {
  return (
    <CartProvider>
      <LoadingScreen />
      <Header />
      <main id="inicio">
        <Hero />
        <OJeitoDaTia />
        <Cardapio />
        <Clientes />
        <OndeEstamos />
      </main>
      <Footer />
      <CartDrawer />
      <WhatsAppFloat />
    </CartProvider>
  );
}
