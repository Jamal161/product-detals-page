import { ChevronRightIcon, StarIcon, MinusIcon, PlusIcon, HeartIcon, ShareIcon } from "lucide-react";
import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import Swal from 'sweetalert2';
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "../components/ui/breadcrumb";
import { Badge } from "../components/ui/badge";
import { Button } from "../components/ui/button";
import { Card, CardContent } from "../components/ui/card";
import { useCartContext } from "../context/CartContext";
import { apiService } from "../services/api";
import { Product, Category } from "../types";

export const ProductDetailsPage = (): JSX.Element => {
  const { slug } = useParams<{ slug: string }>();
  const { addToCart } = useCartContext();
  
  const [product, setProduct] = useState<Product | null>(null);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [selectedColor, setSelectedColor] = useState<string>("");
  const [selectedSize, setSelectedSize] = useState<string>("");
  const [quantity, setQuantity] = useState(1);
  const [showFullDescription, setShowFullDescription] = useState(false);
  const [showFullSpecification, setShowFullSpecification] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        setError(null);
        
        const productSlug = slug || 'iphone-15-plus';
        
        const [productData, categoriesData] = await Promise.all([
          apiService.getProduct(productSlug),
          apiService.getCategories()
        ]);
        
        setProduct(productData);
        setCategories(categoriesData);
        
        if (productData.variations && productData.variations.length > 0) {
          const firstVariation = productData.variations[0];
          if (firstVariation.color) setSelectedColor(firstVariation.color);
          if (firstVariation.size) setSelectedSize(firstVariation.size);
        }
      } catch (err) {
        setError('Failed to load product details');
        console.error('Error fetching product:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [slug]);

  const handleAddToCart = () => {
    if (!product) return;

    const selectedVariation = product.variations?.find(v => 
      v.color === selectedColor && v.size === selectedSize
    );

    addToCart(product, quantity, selectedVariation, selectedColor, selectedSize);
    
    // Show SweetAlert success message
    Swal.fire({
      title: 'Added to Cart!',
      html: `
        <div class="text-center">
          <div class="mb-3">
            <strong>${quantity} × ${product.name}</strong>
          </div>
          ${selectedColor ? `<div class="text-sm text-gray-600">Color: ${selectedColor}</div>` : ''}
          ${selectedSize ? `<div class="text-sm text-gray-600">Size: ${selectedSize}</div>` : ''}
        </div>
      `,
      icon: 'success',
      showCancelButton: true,
      confirmButtonText: 'View Cart',
      cancelButtonText: 'Continue Shopping',
      confirmButtonColor: '#00b795',
      cancelButtonColor: '#6b7280',
      customClass: {
        popup: 'rounded-xl',
        confirmButton: 'rounded-lg px-6 py-2',
        cancelButton: 'rounded-lg px-6 py-2'
      }
    }).then((result) => {
      if (result.isConfirmed) {
        // Navigate to cart page
        window.location.href = '/cart';
      }
    });
  };

  const incrementQuantity = () => setQuantity(prev => prev + 1);
  const decrementQuantity = () => setQuantity(prev => Math.max(1, prev - 1));

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-foundationprimaryprimary-500-main mx-auto"></div>
          <p className="mt-4 text-foundationneutral-600">Loading product details...</p>
        </div>
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <div className="text-center">
          <p className="text-red-500 text-xl mb-4">{error || 'Product not found'}</p>
          <Link to="/" className="text-foundationprimaryprimary-500-main hover:underline">
            Return to Home
          </Link>
        </div>
      </div>
    );
  }

  const availableColors = [...new Set(product.variations?.map(v => v.color).filter(Boolean))];
  const availableSizes = [...new Set(product.variations?.map(v => v.size).filter(Boolean))];

  const selectedVariation = product.variations?.find(v => 
    v.color === selectedColor && v.size === selectedSize
  );
  const currentPrice = selectedVariation?.price || product.price;

  const breadcrumbItems = [
    { label: "Home", href: "/", active: false },
    { label: product.category?.name || "Products", href: "#", active: false },
    { label: product.name, href: "#", active: true },
  ];

  return (
    <div className="bg-white min-h-screen">
      {/* Breadcrumb */}
      <div className="max-w-[1280px] mx-auto px-5 pt-6">
        <Breadcrumb>
          <BreadcrumbList>
            {breadcrumbItems.map((item, index) => (
              <React.Fragment key={`breadcrumb-${index}`}>
                <BreadcrumbItem>
                  <BreadcrumbLink
                    href={item.href}
                    className={`text-sm ${item.active ? "text-foundationneutral-600" : "text-foundationneutral-900 hover:text-foundationprimaryprimary-500-main"}`}
                  >
                    {item.label}
                  </BreadcrumbLink>
                </BreadcrumbItem>
                {index < breadcrumbItems.length - 1 && (
                  <BreadcrumbSeparator>
                    <ChevronRightIcon className="w-4 h-4" />
                  </BreadcrumbSeparator>
                )}
              </React.Fragment>
            ))}
          </BreadcrumbList>
        </Breadcrumb>
      </div>

      {/* Main Product Section */}
      <div className="max-w-[1280px] mx-auto px-5 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Product Images - Left Column */}
          <div className="lg:col-span-5">
            <div className="space-y-4">
              {/* Main Image */}
              <div className="aspect-square bg-foundationneutral-100 rounded-lg overflow-hidden">
                <img
                  src={product.images[selectedImageIndex] || "https://images.pexels.com/photos/404280/pexels-photo-404280.jpeg?auto=compress&cs=tinysrgb&w=500&h=500"}
                  alt="Product main image"
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Thumbnail Images */}
              <div className="flex gap-3 overflow-x-auto">
                {product.images.map((image, index) => (
                  <button
                    key={`thumbnail-${index}`}
                    onClick={() => setSelectedImageIndex(index)}
                    className={`flex-shrink-0 w-20 h-20 rounded-lg overflow-hidden border-2 transition-colors ${
                      selectedImageIndex === index 
                        ? 'border-foundationprimaryprimary-500-main' 
                        : 'border-foundationneutral-200 hover:border-foundationneutral-300'
                    }`}
                  >
                    <img
                      src={image || "https://images.pexels.com/photos/404280/pexels-photo-404280.jpeg?auto=compress&cs=tinysrgb&w=80&h=80"}
                      alt={`Product thumbnail ${index + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Product Details - Middle Column */}
          <div className="lg:col-span-4">
            <div className="space-y-6">
              {/* Product Title & Rating */}
              <div className="space-y-3">
                <h1 className="text-2xl font-semibold text-foundationneutral-900 leading-8">
                  {product.name}
                </h1>

                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-2">
                    <span className="text-sm text-foundationneutral-600">{product.rating}</span>
                    <div className="flex items-center gap-1">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <StarIcon
                          key={`star-${star}`}
                          className={`w-4 h-4 ${
                            star <= Math.floor(product.rating)
                              ? "text-yellow-400 fill-yellow-400"
                              : "text-foundationneutral-300"
                          }`}
                        />
                      ))}
                    </div>
                    <span className="text-sm text-foundationneutral-600">({product.reviewCount})</span>
                  </div>

                  <div className="flex items-center gap-2">
                    <Button variant="ghost" size="icon" className="w-8 h-8 hover:bg-red-50 hover:text-red-500">
                      <HeartIcon className="w-5 h-5" />
                    </Button>
                    <Button variant="ghost" size="icon" className="w-8 h-8 hover:bg-blue-50 hover:text-blue-500">
                      <ShareIcon className="w-5 h-5" />
                    </Button>
                  </div>
                </div>
              </div>

              {/* Price */}
              <div className="flex items-center gap-3">
                <span className="text-3xl font-bold text-foundationprimaryprimary-500-main">
                  ৳{currentPrice.toLocaleString()}
                </span>
                {product.originalPrice && product.originalPrice > currentPrice && (
                  <>
                    <span className="text-lg text-foundationneutral-400 line-through">
                      ৳{product.originalPrice.toLocaleString()}
                    </span>
                    <Badge className="bg-red-100 text-red-600 hover:bg-red-100 text-xs px-2 py-1">
                      {Math.round(((product.originalPrice - currentPrice) / product.originalPrice) * 100)}% OFF
                    </Badge>
                  </>
                )}
              </div>

              {/* Color Selection */}
              {availableColors.length > 0 && (
                <div className="space-y-3">
                  <div className="text-base font-medium text-foundationneutral-900">
                    Available Color: <span className="text-foundationprimaryprimary-500-main">{selectedColor}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    {availableColors.map((color, index) => (
                      <button
                        key={`color-${index}`}
                        onClick={() => setSelectedColor(color)}
                        className={`w-12 h-12 rounded-lg border-2 transition-all duration-200 flex items-center justify-center text-xs font-medium ${
                          selectedColor === color
                            ? "border-foundationprimaryprimary-500-main bg-foundationprimaryprimary-500-main text-white"
                            : "border-foundationneutral-300 bg-white text-foundationneutral-700 hover:border-foundationprimaryprimary-500-main"
                        }`}
                      >
                        {color}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Size Selection */}
              {availableSizes.length > 0 && (
                <div className="space-y-3">
                  <div className="text-base font-medium text-foundationneutral-900">
                    Select Size: <span className="text-foundationprimaryprimary-500-main">{selectedSize}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    {availableSizes.map((size, index) => (
                      <button
                        key={`size-${index}`}
                        onClick={() => setSelectedSize(size)}
                        className={`px-4 py-2 rounded-lg border-2 transition-all duration-200 text-sm font-medium ${
                          selectedSize === size
                            ? "border-foundationprimaryprimary-500-main bg-foundationprimaryprimary-500-main text-white"
                            : "border-foundationneutral-300 bg-white text-foundationneutral-700 hover:border-foundationprimaryprimary-500-main"
                        }`}
                      >
                        {size}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Quantity */}
              <div className="space-y-3">
                <label className="text-base font-medium text-foundationneutral-900">
                  Quantity
                </label>
                <div className="flex items-center w-32">
                  <button
                    onClick={decrementQuantity}
                    className="w-10 h-10 rounded-l-lg border border-foundationneutral-300 bg-foundationneutral-100 hover:bg-foundationneutral-200 flex items-center justify-center transition-colors"
                  >
                    <MinusIcon className="w-4 h-4" />
                  </button>
                  <div className="w-12 h-10 border-t border-b border-foundationneutral-300 bg-white flex items-center justify-center text-base font-medium">
                    {quantity}
                  </div>
                  <button
                    onClick={incrementQuantity}
                    className="w-10 h-10 rounded-r-lg border border-foundationneutral-300 bg-foundationneutral-100 hover:bg-foundationneutral-200 flex items-center justify-center transition-colors"
                  >
                    <PlusIcon className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Add to Cart Button */}
              <Button 
                onClick={handleAddToCart}
                className="w-full h-12 bg-foundationprimaryprimary-500-main hover:bg-foundation-primaryprimary-600 text-white font-medium text-base rounded-lg transition-colors"
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="mr-2">
                  <path d="M9 22C9.55228 22 10 21.5523 10 21C10 20.4477 9.55228 20 9 20C8.44772 20 8 20.4477 8 21C8 21.5523 8.44772 22 9 22Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M20 22C20.5523 22 21 21.5523 21 21C21 20.4477 20.5523 20 20 20C19.4477 20 19 20.4477 19 21C19 21.5523 19.4477 22 20 22Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M1 1H5L7.68 14.39C7.77144 14.8504 8.02191 15.264 8.38755 15.5583C8.75318 15.8526 9.2107 16.009 9.68 16H19.4C19.8693 16.009 20.3268 15.8526 20.6925 15.5583C21.0581 15.264 21.3086 14.8504 21.4 14.39L23 6H6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                Add to Cart
              </Button>
            </div>
          </div>

          {/* Delivery Info - Right Column */}
          <div className="lg:col-span-3">
            <Card className="border border-foundationneutral-200 rounded-xl">
              <CardContent className="p-6">
                <h3 className="text-lg font-semibold text-foundationneutral-900 mb-4">
                  Delivery Options
                </h3>
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 bg-foundationprimaryprimary-500-main rounded-full flex items-center justify-center flex-shrink-0">
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M1 3H3L3.4 5M7 13H17L21 5H5.4M7 13L5.4 5M7 13L4.7 15.3C4.3 15.7 4.6 16.5 5.1 16.5H17M17 13V16.5M9 19.5C9.8 19.5 10.5 20.2 10.5 21S9.8 22.5 9 22.5 7.5 21.8 7.5 21 8.2 19.5 9 19.5ZM20 19.5C20.8 19.5 21.5 20.2 21.5 21S20.8 22.5 20 22.5 18.5 21.8 18.5 21 19.2 19.5 20 19.5Z" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </div>
                    <div className="flex-1">
                      <h4 className="font-medium text-foundationneutral-900 text-sm mb-1">
                        Regular Delivery
                      </h4>
                      <p className="text-xs text-foundationneutral-600 mb-1">
                        Delivery within 2-3 days
                      </p>
                      <p className="text-sm font-semibold text-green-600">
                        FREE
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 bg-yellow-500 rounded-full flex items-center justify-center flex-shrink-0">
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M13 2L3 14H12L11 22L21 10H12L13 2Z" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </div>
                    <div className="flex-1">
                      <h4 className="font-medium text-foundationneutral-900 text-sm mb-1">
                        Express Delivery
                      </h4>
                      <p className="text-xs text-foundationneutral-600 mb-1">
                        Delivery within 24 hours
                      </p>
                      <p className="text-sm font-semibold text-foundationneutral-900">
                        ৳50
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Description Section */}
        <Card className="mt-12 border border-foundationneutral-200 rounded-xl">
          <CardContent className="p-8">
            <h2 className="text-2xl font-semibold text-foundationneutral-900 mb-6">
              Description
            </h2>
            <div className="relative">
              <div className={`text-foundationneutral-600 text-base leading-7 ${!showFullDescription ? 'line-clamp-4' : ''}`}>
                {product.description}
              </div>
              {!showFullDescription && (
                <div className="absolute bottom-0 left-0 right-0 h-12 bg-gradient-to-t from-white to-transparent" />
              )}
            </div>
            <div className="flex justify-center mt-6">
              <Button
                variant="ghost"
                onClick={() => setShowFullDescription(!showFullDescription)}
                className="flex items-center gap-2 text-foundationprimaryprimary-500-main hover:text-foundation-primaryprimary-600 font-medium"
              >
                {showFullDescription ? 'See Less' : 'See More'}
                <ChevronRightIcon className={`w-4 h-4 transform transition-transform ${showFullDescription ? 'rotate-90' : ''}`} />
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Specification Section */}
        {product.specification && (
          <Card className="mt-6 border border-foundationneutral-200 rounded-xl">
            <CardContent className="p-8">
              <h2 className="text-2xl font-semibold text-foundationneutral-900 mb-6">
                Specification
              </h2>
              <div className="relative">
                <div className={`text-foundationneutral-600 text-base leading-7 whitespace-pre-line ${!showFullSpecification ? 'line-clamp-4' : ''}`}>
                  {product.specification}
                </div>
                {!showFullSpecification && (
                  <div className="absolute bottom-0 left-0 right-0 h-12 bg-gradient-to-t from-white to-transparent" />
                )}
              </div>
              <div className="flex justify-center mt-6">
                <Button
                  variant="ghost"
                  onClick={() => setShowFullSpecification(!showFullSpecification)}
                  className="flex items-center gap-2 text-foundationprimaryprimary-500-main hover:text-foundation-primaryprimary-600 font-medium"
                >
                  {showFullSpecification ? 'See Less' : 'See More'}
                  <ChevronRightIcon className={`w-4 h-4 transform transition-transform ${showFullSpecification ? 'rotate-90' : ''}`} />
                </Button>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};