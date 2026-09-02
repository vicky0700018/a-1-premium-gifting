import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import { products as seedProducts, type Product } from "@/data/products";
import { categories as seedCategories, type Category } from "@/data/categories";
import {
  banners as seedBanners,
  coupons as seedCoupons,
  customers as seedCustomers,
  defaultSettings,
  giftHampers as seedHampers,
  inquiries as seedInquiries,
  orders as seedOrders,
  reviews as seedReviews,
  type Banner,
  type Coupon,
  type Customer,
  type GiftHamper,
  type Inquiry,
  type Order,
  type Review,
  type Settings,
} from "@/data/mock";

export type CartItem = {
  productId: string;
  slug: string;
  name: string;
  image: string;
  weight: string;
  price: number;
  mrp: number;
  qty: number;
};

export type PlacedOrder = {
  id: string;
  name: string;
  email: string;
  phone: string;
  address: string;
  landmark: string;
  city: string;
  state: string;
  pincode: string;
  delivery: string;
  payment: string;
  items: CartItem[];
  subtotal: number;
  discount: number;
  deliveryFee: number;
  total: number;
  placedAt: string;
  eta: string;
};

type Toast = { id: number; message: string };

type StoreValue = {
  products: Product[];
  setProducts: React.Dispatch<React.SetStateAction<Product[]>>;
  categoryList: Category[];
  setCategoryList: React.Dispatch<React.SetStateAction<Category[]>>;
  bannerList: Banner[];
  setBannerList: React.Dispatch<React.SetStateAction<Banner[]>>;
  couponList: Coupon[];
  setCouponList: React.Dispatch<React.SetStateAction<Coupon[]>>;
  reviewList: Review[];
  setReviewList: React.Dispatch<React.SetStateAction<Review[]>>;
  hamperList: GiftHamper[];
  setHamperList: React.Dispatch<React.SetStateAction<GiftHamper[]>>;
  orderList: Order[];
  setOrderList: React.Dispatch<React.SetStateAction<Order[]>>;
  customerList: Customer[];
  setCustomerList: React.Dispatch<React.SetStateAction<Customer[]>>;
  inquiryList: Inquiry[];
  setInquiryList: React.Dispatch<React.SetStateAction<Inquiry[]>>;
  settings: Settings;
  setSettings: React.Dispatch<React.SetStateAction<Settings>>;
  cart: CartItem[];
  addToCart: (item: CartItem) => void;
  updateQty: (productId: string, weight: string, qty: number) => void;
  removeFromCart: (productId: string, weight: string) => void;
  clearCart: () => void;
  cartCount: number;
  cartSubtotal: number;
  wishlist: string[];
  toggleWishlist: (slug: string) => void;
  removeWishlist: (slug: string) => void;
  isAdmin: boolean;
  login: (email: string, password: string) => boolean;
  logout: () => void;
  lastOrder: PlacedOrder | null;
  placeOrder: (o: PlacedOrder) => void;
  toasts: Toast[];
  toast: (message: string) => void;
};

const StoreContext = createContext<StoreValue | null>(null);

function usePersisted<T>(key: string, initial: T) {
  const [value, setValue] = useState<T>(initial);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    try {
      const raw = window.localStorage.getItem(key);
      if (raw) setValue(JSON.parse(raw) as T);
    } catch {
      /* ignore corrupted storage */
    }
    setReady(true);
  }, [key]);

  useEffect(() => {
    if (!ready) return;
    try {
      window.localStorage.setItem(key, JSON.stringify(value));
    } catch {
      /* storage full or unavailable */
    }
  }, [key, value, ready]);

  return [value, setValue] as const;
}

export function StoreProvider({ children }: { children: ReactNode }) {
  const [products, setProducts] = usePersisted<Product[]>("a1-products", seedProducts);
  const [categoryList, setCategoryList] = usePersisted<Category[]>("a1-categories", seedCategories);
  const [bannerList, setBannerList] = usePersisted<Banner[]>("a1-banners", seedBanners);
  const [couponList, setCouponList] = usePersisted<Coupon[]>("a1-coupons", seedCoupons);
  const [reviewList, setReviewList] = usePersisted<Review[]>("a1-reviews", seedReviews);
  const [hamperList, setHamperList] = usePersisted<GiftHamper[]>("a1-hampers", seedHampers);
  const [orderList, setOrderList] = usePersisted<Order[]>("a1-orders", seedOrders);
  const [customerList, setCustomerList] = usePersisted<Customer[]>("a1-customers", seedCustomers);
  const [inquiryList, setInquiryList] = usePersisted<Inquiry[]>("a1-inquiries", seedInquiries);
  const [settings, setSettings] = usePersisted<Settings>("a1-settings", defaultSettings);
  const [cart, setCart] = usePersisted<CartItem[]>("a1-cart", []);
  const [wishlist, setWishlist] = usePersisted<string[]>("a1-wishlist", []);
  const [isAdmin, setIsAdmin] = usePersisted<boolean>("a1-admin", false);
  const [lastOrder, setLastOrder] = usePersisted<PlacedOrder | null>("a1-last-order", null);
  const [toasts, setToasts] = useState<Toast[]>([]);

  const toast = useCallback((message: string) => {
    const id = Date.now() + Math.random();
    setToasts((t) => [...t, { id, message }]);
    setTimeout(() => setToasts((t) => t.filter((x) => x.id !== id)), 2600);
  }, []);

  const addToCart = useCallback(
    (item: CartItem) => {
      setCart((prev) => {
        const idx = prev.findIndex((c) => c.productId === item.productId && c.weight === item.weight);
        if (idx >= 0) {
          const next = [...prev];
          next[idx] = { ...next[idx]!, qty: next[idx]!.qty + item.qty };
          return next;
        }
        return [...prev, item];
      });
      toast(`${item.name} (${item.weight}) added to cart`);
    },
    [setCart, toast],
  );

  const updateQty = useCallback(
    (productId: string, weight: string, qty: number) => {
      setCart((prev) =>
        prev
          .map((c) => (c.productId === productId && c.weight === weight ? { ...c, qty } : c))
          .filter((c) => c.qty > 0),
      );
    },
    [setCart],
  );

  const removeFromCart = useCallback(
    (productId: string, weight: string) => {
      setCart((prev) => prev.filter((c) => !(c.productId === productId && c.weight === weight)));
      toast("Removed from cart");
    },
    [setCart, toast],
  );

  const clearCart = useCallback(() => setCart([]), [setCart]);

  const toggleWishlist = useCallback(
    (slug: string) => {
      setWishlist((prev) => {
        const has = prev.includes(slug);
        toast(has ? "Removed from wishlist" : "Saved to wishlist");
        return has ? prev.filter((s) => s !== slug) : [...prev, slug];
      });
    },
    [setWishlist, toast],
  );

  const removeWishlist = useCallback(
    (slug: string) => setWishlist((prev) => prev.filter((s) => s !== slug)),
    [setWishlist],
  );

  const login = useCallback(
    (email: string, password: string) => {
      const ok = email.trim().toLowerCase() === "admin@a-1dryfruits.com" && password === "admin123";
      if (ok) setIsAdmin(true);
      return ok;
    },
    [setIsAdmin],
  );

  const logout = useCallback(() => setIsAdmin(false), [setIsAdmin]);

  const placeOrder = useCallback(
    (o: PlacedOrder) => {
      setLastOrder(o);
      setOrderList((prev) => [
        {
          id: o.id,
          customer: o.name,
          email: o.email,
          phone: o.phone,
          date: o.placedAt,
          items: o.items.reduce((s, i) => s + i.qty, 0),
          amount: o.total,
          payment: o.payment,
          status: "Pending" as const,
        },
        ...prev,
      ]);
      setCart([]);
    },
    [setLastOrder, setOrderList, setCart],
  );

  const cartCount = cart.reduce((s, i) => s + i.qty, 0);
  const cartSubtotal = cart.reduce((s, i) => s + i.price * i.qty, 0);

  const value = useMemo<StoreValue>(
    () => ({
      products,
      setProducts,
      categoryList,
      setCategoryList,
      bannerList,
      setBannerList,
      couponList,
      setCouponList,
      reviewList,
      setReviewList,
      hamperList,
      setHamperList,
      orderList,
      setOrderList,
      customerList,
      setCustomerList,
      inquiryList,
      setInquiryList,
      settings,
      setSettings,
      cart,
      addToCart,
      updateQty,
      removeFromCart,
      clearCart,
      cartCount,
      cartSubtotal,
      wishlist,
      toggleWishlist,
      removeWishlist,
      isAdmin,
      login,
      logout,
      lastOrder,
      placeOrder,
      toasts,
      toast,
    }),
    [
      products,
      setProducts,
      categoryList,
      setCategoryList,
      bannerList,
      setBannerList,
      couponList,
      setCouponList,
      reviewList,
      setReviewList,
      hamperList,
      setHamperList,
      orderList,
      setOrderList,
      customerList,
      setCustomerList,
      inquiryList,
      setInquiryList,
      settings,
      setSettings,
      cart,
      addToCart,
      updateQty,
      removeFromCart,
      clearCart,
      cartCount,
      cartSubtotal,
      wishlist,
      toggleWishlist,
      removeWishlist,
      isAdmin,
      login,
      logout,
      lastOrder,
      placeOrder,
      toasts,
      toast,
    ],
  );

  return <StoreContext.Provider value={value}>{children}</StoreContext.Provider>;
}

export function useStore() {
  const ctx = useContext(StoreContext);
  if (!ctx) throw new Error("useStore must be used inside StoreProvider");
  return ctx;
}

export const inr = (n: number) => `₹${n.toLocaleString("en-IN")}`;
