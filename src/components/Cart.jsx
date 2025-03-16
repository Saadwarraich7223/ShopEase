import React, { useState, useEffect } from "react";
import {
  Trash2,
  Plus,
  Minus,
  ArrowLeft,
  CreditCard,
  Truck,
  Shield,
} from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import {
  cartDecreaseQuantity,
  cartIncreaseQuantity,
  cartRemoveItem,
} from "../store/cartSlice";

const Cart = () => {
  const cartItems = useSelector((state) => state.cartItems.cart);
  const dispatch = useDispatch();

  const [orderSummary, setOrderSummary] = useState({
    subtotal: 0,
    shipping: 15.99,
    tax: 0,
    discount: 0,
    total: 0,
  });

  // Calculate order summary whenever cart items change
  useEffect(() => {
    const subtotal = cartItems.reduce(
      (sum, item) => sum + item.price * item.quantity,
      0
    );
    const tax = subtotal * 0.08; // 8% tax

    setOrderSummary({
      subtotal,
      shipping: cartItems.length > 0 ? 15.99 : 0,
      tax,
      total: subtotal + (cartItems.length > 0 ? 15.99 : 0) + tax,
    });
  }, [cartItems]);

  // Handle quantity changes
  const increaseQuantity = (id) => {
    dispatch(cartIncreaseQuantity(id));
  };
  const decreaseQuantity = (id) => {
    dispatch(cartDecreaseQuantity(id));
  };
  //Remove item from cart
  const removeItem = (id) => {
    dispatch(cartRemoveItem(id));
  };

  //Apply discount code (placeholder function)
  const [promoCode, setPromoCode] = useState("");
  const [promoApplied, setPromoApplied] = useState(false);

  const applyPromoCode = () => {
    if (promoCode.toUpperCase() === "SAVE20") {
      setPromoApplied(true);
      // Update the order summary with discount
      setOrderSummary({
        ...orderSummary,
        discount: orderSummary.subtotal * 0.2,
        total: orderSummary.total - orderSummary.subtotal * 0.2,
      });
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-indigo-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center mb-8">
          <button className="flex items-center text-indigo-600 hover:text-indigo-800 transition-colors">
            <ArrowLeft className="mr-2" size={20} />
            <Link to={"/products"}>
              <span className="font-medium">Continue Shopping</span>
            </Link>
          </button>
          <h1 className="text-3xl font-bold text-gray-800 ml-auto">
            Your Shopping Cart
          </h1>
        </div>

        {cartItems.length > 0 ? (
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Cart Items Section */}
            <div className="lg:w-2/3">
              <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
                <div className="px-6 py-4 border-b border-gray-200 bg-gray-50">
                  <div className="flex justify-between items-center text-gray-600">
                    <span className="font-medium">Product</span>
                    <div className="flex space-x-16 md:space-x-32">
                      <span className="font-medium">Quantity</span>
                      <span className="font-medium">Total</span>
                    </div>
                  </div>
                </div>

                <ul className="divide-y divide-gray-200">
                  {cartItems.map((item) => (
                    <li
                      key={item.id}
                      className="px-6 py-6 transition-all duration-300 hover:bg-indigo-50"
                    >
                      <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
                        {/* Product image and info */}
                        <div className="flex-shrink-0">
                          <img
                            src={item.image}
                            alt={item.title}
                            className="w-20 h-20 object-scale-down rounded-lg border border-gray-200"
                          />
                        </div>

                        <div className="flex-grow">
                          <h3 className="text-lg font-medium text-gray-800">
                            {item.title}
                          </h3>
                          <p className="text-gray-500 mt-1">
                            Unit price: ${item.price.toFixed(2)}
                          </p>
                        </div>

                        {/* Quantity controls */}
                        <div className="flex items-center">
                          <button
                            onClick={() => decreaseQuantity(item.id)}
                            className="p-1 rounded-full border border-gray-300 text-gray-600 hover:bg-gray-100 transition-colors"
                          >
                            <Minus size={16} />
                          </button>

                          <span className="mx-3 w-8 text-center font-medium">
                            {item.quantity}
                          </span>

                          <button
                            onClick={() => increaseQuantity(item.id)}
                            className="p-1 rounded-full border border-gray-300 text-gray-600 hover:bg-gray-100 transition-colors"
                          >
                            <Plus size={16} />
                          </button>
                        </div>

                        {/* Price and remove button */}
                        <div className="flex items-center space-x-4">
                          <span className="font-bold text-indigo-700 w-24 text-right">
                            ${(item.price * item.quantity).toFixed(2)}
                          </span>

                          <button
                            onClick={() => removeItem(item.id)}
                            className="p-2 text-red-500 hover:text-red-700 hover:bg-red-50 rounded-full transition-colors"
                          >
                            <Trash2 size={18} />
                          </button>
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Order Summary Section */}
            <div className="lg:w-1/3">
              <div className="bg-white rounded-2xl shadow-lg overflow-hidden divide-y divide-gray-200">
                <div className="px-6 py-4 bg-gray-50">
                  <h2 className="text-xl font-bold text-gray-800">
                    Order Summary
                  </h2>
                </div>

                <div className="p-6 space-y-4">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Subtotal</span>
                    <span className="font-medium">
                      ${orderSummary.subtotal.toFixed(2)}
                    </span>
                  </div>

                  <div className="flex justify-between">
                    <span className="text-gray-600">Shipping</span>
                    <span className="font-medium">
                      ${orderSummary.shipping.toFixed(2)}
                    </span>
                  </div>

                  <div className="flex justify-between">
                    <span className="text-gray-600">Tax (8%)</span>
                    <span className="font-medium">
                      ${orderSummary.tax.toFixed(2)}
                    </span>
                  </div>

                  {promoApplied && (
                    <div className="flex justify-between text-green-600">
                      <span>Discount (20%)</span>
                      <span className="font-medium">
                        -$
                        {orderSummary.discount
                          ? orderSummary.discount.toFixed(2)
                          : orderSummary.discount}
                      </span>
                    </div>
                  )}

                  <div className="h-px bg-gray-200 my-4"></div>

                  <div className="flex justify-between">
                    <span className="text-lg font-bold">Total</span>
                    <span className="text-lg font-bold text-indigo-700">
                      ${orderSummary.total.toFixed(2)}
                    </span>
                  </div>

                  {/* Promo code input */}
                  <div className="mt-6">
                    <label
                      htmlFor="promo"
                      className="block text-sm font-medium text-gray-700 mb-2"
                    >
                      Promo Code
                    </label>
                    <div className="flex">
                      <input
                        type="text"
                        id="promo"
                        placeholder="Enter code"
                        className="flex-grow min-w-2.5 rounded-l-lg border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 px-2 py-2 border"
                        value={promoCode}
                        onChange={(e) => setPromoCode(e.target.value)}
                        disabled={promoApplied}
                      />
                      <button
                        onClick={applyPromoCode}
                        disabled={promoApplied}
                        className={`px-4 py-2 font-medium rounded-r-lg ${
                          promoApplied
                            ? "bg-green-500 text-white"
                            : "bg-indigo-600 text-white hover:bg-indigo-700"
                        } transition-colors`}
                      >
                        {promoApplied ? "Applied" : "Apply"}
                      </button>
                    </div>
                    {promoApplied && (
                      <p className="text-sm text-green-600 mt-1">
                        Promo code SAVE20 applied successfully!
                      </p>
                    )}
                  </div>
                </div>

                {/* Checkout button */}
                <div className="p-6">
                  <button className="w-full bg-indigo-600 text-white py-3 px-4 rounded-lg font-medium hover:bg-indigo-700 transition-colors transform hover:scale-[1.02] duration-300 flex items-center justify-center">
                    <CreditCard className="mr-2" size={20} />
                    Proceed to Checkout
                  </button>

                  {/* Trust badges */}
                  <div className="mt-6 flex justify-between">
                    <div className="flex items-center text-gray-500 text-sm">
                      <Shield className="mr-1" size={16} />
                      <span>Secure Payment</span>
                    </div>
                    <div className="flex items-center text-gray-500 text-sm">
                      <Truck className="mr-1" size={16} />
                      <span>Free Shipping over $100</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Recently viewed items teaser */}
              <div className="mt-8 bg-white rounded-2xl shadow-lg p-6">
                <h3 className="text-lg font-medium text-gray-800 mb-4">
                  You might also like
                </h3>
                <div className="flex space-x-4 overflow-x-auto pb-4">
                  {[1, 2, 3].map((num) => (
                    <div key={num} className="flex-shrink-0 w-36">
                      <img
                        src={`/api/placeholder/150/150`}
                        alt={`Suggestion ${num}`}
                        className="w-full h-36 object-cover rounded-lg mb-2"
                      />
                      <p className="text-sm font-medium text-gray-800 truncate">
                        Suggested Product {num}
                      </p>
                      <p className="text-sm text-indigo-600 font-medium">
                        $99.99
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="bg-white rounded-2xl shadow-lg p-12 text-center">
            <div className="w-24 h-24 bg-indigo-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-12 w-12 text-indigo-600"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path d="M3 1a1 1 0 000 2h1.22l.305 1.222a.997.997 0 00.01.042l1.358 5.43-.893.892C3.74 11.846 4.632 14 6.414 14H15a1 1 0 000-2H6.414l1-1H14a1 1 0 00.894-.553l3-6A1 1 0 0017 3H6.28l-.31-1.243A1 1 0 005 1H3z" />
              </svg>
            </div>
            <h2 className="text-2xl font-bold text-gray-800 mb-4">
              Your cart is empty
            </h2>
            <p className="text-gray-600 mb-8">
              Looks like you haven't added any products to your cart yet.
            </p>
            <Link to={"/products"}>
              <button className="bg-indigo-600 cursor-pointer text-white py-3 px-8 rounded-lg font-medium hover:bg-indigo-700 transition-colors">
                Start Shopping
              </button>
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default Cart;
