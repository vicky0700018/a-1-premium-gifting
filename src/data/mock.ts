import { productImages } from "./products";

export type Coupon = {
  id: string;
  code: string;
  discount: number;
  minOrder: number;
  expiry: string;
  active: boolean;
};

export const coupons: Coupon[] = [
  { id: "cp1", code: "WELCOME10", discount: 10, minOrder: 999, expiry: "2026-12-31", active: true },
  { id: "cp2", code: "DRYFRUIT15", discount: 15, minOrder: 1999, expiry: "2026-10-31", active: true },
  { id: "cp3", code: "FESTIVE20", discount: 20, minOrder: 2999, expiry: "2026-11-15", active: true },
];

export type Banner = {
  id: string;
  title: string;
  subtitle: string;
  cta: string;
  ctaLink: string;
  image: string;
  active: boolean;
};

export const banners: Banner[] = [
  {
    id: "b1",
    title: "Premium Dry Fruits, Naturally Better.",
    subtitle:
      "Premium nuts, dried fruits, seeds and spices sourced for quality, freshness and everyday wellness.",
    cta: "Shop Now",
    ctaLink: "/shop",
    image: productImages.mixed,
    active: true,
  },
  {
    id: "b2",
    title: "Festive Gifting from Crawford Market",
    subtitle: "Hand-assembled hampers for Diwali, Eid and every celebration in between.",
    cta: "Explore Hampers",
    ctaLink: "/gift-hampers",
    image: productImages.hamper,
    active: false,
  },
  {
    id: "b3",
    title: "Corporate Gifting, Beautifully Packaged",
    subtitle: "Bespoke boxes and private-label packaging for teams, clients and events.",
    cta: "Request a Quote",
    ctaLink: "/corporate-orders",
    image: productImages.pistachios,
    active: false,
  },
  {
    id: "b4",
    title: "Healthy Everyday Essentials",
    subtitle: "Soaked almonds, walnuts and seeds — the daily habit that lasts.",
    cta: "Shop Essentials",
    ctaLink: "/shop",
    image: productImages.almonds,
    active: false,
  },
];

export type Review = {
  id: string;
  customer: string;
  productSlug: string;
  product: string;
  rating: number;
  text: string;
  date: string;
  status: "Approved" | "Pending" | "Rejected";
};

export const reviews: Review[] = [
  {
    id: "r1",
    customer: "Farhan Shaikh",
    productSlug: "premium-california-almonds",
    product: "Premium California Almonds",
    rating: 5,
    text: "Bought 1kg for the family. Crunchy, fresh and clearly better than what we get locally.",
    date: "2026-08-14",
    status: "Approved",
  },
  {
    id: "r2",
    customer: "Meera Kulkarni",
    productSlug: "iranian-pistachios-salted",
    product: "Iranian Pistachios (Salted)",
    rating: 5,
    text: "The pista is long, perfectly salted and packed well. Ordered again for Diwali gifting.",
    date: "2026-08-09",
    status: "Approved",
  },
  {
    id: "r3",
    customer: "Rohit Deshmukh",
    productSlug: "jumbo-medjool-dates",
    product: "Jumbo Medjool Dates",
    rating: 4,
    text: "Very soft and sweet. Delivery to Andheri took two days, packaging was neat.",
    date: "2026-08-02",
    status: "Approved",
  },
  {
    id: "r4",
    customer: "Ayesha Qureshi",
    productSlug: "ajwa-dates-madinah",
    product: "Ajwa Dates (Madinah)",
    rating: 5,
    text: "Genuine Ajwa quality. Zakir bhai personally helped us select the grade for Ramadan.",
    date: "2026-07-27",
    status: "Pending",
  },
  {
    id: "r5",
    customer: "Nikhil Jain",
    productSlug: "w320-whole-cashews",
    product: "W320 Whole Cashews",
    rating: 4,
    text: "Whole pieces, no breakage. Used for kaju katli and it turned out great.",
    date: "2026-07-21",
    status: "Approved",
  },
  {
    id: "r6",
    customer: "Sanjana Rao",
    productSlug: "premium-mixed-dry-fruits",
    product: "Premium Mixed Dry Fruits",
    rating: 5,
    text: "Our office pantry staple now. The mix ratio is genuinely balanced.",
    date: "2026-07-15",
    status: "Pending",
  },
];

export type GiftHamper = {
  id: string;
  name: string;
  slug: string;
  description: string;
  contents: string[];
  price: number;
  mrp: number;
  image: string;
  stock: number;
  featured: boolean;
};

export const giftHampers: GiftHamper[] = [
  {
    id: "g1",
    name: "Festive Dry Fruit Hamper",
    slug: "festive-dry-fruit-hamper",
    description: "A classic four-tray festive box for family and neighbours.",
    contents: ["Almonds 200g", "Cashews 200g", "Raisins 150g", "Medjool Dates 150g"],
    price: 1499,
    mrp: 1899,
    image: productImages.hamper,
    stock: 40,
    featured: true,
  },
  {
    id: "g2",
    name: "Premium Corporate Hamper",
    slug: "premium-corporate-hamper",
    description: "Branded lid, custom card and premium assortment for client gifting.",
    contents: ["Pistachios 200g", "Walnuts 200g", "Anjeer 150g", "Saffron 1g"],
    price: 2599,
    mrp: 3199,
    image: productImages.pistachios,
    stock: 55,
    featured: true,
  },
  {
    id: "g3",
    name: "Royal Nut Collection",
    slug: "royal-nut-collection",
    description: "Six-compartment collection of our highest grades.",
    contents: ["Mamra Almonds", "W240 Cashews", "Akbari Pista", "Chilean Walnuts", "Anjeer", "Apricots"],
    price: 3499,
    mrp: 4299,
    image: productImages.mixed,
    stock: 25,
    featured: true,
  },
  {
    id: "g4",
    name: "Wedding Gift Box",
    slug: "wedding-gift-box",
    description: "Elegant shagun box, available from 50 units with custom ribbons.",
    contents: ["Almonds 150g", "Cashews 150g", "Dates 150g", "Sugar-free Mithai Mix 100g"],
    price: 1199,
    mrp: 1499,
    image: productImages.almonds,
    stock: 120,
    featured: false,
  },
  {
    id: "g5",
    name: "Diwali Special Hamper",
    slug: "diwali-special-hamper",
    description: "Festive green and gold box with diya, dry fruits and saffron.",
    contents: ["Mixed Dry Fruits 300g", "Pistachios 150g", "Kesar 1g", "Brass Diya"],
    price: 1899,
    mrp: 2399,
    image: productImages.medjool,
    stock: 60,
    featured: true,
  },
  {
    id: "g6",
    name: "Luxury Gourmet Hamper",
    slug: "luxury-gourmet-hamper",
    description: "Our flagship hamper with saffron, Ajwa dates and premium nuts.",
    contents: ["Ajwa Dates 250g", "Mamra Almonds 250g", "Akbari Pista 250g", "Kashmiri Saffron 2g"],
    price: 5499,
    mrp: 6799,
    image: productImages.ajwa,
    stock: 18,
    featured: true,
  },
];

export type Order = {
  id: string;
  customer: string;
  email: string;
  phone: string;
  date: string;
  items: number;
  amount: number;
  payment: string;
  status: "Pending" | "Confirmed" | "Packed" | "Shipped" | "Delivered" | "Cancelled";
};

export const orders: Order[] = [
  { id: "A1-10241", customer: "Farhan Shaikh", email: "farhan.shaikh@example.com", phone: "+91 98201 44521", date: "2026-08-28", items: 3, amount: 2489, payment: "UPI", status: "Delivered" },
  { id: "A1-10242", customer: "Meera Kulkarni", email: "meera.k@example.com", phone: "+91 99303 11824", date: "2026-08-29", items: 2, amount: 1798, payment: "Card", status: "Shipped" },
  { id: "A1-10243", customer: "Rohit Deshmukh", email: "rohit.d@example.com", phone: "+91 98191 77420", date: "2026-08-30", items: 5, amount: 5240, payment: "Cash on Delivery", status: "Packed" },
  { id: "A1-10244", customer: "Ayesha Qureshi", email: "ayesha.q@example.com", phone: "+91 98670 30912", date: "2026-08-31", items: 1, amount: 649, payment: "UPI", status: "Confirmed" },
  { id: "A1-10245", customer: "Nikhil Jain", email: "nikhil.jain@example.com", phone: "+91 97690 55231", date: "2026-09-01", items: 4, amount: 3980, payment: "Net Banking", status: "Pending" },
  { id: "A1-10246", customer: "Sanjana Rao", email: "sanjana.rao@example.com", phone: "+91 98337 21190", date: "2026-09-01", items: 6, amount: 7420, payment: "Card", status: "Pending" },
  { id: "A1-10247", customer: "Imran Merchant", email: "imran.m@example.com", phone: "+91 91678 44012", date: "2026-09-02", items: 2, amount: 1298, payment: "UPI", status: "Cancelled" },
];

export type Customer = {
  id: string;
  name: string;
  email: string;
  phone: string;
  orders: number;
  spent: number;
  lastOrder: string;
  status: "Active" | "Inactive";
};

export const customers: Customer[] = [
  { id: "cu1", name: "Farhan Shaikh", email: "farhan.shaikh@example.com", phone: "+91 98201 44521", orders: 14, spent: 38240, lastOrder: "2026-08-28", status: "Active" },
  { id: "cu2", name: "Meera Kulkarni", email: "meera.k@example.com", phone: "+91 99303 11824", orders: 9, spent: 21980, lastOrder: "2026-08-29", status: "Active" },
  { id: "cu3", name: "Rohit Deshmukh", email: "rohit.d@example.com", phone: "+91 98191 77420", orders: 6, spent: 17650, lastOrder: "2026-08-30", status: "Active" },
  { id: "cu4", name: "Ayesha Qureshi", email: "ayesha.q@example.com", phone: "+91 98670 30912", orders: 21, spent: 64310, lastOrder: "2026-08-31", status: "Active" },
  { id: "cu5", name: "Nikhil Jain", email: "nikhil.jain@example.com", phone: "+91 97690 55231", orders: 3, spent: 8420, lastOrder: "2026-09-01", status: "Active" },
  { id: "cu6", name: "Sanjana Rao", email: "sanjana.rao@example.com", phone: "+91 98337 21190", orders: 11, spent: 42890, lastOrder: "2026-09-01", status: "Active" },
  { id: "cu7", name: "Imran Merchant", email: "imran.m@example.com", phone: "+91 91678 44012", orders: 2, spent: 2596, lastOrder: "2026-09-02", status: "Inactive" },
];

export type Inquiry = {
  id: string;
  name: string;
  company: string;
  phone: string;
  email: string;
  eventType: string;
  quantity: string;
  requiredDate: string;
  requirement: string;
  message: string;
  status: "New" | "Contacted" | "Quoted" | "Confirmed" | "Completed" | "Cancelled";
};

export const inquiries: Inquiry[] = [
  { id: "BQ-2041", name: "Pranav Iyer", company: "Meridian Capital", phone: "+91 98200 11223", email: "pranav@meridiancap.in", eventType: "Corporate Gifting", quantity: "350 boxes", requiredDate: "2026-10-18", requirement: "Premium Corporate Hamper with logo lid", message: "Need branded lids with our logo in gold foil.", status: "Quoted" },
  { id: "BQ-2042", name: "Sneha Patil", company: "Patil Weddings", phone: "+91 99671 88450", email: "sneha@patilweddings.com", eventType: "Wedding", quantity: "800 boxes", requiredDate: "2026-11-24", requirement: "Wedding Gift Box, maroon ribbon", message: "Delivery required in two phases to Dadar and Thane.", status: "New" },
  { id: "BQ-2043", name: "Aman Verma", company: "Verma Foods LLP", phone: "+91 98330 27741", email: "aman@vermafoods.co", eventType: "Bulk Dry Fruits", quantity: "500 kg", requiredDate: "2026-09-30", requirement: "W320 cashews and California almonds", message: "Monthly repeat order, need best wholesale rate.", status: "Contacted" },
  { id: "BQ-2044", name: "Divya Nair", company: "Nair Consulting", phone: "+91 97020 66512", email: "divya@nairconsulting.in", eventType: "Festival", quantity: "120 boxes", requiredDate: "2026-10-05", requirement: "Diwali Special Hamper", message: "Please include personalised cards for each client.", status: "Confirmed" },
];

export const salesOverview = [
  { month: "Mar", value: 312000 },
  { month: "Apr", value: 286000 },
  { month: "May", value: 341000 },
  { month: "Jun", value: 298000 },
  { month: "Jul", value: 402000 },
  { month: "Aug", value: 478000 },
];

export type Settings = {
  businessName: string;
  phone: string;
  email: string;
  address: string;
  currency: string;
  deliveryCharge: number;
  freeDeliveryThreshold: number;
  announcement: string;
  heroHeading: string;
  heroSubtext: string;
  footerText: string;
};

export const defaultSettings: Settings = {
  businessName: "A-1 Dry Fruits",
  phone: "+91 88797 23634",
  email: "support.a-1dryfruits@gmail.com",
  address:
    "Shop No. 160, Mahatma Phule Market (Crawford Market), 1st Lane, Opposite Badshah Cold Drink, Dhobi Talao, CSMT Area, Fort, Mumbai, Maharashtra 400001",
  currency: "INR (₹)",
  deliveryCharge: 79,
  freeDeliveryThreshold: 1499,
  announcement: "Premium Dry Fruits • Freshly Packed • Bulk & Corporate Orders Available",
  heroHeading: "Premium Dry Fruits, Naturally Better.",
  heroSubtext:
    "Premium nuts, dried fruits, seeds and spices sourced for quality, freshness and everyday wellness.",
  footerText:
    "Trusted since 2004 — supplying South Mumbai's homes, kitchens and businesses from Mahatma Phule Market.",
};
