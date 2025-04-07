// src/pages/CheckoutPage.jsx
import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import {
  useStripe,
  useElements,
  CardNumberElement,
  CardExpiryElement,
  CardCvcElement,
  Elements,
} from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import { motion } from 'framer-motion';
import { ChevronLeft, Lock } from 'lucide-react';

const stripePromise = loadStripe('pk_test_51RAt2078E9BFqyzu2cM4CA0zPxOpGZ1U3MeCigYwkdgbS5e3CgBFLqyk55HpkksORnWNe0r2726JqNkfHICfsi9Y00sV7nf9bR');

const elementOptions = {
  style: {
    base: {
      fontSize: '16px',
      color: '#ffffff',
      '::placeholder': {
        color: '#9CA3AF',
      },
      iconColor: '#ffffff',
    },
    invalid: {
      color: '#EF4444',
    },
  },
  classes: {
    focus: 'ring-2 ring-emerald-500',
  },
};

const CheckoutForm = () => {
  const stripe = useStripe();
  const elements = useElements();
  const location = useLocation();
  const navigate = useNavigate();
  const [clientSecret, setClientSecret] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const selectedItems = location.state?.selectedItems || [];

  useEffect(() => {
    const fetchPaymentIntent = async () => {
      setIsLoading(true);
      try {
        const response = await fetch('http://localhost:3000/create-payment-intent', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ items: selectedItems }),
        });

        const data = await response.json();
        setClientSecret(data.clientSecret);
      } finally {
        setIsLoading(false);
      }
    };

    if (selectedItems.length > 0) {
      fetchPaymentIntent();
    }
  }, [selectedItems]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!stripe || !elements) return;

    setIsLoading(true);
    try {
      const result = await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: elements.getElement(CardNumberElement),
        },
      });

      if (result.error) {
        alert(`Payment failed: ${result.error.message}`);
      } else if (result.paymentIntent.status === 'succeeded') {
        navigate('/studentdashboard', { state: { purchasedCourses: selectedItems } });
      }
    } finally {
      setIsLoading(false);
    }
  };

  const totalAmount = selectedItems
    .reduce((acc, item) => acc + parseFloat(item.price.replace(/[^0-9.]/g, '')), 0)
    .toFixed(2);

  return (
    <div className="min-h-screen bg-gray-900 py-12 px-4 sm:px-6 lg:px-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-2xl mx-auto"
      >
        <button
          onClick={() => navigate(-1)}
          className="flex items-center text-gray-400 hover:text-white mb-6 transition-colors"
        >
          <ChevronLeft className="mr-1" size={20} />
          Back to Cart
        </button>

        <motion.div
          initial={{ scale: 0.98 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.3 }}
          className="bg-gray-800 rounded-xl shadow-2xl overflow-hidden"
        >
          <div className="p-8">
            <h2 className="text-3xl font-bold text-white mb-2">Secure Checkout</h2>
            <p className="text-gray-400 mb-8">Complete your purchase</p>

            <div className="space-y-8">
              {/* Order Summary */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2 }}
                className="bg-gray-700 p-6 rounded-lg"
              >
                <h3 className="text-xl font-semibold text-white mb-4">Your Order</h3>
                <ul className="space-y-3 divide-y divide-gray-600">
                  {selectedItems.map((item, index) => (
                    <motion.li
                      key={index}
                      initial={{ x: -10, opacity: 0 }}
                      animate={{ x: 0, opacity: 1 }}
                      transition={{ delay: index * 0.1 }}
                      className="flex justify-between py-3"
                    >
                      <span className="text-gray-300">{item.title}</span>
                      <span className="text-white font-medium">
                        ${parseFloat(item.price.replace(/[^0-9.]/g, '')).toFixed(2)}
                      </span>
                    </motion.li>
                  ))}
                </ul>
                <div className="flex justify-between items-center pt-4 mt-4 border-t border-gray-600">
                  <span className="text-lg font-medium text-gray-300">Total</span>
                  <span className="text-xl font-bold text-emerald-400">${totalAmount}</span>
                </div>
              </motion.div>

              {/* Payment Form */}
              <motion.form
                onSubmit={handleSubmit}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4 }}
                className="space-y-6"
              >
                <div>
                  <h3 className="text-xl font-semibold text-white mb-4">Payment Details</h3>
                  <div className="bg-gray-700 p-5 rounded-lg space-y-4">
                    <div>
                      <label className="text-sm text-gray-300 mb-1 block">Card Number</label>
                      <CardNumberElement
                        options={elementOptions}
                        className="p-3 border border-gray-600 rounded-md bg-gray-800"
                      />
                    </div>
                    <div className="flex space-x-4">
                      <div className="flex-1">
                        <label className="text-sm text-gray-300 mb-1 block">Expiry Date</label>
                        <CardExpiryElement
                          options={elementOptions}
                          className="p-3 border border-gray-600 rounded-md bg-gray-800"
                        />
                      </div>
                      <div className="flex-1">
                        <label className="text-sm text-gray-300 mb-1 block">CVC</label>
                        <CardCvcElement
                          options={elementOptions}
                          className="p-3 border border-gray-600 rounded-md bg-gray-800"
                        />
                      </div>
                    </div>
                  </div>
                </div>

                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  type="submit"
                  disabled={!stripe || !clientSecret || isLoading}
                  className={`w-full py-3 px-6 rounded-lg font-medium flex items-center justify-center space-x-2 transition-all ${
                    !stripe || !clientSecret || isLoading
                      ? 'bg-gray-600 cursor-not-allowed'
                      : 'bg-emerald-600 hover:bg-emerald-500 text-white shadow-lg'
                  }`}
                >
                  {isLoading ? (
                    <>
                      <svg
                        className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                      >
                        <circle
                          className="opacity-25"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="4"
                        ></circle>
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                        ></path>
                      </svg>
                      Processing...
                    </>
                  ) : (
                    <>
                      <Lock size={18} />
                      <span>Pay ${totalAmount}</span>
                    </>
                  )}
                </motion.button>
              </motion.form>
            </div>
          </div>

          <div className="bg-gray-900 px-8 py-4 border-t border-gray-700">
            <div className="flex items-center justify-center space-x-2">
              <Lock size={16} className="text-gray-400" />
              <span className="text-sm text-gray-400">Payments are secure and encrypted</span>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
};

const CheckoutPage = () => (
  <Elements stripe={stripePromise}>
    <CheckoutForm />
  </Elements>
);

export default CheckoutPage;
