import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { MinusIcon, PlusIcon, TrashIcon } from 'lucide-react';
import { Button } from '../components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Checkbox } from '../components/ui/checkbox';
import { Input } from '../components/ui/input';
import { useCartContext } from '../context/CartContext';

export const CartPage = (): JSX.Element => {
  const { cart, updateQuantity, removeFromCart, applyCoupon } = useCartContext();
  const [couponCode, setCouponCode] = useState('');
  const [agreedToTerms, setAgreedToTerms] = useState(false);

  const handleApplyCoupon = () => {
    if (couponCode.trim()) {
      const discountAmount = couponCode.toLowerCase() === 'save10' ? cart.subtotal * 0.1 : 0;
      applyCoupon(couponCode, discountAmount);
      setCouponCode('');
    }
  };

  const handleQuantityChange = (itemId: string, newQuantity: number) => {
    if (newQuantity > 0) {
      updateQuantity(itemId, newQuantity);
    }
  };

  if (cart.items.length === 0) {
    return (
      <div className="min-h-screen bg-white py-8">
        <div className="max-w-4xl mx-auto px-5">
          <div className="text-center py-16">
            <div className="w-24 h-24 mx-auto mb-6 bg-foundationneutral-100 rounded-full flex items-center justify-center">
              <svg width="40" height="40" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M9 22C9.55228 22 10 21.5523 10 21C10 20.4477 9.55228 20 9 20C8.44772 20 8 20.4477 8 21C8 21.5523 8.44772 22 9 22Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M20 22C20.5523 22 21 21.5523 21 21C21 20.4477 20.5523 20 20 20C19.4477 20 19 20.4477 19 21C19 21.5523 19.4477 22 20 22Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M1 1H5L7.68 14.39C7.77144 14.8504 8.02191 15.264 8.38755 15.5583C8.75318 15.8526 9.2107 16.009 9.68 16H19.4C19.8693 16.009 20.3268 15.8526 20.6925 15.5583C21.0581 15.264 21.3086 14.8504 21.4 14.39L23 6H6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
            <h1 className="text-3xl font-bold text-foundationneutral-900 mb-4">Your Cart is Empty</h1>
            <p className="text-foundationneutral-600 mb-8">Add some products to get started!</p>
            <Link to="/">
              <Button className="bg-foundationprimaryprimary-500-main hover:bg-foundation-primaryprimary-600 px-8 py-3">
                Continue Shopping
              </Button>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white py-8">
      <div className="max-w-7xl mx-auto px-5">
        <h1 className="text-3xl font-bold text-foundationneutral-900 mb-8">Shopping Cart</h1>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2">
            <Card className="border border-foundationneutral-200 rounded-xl">
              <CardHeader className="pb-4">
                <CardTitle className="text-xl font-semibold text-foundationneutral-900">
                  Cart Items ({cart.items.length})
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {cart.items.map((item) => (
                  <div key={item.id} className="flex items-center gap-4 p-4 border border-foundationneutral-200 rounded-lg">
                    {/* Product Image */}
                    <div className="w-20 h-20 flex-shrink-0 bg-foundationneutral-100 rounded-lg overflow-hidden">
                      <img
                        src={item.product.images[0] || 'https://images.pexels.com/photos/404280/pexels-photo-404280.jpeg?auto=compress&cs=tinysrgb&w=80&h=80'}
                        alt={item.product.name}
                        className="w-full h-full object-cover"
                      />
                    </div>

                    {/* Product Details */}
                    <div className="flex-1 min-w-0">
                      <h3 className="font-semibold text-foundationneutral-900 truncate text-base mb-1">
                        {item.product.name}
                      </h3>
                      
                      <div className="flex items-center gap-4 text-sm text-foundationneutral-600 mb-3">
                        {item.color && (
                          <span>Color: <span className="font-medium">{item.color}</span></span>
                        )}
                        {item.size && (
                          <span>Size: <span className="font-medium">{item.size}</span></span>
                        )}
                      </div>

                      <div className="flex items-center justify-between">
                        {/* Quantity Controls */}
                        <div className="flex items-center">
                          <button
                            onClick={() => handleQuantityChange(item.id, item.quantity - 1)}
                            className="w-8 h-8 rounded-l-lg border border-foundationneutral-300 bg-foundationneutral-100 hover:bg-foundationneutral-200 flex items-center justify-center transition-colors"
                          >
                            <MinusIcon className="w-4 h-4" />
                          </button>
                          
                          <div className="w-12 h-8 border-t border-b border-foundationneutral-300 bg-white flex items-center justify-center text-sm font-medium">
                            {item.quantity}
                          </div>
                          
                          <button
                            onClick={() => handleQuantityChange(item.id, item.quantity + 1)}
                            className="w-8 h-8 rounded-r-lg border border-foundationneutral-300 bg-foundationneutral-100 hover:bg-foundationneutral-200 flex items-center justify-center transition-colors"
                          >
                            <PlusIcon className="w-4 h-4" />
                          </button>
                        </div>

                        {/* Price */}
                        <div className="text-right">
                          <div className="font-bold text-foundationprimaryprimary-500-main text-lg">
                            ৳{((item.selectedVariation?.price || item.product.price) * item.quantity).toLocaleString()}
                          </div>
                          <div className="text-sm text-foundationneutral-600">
                            ৳{(item.selectedVariation?.price || item.product.price).toLocaleString()} each
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Remove Button */}
                    <Button
                      variant="ghost"
                      size="icon"
                      className="text-red-500 hover:text-red-700 hover:bg-red-50 w-8 h-8"
                      onClick={() => removeFromCart(item.id)}
                    >
                      <TrashIcon className="w-4 h-4" />
                    </Button>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <Card className="border border-foundationneutral-200 rounded-xl sticky top-4">
              <CardHeader className="pb-4">
                <CardTitle className="text-xl font-semibold text-foundationneutral-900">
                  Order Summary
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Coupon Code */}
                <div className="space-y-3">
                  <label className="text-sm font-medium text-foundationneutral-900">
                    Coupon Code
                  </label>
                  <div className="flex gap-2">
                    <Input
                      placeholder="Enter coupon code"
                      value={couponCode}
                      onChange={(e) => setCouponCode(e.target.value)}
                      className="flex-1 h-10 border-foundationneutral-300"
                    />
                    <Button
                      variant="outline"
                      onClick={handleApplyCoupon}
                      disabled={!couponCode.trim()}
                      className="px-4 h-10 border-foundationneutral-300"
                    >
                      Apply
                    </Button>
                  </div>
                  {cart.couponCode && (
                    <p className="text-sm text-green-600 font-medium">
                      Coupon "{cart.couponCode}" applied!
                    </p>
                  )}
                </div>

                {/* Price Breakdown */}
                <div className="space-y-3 pt-4 border-t border-foundationneutral-200">
                  <div className="flex justify-between text-foundationneutral-600">
                    <span>Subtotal</span>
                    <span className="font-medium">৳{cart.subtotal.toLocaleString()}</span>
                  </div>
                  
                  {cart.discount > 0 && (
                    <div className="flex justify-between text-green-600">
                      <span>Discount</span>
                      <span className="font-medium">-৳{cart.discount.toLocaleString()}</span>
                    </div>
                  )}
                  
                  <div className="flex justify-between text-foundationneutral-600">
                    <span>Shipping</span>
                    <span className="font-medium text-green-600">Free</span>
                  </div>
                  
                  <div className="flex justify-between font-bold text-xl pt-3 border-t border-foundationneutral-200">
                    <span className="text-foundationneutral-900">Total</span>
                    <span className="text-foundationprimaryprimary-500-main">
                      ৳{cart.total.toLocaleString()}
                    </span>
                  </div>
                </div>

                {/* Terms and Conditions */}
                <div className="flex items-start gap-3 pt-4">
                  <Checkbox
                    id="terms"
                    checked={agreedToTerms}
                    onCheckedChange={(checked) => setAgreedToTerms(checked as boolean)}
                    className="mt-1"
                  />
                  <label
                    htmlFor="terms"
                    className="text-sm text-foundationneutral-600 leading-relaxed cursor-pointer"
                  >
                    I agree to the{' '}
                    <Link to="/terms" className="text-foundationprimaryprimary-500-main hover:underline font-medium">
                      Terms & Conditions
                    </Link>{' '}
                    and{' '}
                    <Link to="/privacy" className="text-foundationprimaryprimary-500-main hover:underline font-medium">
                      Privacy Policy
                    </Link>
                  </label>
                </div>

                {/* Checkout Button */}
                <Button
                  className="w-full h-12 bg-foundationprimaryprimary-500-main hover:bg-foundation-primaryprimary-600 text-white font-semibold text-base rounded-lg"
                  disabled={!agreedToTerms}
                >
                  Proceed to Checkout
                </Button>

                {/* Continue Shopping */}
                <Link to="/">
                  <Button variant="outline" className="w-full h-12 border-foundationneutral-300 text-foundationneutral-700 font-medium rounded-lg">
                    Continue Shopping
                  </Button>
                </Link>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};