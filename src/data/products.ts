import almonds from "@/assets/almonds.jpg";
import cashews from "@/assets/cashews.jpg";
import pistachios from "@/assets/pistachios.jpg";
import walnuts from "@/assets/walnuts.jpg";
import medjool from "@/assets/medjool.jpg";
import ajwa from "@/assets/ajwa.jpg";
import raisins from "@/assets/raisins.jpg";
import pumpkinSeeds from "@/assets/pumpkin-seeds.jpg";
import sunflowerSeeds from "@/assets/sunflower-seeds.jpg";
import mixed from "@/assets/mixed.jpg";
import cranberries from "@/assets/cranberries.jpg";
import anjeer from "@/assets/anjeer.jpg";
import spices from "@/assets/spices.jpg";
import hamper from "@/assets/hamper.jpg";

export const productImages = {
  almonds,
  cashews,
  pistachios,
  walnuts,
  medjool,
  ajwa,
  raisins,
  pumpkinSeeds,
  sunflowerSeeds,
  mixed,
  cranberries,
  anjeer,
  spices,
  hamper,
};

export type WeightOption = { weight: string; price: number; mrp: number };

export type Product = {
  id: string;
  name: string;
  slug: string;
  category: string;
  categorySlug: string;
  description: string;
  shortDescription: string;
  images: string[];
  price: number;
  mrp: number;
  discount: number;
  rating: number;
  reviewCount: number;
  availableWeights: WeightOption[];
  stock: number;
  tags: string[];
  bestseller: boolean;
  featured: boolean;
  organic: boolean;
  origin: string;
  benefits: string[];
  nutrition: { label: string; value: string }[];
  packaging: string;
  storage: string;
  createdAt: string;
};

const disc = (mrp: number, price: number) => Math.round(((mrp - price) / mrp) * 100);

function make(p: Omit<Product, "price" | "mrp" | "discount">): Product {
  const base = p.availableWeights[0]!;
  return { ...p, price: base.price, mrp: base.mrp, discount: disc(base.mrp, base.price) };
}

export const products: Product[] = [
  make({
    id: "p1",
    name: "Premium California Almonds",
    slug: "premium-california-almonds",
    category: "Almonds",
    categorySlug: "almonds",
    shortDescription: "Hand-sorted jumbo California almonds, crisp and naturally sweet.",
    description:
      "Our Premium California Almonds are hand-sorted for uniform size, crunch and a naturally sweet finish. Sourced directly from trusted growers and packed fresh in small batches at our Crawford Market facility, they are ideal for daily soaking, festive mithai, gifting and everyday snacking.",
    images: [almonds, mixed, hamper],
    rating: 4.8,
    reviewCount: 412,
    availableWeights: [
      { weight: "250g", price: 289, mrp: 349 },
      { weight: "500g", price: 549, mrp: 679 },
      { weight: "1kg", price: 1049, mrp: 1299 },
    ],
    stock: 180,
    tags: ["almonds", "badam", "nuts", "protein", "daily wellness"],
    bestseller: true,
    featured: true,
    organic: false,
    origin: "California, USA",
    benefits: [
      "Rich in vitamin E and healthy fats",
      "Supports heart health and skin glow",
      "Great source of plant protein and fibre",
    ],
    nutrition: [
      { label: "Energy", value: "579 kcal / 100g" },
      { label: "Protein", value: "21.2 g" },
      { label: "Fat", value: "49.9 g" },
      { label: "Fibre", value: "12.5 g" },
    ],
    packaging: "Food-grade vacuum-sealed pouch inside a resealable kraft pack.",
    storage: "Store in a cool, dry place away from sunlight. Refrigerate after opening.",
    createdAt: "2026-01-12",
  }),
  make({
    id: "p2",
    name: "Iranian Pistachios (Salted)",
    slug: "iranian-pistachios-salted",
    category: "Pistachios",
    categorySlug: "pistachios",
    shortDescription: "Long Akbari pistachios, lightly roasted and sea-salted.",
    description:
      "Premium Iranian Akbari pistachios with a naturally wide split shell, roasted in small batches and finished with a light touch of sea salt. A South Mumbai favourite for festive platters and premium hampers.",
    images: [pistachios, mixed, hamper],
    rating: 4.9,
    reviewCount: 268,
    availableWeights: [
      { weight: "250g", price: 449, mrp: 549 },
      { weight: "500g", price: 869, mrp: 1079 },
      { weight: "1kg", price: 1699, mrp: 2099 },
    ],
    stock: 95,
    tags: ["pistachio", "pista", "iranian", "roasted", "nuts"],
    bestseller: true,
    featured: true,
    organic: false,
    origin: "Rafsanjan, Iran",
    benefits: [
      "High in protein and antioxidants",
      "Supports eye health with lutein",
      "Naturally satisfying low-GI snack",
    ],
    nutrition: [
      { label: "Energy", value: "562 kcal / 100g" },
      { label: "Protein", value: "20.2 g" },
      { label: "Fat", value: "45.3 g" },
      { label: "Fibre", value: "10.6 g" },
    ],
    packaging: "Nitrogen-flushed pouch to lock in roast freshness.",
    storage: "Keep sealed in a cool, dry place. Best consumed within 6 months.",
    createdAt: "2026-01-20",
  }),
  make({
    id: "p3",
    name: "Chilean Walnut Kernels",
    slug: "chilean-walnut-kernels",
    category: "Walnuts",
    categorySlug: "walnuts",
    shortDescription: "Light-halves Chilean walnut kernels, buttery and never bitter.",
    description:
      "Chilean light-half walnut kernels selected for pale colour and a clean, buttery taste. Shelled and packed fresh so you get crunch without the bitterness that comes from old stock.",
    images: [walnuts, mixed, hamper],
    rating: 4.7,
    reviewCount: 193,
    availableWeights: [
      { weight: "250g", price: 399, mrp: 499 },
      { weight: "500g", price: 769, mrp: 949 },
      { weight: "1kg", price: 1479, mrp: 1849 },
    ],
    stock: 120,
    tags: ["walnut", "akhrot", "omega 3", "brain food", "nuts"],
    bestseller: true,
    featured: false,
    organic: false,
    origin: "Santiago, Chile",
    benefits: [
      "Excellent plant source of omega-3 ALA",
      "Supports brain and heart health",
      "Rich in antioxidants and magnesium",
    ],
    nutrition: [
      { label: "Energy", value: "654 kcal / 100g" },
      { label: "Protein", value: "15.2 g" },
      { label: "Fat", value: "65.2 g" },
      { label: "Fibre", value: "6.7 g" },
    ],
    packaging: "Vacuum-sealed pouch with oxygen absorber.",
    storage: "Refrigerate to retain freshness of natural oils.",
    createdAt: "2026-02-02",
  }),
  make({
    id: "p4",
    name: "W320 Whole Cashews",
    slug: "w320-whole-cashews",
    category: "Cashews",
    categorySlug: "cashews",
    shortDescription: "Grade W320 whole white cashews with a creamy bite.",
    description:
      "Grade W320 whole cashews from the Konkan belt — ivory white, unbroken and creamy. The everyday grade trusted by our wholesale and gifting customers for kaju katli, curries and snacking.",
    images: [cashews, mixed, hamper],
    rating: 4.8,
    reviewCount: 356,
    availableWeights: [
      { weight: "250g", price: 319, mrp: 389 },
      { weight: "500g", price: 619, mrp: 759 },
      { weight: "1kg", price: 1199, mrp: 1499 },
    ],
    stock: 210,
    tags: ["cashew", "kaju", "w320", "nuts", "cooking"],
    bestseller: true,
    featured: true,
    organic: false,
    origin: "Konkan, Maharashtra",
    benefits: [
      "Good source of copper, magnesium and iron",
      "Supports bone and immune health",
      "Creamy texture, perfect for Indian sweets",
    ],
    nutrition: [
      { label: "Energy", value: "553 kcal / 100g" },
      { label: "Protein", value: "18.2 g" },
      { label: "Fat", value: "43.8 g" },
      { label: "Fibre", value: "3.3 g" },
    ],
    packaging: "Resealable food-grade pouch, hand-packed.",
    storage: "Store in an airtight container in a cool, dry place.",
    createdAt: "2026-01-05",
  }),
  make({
    id: "p5",
    name: "Jumbo Medjool Dates",
    slug: "jumbo-medjool-dates",
    category: "Dates",
    categorySlug: "dates",
    shortDescription: "Soft, caramel-sweet jumbo Medjool dates.",
    description:
      "Jumbo Medjool dates with a soft, fudgy texture and deep caramel sweetness. Naturally sun-ripened, unsweetened and unsulphured — a wholesome sugar alternative for shakes, desserts and Ramadan tables.",
    images: [medjool, hamper, mixed],
    rating: 4.9,
    reviewCount: 301,
    availableWeights: [
      { weight: "250g", price: 349, mrp: 429 },
      { weight: "500g", price: 669, mrp: 829 },
      { weight: "1kg", price: 1289, mrp: 1599 },
    ],
    stock: 140,
    tags: ["dates", "khajoor", "medjool", "natural sweetener", "ramadan"],
    bestseller: true,
    featured: true,
    organic: true,
    origin: "Jordan Valley",
    benefits: [
      "Natural energy from unrefined fruit sugars",
      "Rich in potassium and dietary fibre",
      "Supports digestion and stamina",
    ],
    nutrition: [
      { label: "Energy", value: "277 kcal / 100g" },
      { label: "Protein", value: "1.8 g" },
      { label: "Carbohydrate", value: "75 g" },
      { label: "Fibre", value: "6.7 g" },
    ],
    packaging: "Protective tray inside a premium gift-ready box.",
    storage: "Store refrigerated for a firmer bite and longer shelf life.",
    createdAt: "2026-02-14",
  }),
  make({
    id: "p6",
    name: "Ajwa Dates (Madinah)",
    slug: "ajwa-dates-madinah",
    category: "Dates",
    categorySlug: "dates",
    shortDescription: "Authentic soft Ajwa dates with a fine, dark texture.",
    description:
      "Authentic Ajwa dates from Madinah — dark, soft and mildly sweet with a delicate raisin-like finish. Carefully graded and hygienically packed for gifting and daily sunnah consumption.",
    images: [ajwa, hamper, medjool],
    rating: 4.8,
    reviewCount: 176,
    availableWeights: [
      { weight: "250g", price: 649, mrp: 799 },
      { weight: "500g", price: 1249, mrp: 1549 },
      { weight: "1kg", price: 2399, mrp: 2999 },
    ],
    stock: 60,
    tags: ["ajwa", "dates", "madinah", "premium", "ramadan"],
    bestseller: false,
    featured: true,
    organic: true,
    origin: "Madinah, Saudi Arabia",
    benefits: [
      "Naturally rich in minerals and fibre",
      "Gentle, slow-release energy",
      "Traditionally valued for daily wellness",
    ],
    nutrition: [
      { label: "Energy", value: "282 kcal / 100g" },
      { label: "Protein", value: "2.4 g" },
      { label: "Carbohydrate", value: "74 g" },
      { label: "Fibre", value: "8 g" },
    ],
    packaging: "Premium rigid box with inner food-grade liner.",
    storage: "Keep refrigerated in an airtight container.",
    createdAt: "2026-02-18",
  }),
  make({
    id: "p7",
    name: "Golden Seedless Raisins",
    slug: "golden-seedless-raisins",
    category: "Raisins",
    categorySlug: "raisins",
    shortDescription: "Plump golden Nashik raisins, seedless and sun-dried.",
    description:
      "Plump, honey-gold seedless raisins from Nashik vineyards. Sun-dried and cleaned without added colour, they bring a gentle sweetness to kheer, pulao, trail mixes and lunchboxes.",
    images: [raisins, mixed, hamper],
    rating: 4.6,
    reviewCount: 224,
    availableWeights: [
      { weight: "250g", price: 129, mrp: 169 },
      { weight: "500g", price: 239, mrp: 319 },
      { weight: "1kg", price: 449, mrp: 599 },
    ],
    stock: 260,
    tags: ["raisins", "kishmish", "dried fruit", "nashik", "budget"],
    bestseller: true,
    featured: false,
    organic: false,
    origin: "Nashik, Maharashtra",
    benefits: [
      "Natural iron and antioxidant support",
      "Aids digestion and hydration",
      "Quick natural energy boost",
    ],
    nutrition: [
      { label: "Energy", value: "299 kcal / 100g" },
      { label: "Protein", value: "3.1 g" },
      { label: "Carbohydrate", value: "79 g" },
      { label: "Fibre", value: "3.7 g" },
    ],
    packaging: "Resealable pouch, hygienically machine-cleaned.",
    storage: "Store in a cool, dry place; refrigerate in humid weather.",
    createdAt: "2026-01-28",
  }),
  make({
    id: "p8",
    name: "Raw Pumpkin Seeds",
    slug: "raw-pumpkin-seeds",
    category: "Seeds",
    categorySlug: "seeds",
    shortDescription: "Hulled AA-grade pumpkin seeds, raw and unsalted.",
    description:
      "AA-grade hulled pumpkin seeds (pepitas), raw and unsalted. A clean source of magnesium and zinc that works in smoothies, salads, granola and everyday snacking jars.",
    images: [pumpkinSeeds, mixed, sunflowerSeeds],
    rating: 4.5,
    reviewCount: 138,
    availableWeights: [
      { weight: "250g", price: 199, mrp: 259 },
      { weight: "500g", price: 379, mrp: 499 },
      { weight: "1kg", price: 719, mrp: 949 },
    ],
    stock: 150,
    tags: ["seeds", "pumpkin seeds", "pepita", "zinc", "organic"],
    bestseller: false,
    featured: false,
    organic: true,
    origin: "Inner Mongolia, China",
    benefits: [
      "High in magnesium and zinc",
      "Supports immunity and sleep quality",
      "Plant protein for everyday diets",
    ],
    nutrition: [
      { label: "Energy", value: "559 kcal / 100g" },
      { label: "Protein", value: "30.2 g" },
      { label: "Fat", value: "49 g" },
      { label: "Fibre", value: "6 g" },
    ],
    packaging: "Resealable stand-up pouch.",
    storage: "Store airtight in a cool, dry place.",
    createdAt: "2026-02-06",
  }),
  make({
    id: "p9",
    name: "Roasted Sunflower Seeds",
    slug: "roasted-sunflower-seeds",
    category: "Seeds",
    categorySlug: "seeds",
    shortDescription: "Lightly roasted hulled sunflower seeds, crunchy and clean.",
    description:
      "Hulled sunflower seeds roasted at low heat for an even crunch without oil. A light, everyday seed for salad toppings, chaats and desk-side snacking.",
    images: [sunflowerSeeds, pumpkinSeeds, mixed],
    rating: 4.4,
    reviewCount: 96,
    availableWeights: [
      { weight: "250g", price: 149, mrp: 199 },
      { weight: "500g", price: 279, mrp: 379 },
      { weight: "1kg", price: 529, mrp: 719 },
    ],
    stock: 175,
    tags: ["seeds", "sunflower", "roasted", "snack", "organic"],
    bestseller: false,
    featured: false,
    organic: true,
    origin: "Ukraine",
    benefits: [
      "Good source of vitamin E and selenium",
      "Supports skin and cell health",
      "Light, low-calorie crunch",
    ],
    nutrition: [
      { label: "Energy", value: "584 kcal / 100g" },
      { label: "Protein", value: "20.8 g" },
      { label: "Fat", value: "51.5 g" },
      { label: "Fibre", value: "8.6 g" },
    ],
    packaging: "Resealable stand-up pouch.",
    storage: "Keep sealed away from heat and moisture.",
    createdAt: "2026-02-08",
  }),
  make({
    id: "p10",
    name: "Premium Mixed Dry Fruits",
    slug: "premium-mixed-dry-fruits",
    category: "Dried Fruits",
    categorySlug: "dried-fruits",
    shortDescription: "A daily mix of almonds, cashews, pistachios, raisins and walnuts.",
    description:
      "Our signature everyday mix — almonds, cashews, pistachios, walnuts and golden raisins in balanced proportion. Blended and packed fresh so every handful tastes the same as the first.",
    images: [mixed, almonds, hamper],
    rating: 4.7,
    reviewCount: 389,
    availableWeights: [
      { weight: "250g", price: 359, mrp: 449 },
      { weight: "500g", price: 689, mrp: 869 },
      { weight: "1kg", price: 1329, mrp: 1699 },
    ],
    stock: 130,
    tags: ["mixed dry fruits", "trail mix", "daily", "gifting", "value"],
    bestseller: true,
    featured: true,
    organic: false,
    origin: "Blended in Mumbai",
    benefits: [
      "Balanced protein, fibre and healthy fats",
      "Convenient daily wellness portion",
      "Ideal for offices and travel",
    ],
    nutrition: [
      { label: "Energy", value: "540 kcal / 100g" },
      { label: "Protein", value: "17 g" },
      { label: "Fat", value: "41 g" },
      { label: "Fibre", value: "8.4 g" },
    ],
    packaging: "Resealable premium pouch with inner liner.",
    storage: "Store in a cool, dry place; reseal after every use.",
    createdAt: "2026-01-16",
  }),
  make({
    id: "p11",
    name: "Dried Cranberries",
    slug: "dried-cranberries",
    category: "Dried Fruits",
    categorySlug: "dried-fruits",
    shortDescription: "Whole sliced cranberries with a bright sweet-tart flavour.",
    description:
      "Whole dried cranberries with a bright sweet-tart bite. Perfect in baking, breakfast bowls, salads and festive dry-fruit boxes.",
    images: [cranberries, mixed, hamper],
    rating: 4.5,
    reviewCount: 141,
    availableWeights: [
      { weight: "250g", price: 229, mrp: 289 },
      { weight: "500g", price: 439, mrp: 559 },
      { weight: "1kg", price: 849, mrp: 1069 },
    ],
    stock: 110,
    tags: ["cranberry", "dried fruit", "baking", "antioxidant"],
    bestseller: false,
    featured: false,
    organic: false,
    origin: "Wisconsin, USA",
    benefits: [
      "Antioxidant-rich berry polyphenols",
      "Supports urinary tract health",
      "Adds natural tartness to recipes",
    ],
    nutrition: [
      { label: "Energy", value: "308 kcal / 100g" },
      { label: "Protein", value: "0.2 g" },
      { label: "Carbohydrate", value: "82 g" },
      { label: "Fibre", value: "5.7 g" },
    ],
    packaging: "Resealable pouch with moisture barrier.",
    storage: "Store in a cool, dry place away from sunlight.",
    createdAt: "2026-02-11",
  }),
  make({
    id: "p12",
    name: "Premium Afghan Anjeer",
    slug: "premium-afghan-anjeer",
    category: "Dried Fruits",
    categorySlug: "dried-fruits",
    shortDescription: "Soft, seedy Afghan dried figs with natural sweetness.",
    description:
      "Large Afghan dried figs (anjeer), soft-centred and naturally sweet with no added sugar. Soaked overnight or eaten as-is, anjeer is one of the most requested wellness staples at our Crawford Market counter.",
    images: [anjeer, mixed, hamper],
    rating: 4.7,
    reviewCount: 205,
    availableWeights: [
      { weight: "250g", price: 449, mrp: 569 },
      { weight: "500g", price: 869, mrp: 1099 },
      { weight: "1kg", price: 1679, mrp: 2149 },
    ],
    stock: 85,
    tags: ["anjeer", "figs", "dried fruit", "fibre", "wellness"],
    bestseller: true,
    featured: false,
    organic: true,
    origin: "Kandahar, Afghanistan",
    benefits: [
      "Exceptionally high in dietary fibre",
      "Natural source of calcium and iron",
      "Supports digestion and bone strength",
    ],
    nutrition: [
      { label: "Energy", value: "249 kcal / 100g" },
      { label: "Protein", value: "3.3 g" },
      { label: "Carbohydrate", value: "64 g" },
      { label: "Fibre", value: "9.8 g" },
    ],
    packaging: "Food-grade pouch inside a printed kraft carton.",
    storage: "Refrigerate after opening for maximum softness.",
    createdAt: "2026-02-20",
  }),
  make({
    id: "p13",
    name: "Kashmiri Saffron & Spice Set",
    slug: "kashmiri-saffron-spice-set",
    category: "Spices",
    categorySlug: "spices",
    shortDescription: "Mongra saffron with green cardamom, cloves and cinnamon.",
    description:
      "A curated set of Kashmiri Mongra saffron threads paired with green cardamom, cloves and Ceylon cinnamon. Hand-picked whole spices with strong aroma, packed in glass-safe pouches for kitchens and gifting.",
    images: [spices, hamper, mixed],
    rating: 4.8,
    reviewCount: 88,
    availableWeights: [
      { weight: "250g", price: 899, mrp: 1149 },
      { weight: "500g", price: 1749, mrp: 2249 },
      { weight: "1kg", price: 3399, mrp: 4399 },
    ],
    stock: 45,
    tags: ["spices", "saffron", "kesar", "cardamom", "gifting"],
    bestseller: false,
    featured: true,
    organic: false,
    origin: "Pampore, Kashmir & Kerala",
    benefits: [
      "Intense aroma from whole, unground spices",
      "Adds depth to biryani, desserts and chai",
      "Lab-checked purity, no artificial colour",
    ],
    nutrition: [
      { label: "Serving", value: "Use 2-3 saffron threads per cup" },
      { label: "Additives", value: "None" },
      { label: "Colour", value: "Natural" },
      { label: "Shelf life", value: "18 months" },
    ],
    packaging: "Individually sealed spice pouches in a rigid presentation box.",
    storage: "Keep away from light and humidity in an airtight jar.",
    createdAt: "2026-02-22",
  }),
  make({
    id: "p14",
    name: "Signature Festive Hamper Box",
    slug: "signature-festive-hamper-box",
    category: "Gift Hampers",
    categorySlug: "gift-hampers",
    shortDescription: "Four-compartment hamper of almonds, cashews, pista and dates.",
    description:
      "Our signature festive hamper — a deep green, gold-trimmed box with four compartments of almonds, cashews, pistachios and Medjool dates. Customisable with your greeting card or corporate branding.",
    images: [hamper, mixed, medjool],
    rating: 4.9,
    reviewCount: 154,
    availableWeights: [
      { weight: "250g", price: 999, mrp: 1249 },
      { weight: "500g", price: 1799, mrp: 2299 },
      { weight: "1kg", price: 3299, mrp: 4199 },
    ],
    stock: 70,
    tags: ["gift hamper", "festive", "diwali", "corporate", "wedding"],
    bestseller: true,
    featured: true,
    organic: false,
    origin: "Assembled in Mumbai",
    benefits: [
      "Ready-to-gift premium presentation",
      "Custom branding for corporate orders",
      "Freshly assembled on order",
    ],
    nutrition: [
      { label: "Contents", value: "4 assorted compartments" },
      { label: "Box", value: "Rigid, reusable" },
      { label: "Card", value: "Personalised greeting" },
      { label: "Lead time", value: "2-4 days for bulk" },
    ],
    packaging: "Rigid gift box with gold foil detail and ribbon.",
    storage: "Store in a cool, dry place. Consume within 3 months.",
    createdAt: "2026-02-25",
  }),
];

export const findProduct = (list: Product[], slug: string) => list.find((p) => p.slug === slug);
