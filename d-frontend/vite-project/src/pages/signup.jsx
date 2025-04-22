import { motion } from 'framer-motion';
import React, { useState } from 'react';
import { Mail, Lock, User } from 'lucide-react';
import Input from '../components/Input';
import PasswordStrengthMeter from '../components/PasswordStrengthMeter';
import { useAuthStore } from '../store/authstore';
import { useNavigate } from 'react-router-dom';
import {FloatingShape} from '../components/FloatingShape';

const Signup = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const { signup, error, isLoading } = useAuthStore();
  const [localErrors, setLocalErrors] = useState({});

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validatePassword = (pass) => {
    return pass.length >= 8 && 
           /[A-Z]/.test(pass) && 
           /[a-z]/.test(pass) && 
           /[0-9]/.test(pass) && 
           /[^A-Za-z0-9]/.test(pass);
  };

  const handleSignup = async (event) => {
    event.preventDefault();
    setLocalErrors({});

    // Client-side validation
    const newErrors = {};
    if (!name.trim()) newErrors.name = "Name is required";
    if (!email) newErrors.email = "Email is required";
    else if (!validateEmail(email)) newErrors.email = "Please enter a valid email";
    if (!password) newErrors.password = "Password is required";
    else if (!validatePassword(password)) {
      newErrors.password = "Password must be 8+ characters with uppercase, lowercase, number, and special character";
    }

    if (Object.keys(newErrors).length > 0) {
      setLocalErrors(newErrors);
      return;
    }

    try {
      await signup(name, email, password);
      navigate('/Verify', { state: { email } }); // Lowercase path and pass email
    } catch (error) {
      console.error("Signup error:", error);
      // The error is already handled by the auth store
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-green-900 to-emerald-950 flex items-center justify-center relative overflow-hidden">
          <FloatingShape color="bg-green-500" size="w-32 h-32" top="top-5" left="left-10" delay={0} />
          <FloatingShape color="bg-emerald-700" size="w-40 h-40" top="top-20" left="left-10" delay={5} />
          <FloatingShape color="bg-lime-600" size="w-20 h-20" top="top-80" left="left-10" delay={2} />
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="w-md bg-opacity-50 bg-gray-800 backdrop-filter backdrop-blur-6xl border-gray-900 rounded-2xl shadow-xl overflow-hidden p-8 pl-10 pr-10"
    >
      <div>
        <h2 className="text-3xl bg-gradient-to-r bg-clip-text from-green-400 to-emerald-500 text-center font-bold text-transparent mb-6">
          Sign Up
        </h2>

        {/* Display backend error */}
        {error && (
          <div className="mb-4 p-3 bg-red-500/20 text-red-100 rounded-lg text-sm text-center">
            {error}
          </div>
        )}

        <form onSubmit={handleSignup}>
          <div className="relative">
            <Input 
              icon={User}
              type="text"
              placeholder="Full Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              error={localErrors.name}
              autoComplete="name"
              autoCapitalize="words"
            />
          </div>

          <div className="relative mt-4">
            <Input 
              icon={Mail}
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              error={localErrors.email}
              autoComplete="email"
            />
          </div>

          <div className="relative mt-4">
            <Input 
              icon={Lock}
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              error={localErrors.password}
              autoComplete="new-password"
            />
            <PasswordStrengthMeter password={password} />
          </div>

          <motion.button
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            className="w-full py-3 px-6 bg-gradient-to-r from-green-500 to-emerald-600 text-white font-medium rounded-lg shadow-lg mt-6 disabled:opacity-50"
            disabled={isLoading}
            type="submit"
          >
            {isLoading ? "Creating account..." : "Sign Up"}
          </motion.button>
        </form>

        <div className="px-8 py-4 bg-gray-900 bg-opacity-50 mt-3 flex justify-center">
          <p className="text-sm text-gray-400">Already have an account?</p>
          <a href="/signin" className="text-green-400 hover:underline ml-3">Sign In</a>
        </div>
      </div>
    </motion.div>
    </div>
  );
};

export default Signup;