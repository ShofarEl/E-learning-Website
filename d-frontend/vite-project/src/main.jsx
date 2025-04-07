import React from 'react';
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import './index.css';
import { CartProvider } from './context/CartContext';
import App from './App';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';

// Load your Stripe publishable key here
const stripePromise = loadStripe('pk_test_51RAt2078E9BFqyzu2cM4CA0zPxOpGZ1U3MeCigYwkdgbS5e3CgBFLqyk55HpkksORnWNe0r2726JqNkfHICfsi9Y00sV7nf9bR'); // Replace with your actual Stripe publishable key

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <CartProvider>
        <Elements stripe={stripePromise}>
          <App />
        </Elements>
      </CartProvider>
    </BrowserRouter>
  </StrictMode>
);
