// ─── Configuração Central — Tia Penha Burger ───────────────────────────────

export const SITE_CONFIG = {
  name: "Tia Penha Burger",
  tagline: "O tradicional hambúrguer da Tia Penha",
  title: "Tia Penha Burger | Hambúrguer Tradicional em Belo Horizonte",
  description:
    "Tia Penha Burger — O tradicional hambúrguer de Belo Horizonte. Ingredientes selecionados, sabor de casa e carinho em cada mordida. Peça pelo delivery ou visite-nos em Santa Inês, BH.",
  url: "https://tiapenhaburger.com.br",
  locale: "pt-BR",
  timezone: "America/Sao_Paulo",
};

export const COLORS = {
  penhaRed: "#A50F20",
  penhaBurgundy: "#5E0B16",
  penhaCream: "#FFF3DC",
  penhaGold: "#E9B44C",
  bgDark: "#140B0C",
  bgCard: "#1F1213",
};

export const LINKS = {
  delivery: "https://tiapenhaburger.saipos.com/home",
  instagram: "https://www.instagram.com/tiapenhaburger",
  instagramHandle: "@tiapenhaburger",
  whatsapp: "https://wa.me/553136534809",
  phone: "(31) 3653-4809",
  phoneRaw: "+553136534809",
  googleMaps:
    "https://www.google.com/maps/place/Av.+Contagem,+1743+-+Santa+In%C3%AAs,+Belo+Horizonte+-+MG,+31080-255",
};

export const ADDRESS = {
  street: "Av. Contagem, 1743",
  neighborhood: "Santa Inês",
  city: "Belo Horizonte",
  state: "MG",
  zip: "31080-255",
  full: "Av. Contagem, 1743 – Santa Inês, Belo Horizonte – MG, 31080-255",
  // Coordenadas para o embed do Google Maps
  lat: -19.9023,
  lng: -43.9685,
};

// Horário de funcionamento — todos os dias, 18h às 23h (horário de BH)
export const HOURS = {
  open: 18, // 18:00
  close: 23, // 23:00
  days: "Todos os dias",
  display: "18h às 23h",
};

export const NAV_ITEMS = [
  { label: "Início", href: "#inicio" },
  { label: "Hambúrgueres", href: "#hero" },
  { label: "O Jeito da Tia", href: "#jeito-da-tia" },
  { label: "Cardápio", href: "#cardapio" },
  { label: "Clientes", href: "#clientes" },
  { label: "Onde Estamos", href: "#onde-estamos" },
];

export const MARQUEE_TEXT =
  "HAMBÚRGUER TRADICIONAL • ENTRADAS • SOBREMESAS • TODOS OS DIAS DAS 18H ÀS 23H";
