import { productImages } from "./products";

export type Category = {
  id: string;
  name: string;
  slug: string;
  description: string;
  image: string;
  active: boolean;
};

export const categories: Category[] = [
  {
    id: "c1",
    name: "Almonds",
    slug: "almonds",
    description: "Jumbo California and Mamra almonds",
    image: productImages.almonds,
    active: true,
  },
  {
    id: "c2",
    name: "Cashews",
    slug: "cashews",
    description: "W320 and W240 whole Konkan cashews",
    image: productImages.cashews,
    active: true,
  },
  {
    id: "c3",
    name: "Pistachios",
    slug: "pistachios",
    description: "Iranian Akbari pista, roasted fresh",
    image: productImages.pistachios,
    active: true,
  },
  {
    id: "c4",
    name: "Walnuts",
    slug: "walnuts",
    description: "Chilean light-half walnut kernels",
    image: productImages.walnuts,
    active: true,
  },
  {
    id: "c5",
    name: "Dates",
    slug: "dates",
    description: "Medjool, Ajwa and Kalmi imported dates",
    image: productImages.medjool,
    active: true,
  },
  {
    id: "c6",
    name: "Raisins",
    slug: "raisins",
    description: "Golden, black and green Nashik kishmish",
    image: productImages.raisins,
    active: true,
  },
  {
    id: "c7",
    name: "Seeds",
    slug: "seeds",
    description: "Pumpkin, sunflower, chia and flax seeds",
    image: productImages.pumpkinSeeds,
    active: true,
  },
  {
    id: "c8",
    name: "Dried Fruits",
    slug: "dried-fruits",
    description: "Anjeer, apricots, cranberries and mixes",
    image: productImages.anjeer,
    active: true,
  },
  {
    id: "c9",
    name: "Spices",
    slug: "spices",
    description: "Saffron, cardamom and whole spices",
    image: productImages.spices,
    active: true,
  },
  {
    id: "c10",
    name: "Gift Hampers",
    slug: "gift-hampers",
    description: "Festive, wedding and corporate boxes",
    image: productImages.hamper,
    active: true,
  },
];
