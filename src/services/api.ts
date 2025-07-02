import axios from 'axios';
import { Category, Product } from '../types';

const API_BASE_URL = '/api/v1';

const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add request interceptor for debugging
api.interceptors.request.use(
  (config) => {
    console.log('API Request:', config.method?.toUpperCase(), config.url);
    return config;
  },
  (error) => {
    console.error('API Request Error:', error);
    return Promise.reject(error);
  }
);

// Add response interceptor for debugging
api.interceptors.response.use(
  (response) => {
    console.log('API Response:', response.status, response.config.url);
    return response;
  },
  (error) => {
    console.error('API Response Error:', error.response?.status, error.response?.data);
    return Promise.reject(error);
  }
);

export const apiService = {
  // Get all categories
  getCategories: async (): Promise<Category[]> => {
    try {
      const response = await api.get('/categories');
      console.log('Categories data:', response.data);
      return response.data;
    } catch (error) {
      console.error('Error fetching categories:', error);
      // Return mock data as fallback
      return [
        { id: '1', name: 'Electronics', slug: 'electronics' },
        { id: '2', name: 'Home Appliances', slug: 'home-appliances' },
        { id: '3', name: 'Mother & Baby', slug: 'mother-baby' },
        { id: '4', name: 'Automotive', slug: 'automotive' },
        { id: '5', name: 'Sports Gear', slug: 'sports-gear' },
      ];
    }
  },

  // Get all products
  getProducts: async (): Promise<Product[]> => {
    try {
      const response = await api.get('/shop/products');
      console.log('Products data:', response.data);
      return response.data;
    } catch (error) {
      console.error('Error fetching products:', error);
      throw error;
    }
  },

  // Get single product by slug
  getProduct: async (slug: string): Promise<Product> => {
    try {
      const response = await api.get(`/product/${slug}`);
      console.log('Product data:', response.data);
      return response.data;
    } catch (error) {
      console.error('Error fetching product:', error);
      
      // Return mock data as fallback for development
      const mockProduct: Product = {
        id: '1',
        name: 'iPhone 15 Plus',
        slug: 'iphone-15-plus',
        description: 'The iPhone 15 Plus features a stunning 6.7-inch Super Retina XDR display, advanced dual-camera system, and the powerful A16 Bionic chip. Experience incredible performance, all-day battery life, and innovative features that make every day extraordinary.',
        specification: 'Display: 6.7-inch Super Retina XDR OLED\nProcessor: A16 Bionic chip\nStorage: 128GB, 256GB, 512GB\nCamera: 48MP Main + 12MP Ultra Wide\nBattery: All-day battery life\nConnectivity: 5G, Wi-Fi 6, Bluetooth 5.3\nOperating System: iOS 17',
        price: 89999,
        originalPrice: 99999,
        rating: 4.5,
        reviewCount: 1250,
        images: [
          'https://images.pexels.com/photos/404280/pexels-photo-404280.jpeg?auto=compress&cs=tinysrgb&w=400&h=400',
          'https://images.pexels.com/photos/47261/pexels-photo-47261.jpeg?auto=compress&cs=tinysrgb&w=400&h=400',
          'https://images.pexels.com/photos/699122/pexels-photo-699122.jpeg?auto=compress&cs=tinysrgb&w=400&h=400',
          'https://images.pexels.com/photos/1092644/pexels-photo-1092644.jpeg?auto=compress&cs=tinysrgb&w=400&h=400',
        ],
        category: {
          id: '1',
          name: 'Electronics',
          slug: 'electronics'
        },
        variations: [
          {
            id: 'v1',
            color: 'Blue',
            size: '128GB',
            price: 89999,
            stock: 10,
            sku: 'IP15P-BL-128'
          },
          {
            id: 'v2',
            color: 'Blue',
            size: '256GB',
            price: 99999,
            stock: 8,
            sku: 'IP15P-BL-256'
          },
          {
            id: 'v3',
            color: 'Pink',
            size: '128GB',
            price: 89999,
            stock: 5,
            sku: 'IP15P-PK-128'
          },
          {
            id: 'v4',
            color: 'Pink',
            size: '256GB',
            price: 99999,
            stock: 3,
            sku: 'IP15P-PK-256'
          },
          {
            id: 'v5',
            color: 'Black',
            size: '128GB',
            price: 89999,
            stock: 12,
            sku: 'IP15P-BK-128'
          },
          {
            id: 'v6',
            color: 'Black',
            size: '256GB',
            price: 99999,
            stock: 7,
            sku: 'IP15P-BK-256'
          }
        ],
        inStock: true,
        brand: 'Apple',
        tags: ['smartphone', 'apple', 'iphone', '5g']
      };
      
      return mockProduct;
    }
  },
};