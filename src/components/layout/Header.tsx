import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { useCartContext } from "../../context/CartContext";
import { apiService } from "../../services/api";
import { Category } from "../../types";

export const Header = (): JSX.Element => {
  const { getCartItemsCount } = useCartContext();
  const cartItemsCount = getCartItemsCount();
  const [categories, setCategories] = useState<Category[]>([]);

  // Fetch categories on component mount
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const categoriesData = await apiService.getCategories();
        setCategories(categoriesData.slice(0, 5)); // Show only first 5 categories
      } catch (error) {
        console.error('Error fetching categories:', error);
        // Use fallback categories
        setCategories([
          { id: '1', name: 'Electronics', slug: 'electronics' },
          { id: '2', name: 'Home Appliances', slug: 'home-appliances' },
          { id: '3', name: 'Mother & Baby', slug: 'mother-baby' },
          { id: '4', name: 'Automotive', slug: 'automotive' },
          { id: '5', name: 'Sports Gear', slug: 'sports-gear' },
        ]);
      }
    };

    fetchCategories();
  }, []);

  // Utility navigation items
  const utilityItems = [
    { 
      icon: (
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M21 10C21 17 12 23 12 23S3 17 3 10C3 7.61305 3.94821 5.32387 5.63604 3.63604C7.32387 1.94821 9.61305 1 12 1C14.3869 1 16.6761 1.94821 18.3639 3.63604C20.0518 5.32387 21 7.61305 21 10Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          <circle cx="12" cy="10" r="3" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      ), 
      text: "TRACK ORDER" 
    },
    { 
      icon: (
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2"/>
          <path d="M9.09 9C9.3251 8.33167 9.78915 7.76811 10.4 7.40913C11.0108 7.05016 11.7289 6.91894 12.4272 7.03871C13.1255 7.15849 13.7588 7.52152 14.2151 8.06353C14.6713 8.60553 14.9211 9.29152 14.92 10C14.92 12 11.92 13 11.92 13" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M12 17H12.01" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      ), 
      text: "HELP CENTER" 
    },
    { 
      icon: (
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="9" cy="21" r="1" stroke="currentColor" strokeWidth="2"/>
          <circle cx="20" cy="21" r="1" stroke="currentColor" strokeWidth="2"/>
          <path d="M1 1H5L7.68 14.39C7.77144 14.8504 8.02191 15.264 8.38755 15.5583C8.75318 15.8526 9.2107 16.009 9.68 16H19.4C19.8693 16.009 20.3268 15.8526 20.6925 15.5583C21.0581 15.264 21.3086 14.8504 21.4 14.39L23 6H6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      ), 
      text: "SELL WITH US" 
    },
  ];

  return (
    <header className="w-full fixed top-0 z-50 bg-white shadow-md">
      {/* Top navigation bar */}
      <nav className="w-full h-20 bg-foundationneutral-900">
        <div className="container flex items-center justify-between h-full max-w-[1280px] mx-auto px-5">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2">
            <div className="w-8 h-8 bg-foundationprimaryprimary-500-main rounded-full flex items-center justify-center">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 2L2 7L12 12L22 7L12 2Z" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M2 17L12 22L22 17" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M2 12L12 17L22 12" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
            <div className="[font-family:'Onest',Helvetica] font-bold text-white text-2xl leading-6">
              FALCON
            </div>
          </Link>

          {/* Search bar */}
          <div className="relative w-full max-w-[765px]">
            <div className="flex h-12 w-full">
              <Input
                className="h-12 rounded-r-none font-body-lg-regular text-foundationneutral-600 border-r-0"
                placeholder="Search for anything...."
              />
              <Button
                className="h-12 w-12 rounded-l-none bg-foundationprimaryprimary-500-main hover:bg-foundation-primaryprimary-600"
                size="icon"
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <circle cx="11" cy="11" r="8" stroke="white" strokeWidth="2"/>
                  <path d="m21 21-4.35-4.35" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </Button>
            </div>
          </div>

          {/* User controls */}
          <div className="flex items-center gap-5">
            {/* Cart */}
            <Link to="/cart" className="flex items-center gap-2 relative">
              <div className="relative w-8 h-8">
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M9 22C9.55228 22 10 21.5523 10 21C10 20.4477 9.55228 20 9 20C8.44772 20 8 20.4477 8 21C8 21.5523 8.44772 22 9 22Z" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M20 22C20.5523 22 21 21.5523 21 21C21 20.4477 20.5523 20 20 20C19.4477 20 19 20.4477 19 21C19 21.5523 19.4477 22 20 22Z" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M1 1H5L7.68 14.39C7.77144 14.8504 8.02191 15.264 8.38755 15.5583C8.75318 15.8526 9.2107 16.009 9.68 16H19.4C19.8693 16.009 20.3268 15.8526 20.6925 15.5583C21.0581 15.264 21.3086 14.8504 21.4 14.39L23 6H6" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                {cartItemsCount > 0 && (
                  <Badge className="absolute -top-2 -right-2 bg-foundationerror500-main hover:bg-foundationerror500-main min-w-[20px] h-5 flex items-center justify-center p-0">
                    <span className="text-xs font-medium">{cartItemsCount}</span>
                  </Badge>
                )}
              </div>
            </Link>

            {/* User icon */}
            <div className="flex items-center gap-2">
              <div className="relative w-8 h-8">
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M20 21V19C20 17.9391 19.5786 16.9217 18.8284 16.1716C18.0783 15.4214 17.0609 15 16 15H8C6.93913 15 5.92172 15.4214 5.17157 16.1716C4.42143 16.9217 4 17.9391 4 19V21" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <circle cx="12" cy="7" r="4" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
            </div>
          </div>
        </div>
      </nav>

      {/* Secondary navigation bar */}
      <nav className="w-full h-10 bg-white shadow-shadow-light-md">
        <div className="container flex items-center justify-between h-full max-w-[1280px] mx-auto px-5">
          <div className="flex items-center gap-6">
            {/* Categories dropdown */}
            <div className="flex items-center gap-2 pr-6 border-r border-slate-200 h-6">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <line x1="3" y1="6" x2="21" y2="6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <line x1="3" y1="12" x2="21" y2="12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <line x1="3" y1="18" x2="21" y2="18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              <span className="[font-family:'Onest',Helvetica] font-medium text-foundationneutral-900 text-base leading-6">
                Categories
              </span>
            </div>

            {/* Category links */}
            <div className="flex items-center gap-8">
              {categories.map((category, index) => (
                <button
                  key={index}
                  className="font-body-md-regular text-foundationneutral-900 hover:text-foundationprimaryprimary-500-main transition-colors"
                >
                  {category.name}
                </button>
              ))}
            </div>
          </div>

          {/* Utility links */}
          <div className="flex items-center gap-6">
            {utilityItems.map((item, index) => (
              <button key={index} className="flex items-center gap-2 hover:text-foundationprimaryprimary-500-main transition-colors">
                {item.icon}
                <span className="font-body-sm-medium text-foundationneutral-600">
                  {item.text}
                </span>
              </button>
            ))}
          </div>
        </div>
      </nav>
    </header>
  );
};