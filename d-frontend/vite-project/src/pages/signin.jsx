import { motion } from 'framer-motion';
import React, { useState } from 'react';
import { Mail, Lock } from 'lucide-react';
import Input from '../components/Input';
import { useAuthStore } from '../store/authstore';
import { useNavigate } from 'react-router';
import { FloatingShape } from '../components/floatingshape';

const Signin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState({});
  const navigate = useNavigate()
  const { signin, error: authError, isLoading, checkAuth } = useAuthStore();

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

  const handleSignIn = async (event) => {
    event.preventDefault();
    setIsSubmitting(true);
    setErrors({});

    const newErrors = {};

    // Validation
    if (!email) newErrors.email = "Email is required";
    else if (!validateEmail(email)) newErrors.email = "Please enter a valid email";
    if (!password) newErrors.password = "Password is required";
    else if (!validatePassword(password)) newErrors.password = "Password must be at least 8 characters with uppercase, lowercase, number, and special character";

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      setIsSubmitting(false);
      return;
    }

    try {
      await signin(email, password);
      //checkAuth()
      navigate("/")
      // On successful signin, the auth store should handle redirect
    } catch (err) {
      setErrors({
        submit: authError || "Sign in failed. Please try again."
      });
    } finally {
      setIsSubmitting(false);
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
          Sign In
        </h2>

        {(errors.submit || authError) && (
          <div className="mb-4 p-3 bg-red-500/20 text-red-100 rounded-lg text-sm text-center">
            {errors.submit || authError}
          </div>
        )}

        <form onSubmit={handleSignIn}>
          <div className="relative">
            <Input 
              icon={Mail}
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              autoComplete="off"
              autoCapitalize="none"
              autoCorrect="new-email"
            />
            {errors.email && (
              <p className="text-red-400 text-xs mt-1">{errors.email}</p>
            )}
          </div>

          <div className="relative mt-4">
            <Input 
              icon={Lock}
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              autoComplete="new-password"
            />
            {errors.password && (
              <p className="text-red-400 text-xs mt-1">{errors.password}</p>
            )}
          </div>

          <motion.button
            whileHover={{ 
              scale: 1.03,
              boxShadow: "0 0 15px rgba(74, 222, 128, 0.5)"
            }}
            whileTap={{ scale: 0.97 }}
            transition={{ type: "spring", stiffness: 400, damping: 15 }}
            className="w-full py-3 px-6 bg-gradient-to-r from-green-500 to-emerald-600
                     text-white font-medium rounded-lg shadow-lg mt-6
                     focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50
                     disabled:opacity-50 disabled:cursor-not-allowed"
            disabled={isSubmitting || isLoading}
            type="submit"
          >
            {(isSubmitting || isLoading) ? "Signing in..." : "Sign In"}
          </motion.button>
        </form>

        <div className="justify-items-end mt-2">
          <a 
            href="/forgotpassword" 
            className="text-gray-400 text-sm hover:text-green-700 hover:underline transition-colors"
          >
            Forgot Password?
          </a>
        </div>

        <div className="mt-6 text-xs text-gray-400">
          <p>For your security:</p>
          <ul className="list-disc pl-5 mt-1 space-y-1">
            <li>Use a strong, unique password</li>
            <li>Never share your credentials</li>
            <li>Log out after each session</li>
          </ul>
        </div>
      </div>
      <div className="px-8 py-4 bg-gray-900 bg-opacity-50 mt-3 flex justify-center">
        <p className="text-sm text-gray-400">Don't have an account?</p>
        <a href="/signup" className="text-green-400 hover:underline ml-3">Sign Up</a>
      </div>
    </motion.div>
    </div>
  );
};

export default Signin