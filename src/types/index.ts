export interface Category {
  id: string;
  name: string;
  slug: string;
  description?: string;
  image?: string;
}

export interface ProductVariation {
  id: string;
  color?: string;
  size?: string;
  price: number;
  stock: number;
  sku?: string;
}

export interface Product {
  id: string;
  name: string;
  slug: string;
  description: string;
  specification?: string;
  price: number;
  originalPrice?: number;
  discount?: number;
  rating: number;
  reviewCount: number;
  images: string[];
  category: Category;
  variations?: ProductVariation[];
  inStock: boolean;
  brand?: string;
  tags?: string[];
}

export interface CartItem {
  id: string;
  product: Product;
  quantity: number;
  selectedVariation?: ProductVariation;
  color?: string;
  size?: string;
}

export interface CartState {
  items: CartItem[];
  total: number;
  subtotal: number;
  discount: number;
  couponCode?: string;
}