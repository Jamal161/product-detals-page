import { useState, useEffect } from 'react';
import { CartItem, CartState, Product, ProductVariation } from '../types';

const CART_STORAGE_KEY = 'falcon_cart';

export const useCart = () => {
  const [cart, setCart] = useState<CartState>({
    items: [],
    total: 0,
    subtotal: 0,
    discount: 0,
  });

  // Load cart from localStorage on mount
  useEffect(() => {
    const savedCart = localStorage.getItem(CART_STORAGE_KEY);
    if (savedCart) {
      try {
        const parsedCart = JSON.parse(savedCart);
        setCart(parsedCart);
      } catch (error) {
        console.error('Error loading cart from localStorage:', error);
      }
    }
  }, []);

  // Save cart to localStorage whenever cart changes
  useEffect(() => {
    localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cart));
  }, [cart]);

  const calculateTotals = (items: CartItem[], discount = 0) => {
    const subtotal = items.reduce((sum, item) => {
      const price = item.selectedVariation?.price || item.product.price;
      return sum + (price * item.quantity);
    }, 0);
    
    const total = subtotal - discount;
    
    return { subtotal, total };
  };

  const addToCart = (
    product: Product, 
    quantity: number = 1, 
    selectedVariation?: ProductVariation,
    color?: string,
    size?: string
  ) => {
    setCart(prevCart => {
      const existingItemIndex = prevCart.items.findIndex(item => 
        item.product.id === product.id && 
        item.selectedVariation?.id === selectedVariation?.id &&
        item.color === color &&
        item.size === size
      );

      let newItems: CartItem[];

      if (existingItemIndex >= 0) {
        // Update existing item
        newItems = [...prevCart.items];
        newItems[existingItemIndex] = {
          ...newItems[existingItemIndex],
          quantity: newItems[existingItemIndex].quantity + quantity
        };
      } else {
        // Add new item
        const newItem: CartItem = {
          id: `${product.id}-${selectedVariation?.id || 'default'}-${color || ''}-${size || ''}`,
          product,
          quantity,
          selectedVariation,
          color,
          size
        };
        newItems = [...prevCart.items, newItem];
      }

      const { subtotal, total } = calculateTotals(newItems, prevCart.discount);

      return {
        ...prevCart,
        items: newItems,
        subtotal,
        total
      };
    });
  };

  const updateQuantity = (itemId: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(itemId);
      return;
    }

    setCart(prevCart => {
      const newItems = prevCart.items.map(item =>
        item.id === itemId ? { ...item, quantity } : item
      );

      const { subtotal, total } = calculateTotals(newItems, prevCart.discount);

      return {
        ...prevCart,
        items: newItems,
        subtotal,
        total
      };
    });
  };

  const removeFromCart = (itemId: string) => {
    setCart(prevCart => {
      const newItems = prevCart.items.filter(item => item.id !== itemId);
      const { subtotal, total } = calculateTotals(newItems, prevCart.discount);

      return {
        ...prevCart,
        items: newItems,
        subtotal,
        total
      };
    });
  };

  const applyCoupon = (couponCode: string, discountAmount: number) => {
    setCart(prevCart => {
      const { subtotal } = calculateTotals(prevCart.items);
      const total = subtotal - discountAmount;

      return {
        ...prevCart,
        discount: discountAmount,
        couponCode,
        total
      };
    });
  };

  const clearCart = () => {
    setCart({
      items: [],
      total: 0,
      subtotal: 0,
      discount: 0,
    });
  };

  const getCartItemsCount = () => {
    return cart.items.reduce((sum, item) => sum + item.quantity, 0);
  };

  return {
    cart,
    addToCart,
    updateQuantity,
    removeFromCart,
    applyCoupon,
    clearCart,
    getCartItemsCount
  };
};