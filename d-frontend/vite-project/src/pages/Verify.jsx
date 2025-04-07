import { motion } from 'framer-motion';
import React, { useState } from 'react';
import { ShieldCheck } from 'lucide-react';
import Input from '../components/Input';
import { useAuthStore } from '../store/authstore';
import { useNavigate } from 'react-router-dom';

const Verify = () => {
  const [code, setCode] = useState("");
  const [localError, setLocalError] = useState("");
  const navigate = useNavigate();
  const { verifyEmail, isLoading, error } = useAuthStore();

  const handleVerify = async (e) => {
    e.preventDefault();
    setLocalError("");

    if (!code || code.length !== 6) {
      setLocalError("Please enter a 6-digit verification code");
      return;
    }

    try {
      await verifyEmail(code);
      navigate('/'); // Or wherever you want to redirect after verification

    } catch (err) {
      console.error("Verification error:", err);
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
          <ShieldCheck className="inline mr-2" size={24} />
          Verify Your Email
        </h2>

        {error && (
          <div className="mb-4 p-3 bg-red-500/20 text-red-100 rounded-lg text-sm text-center">
            {error}
          </div>
        )}

        <form onSubmit={handleVerify}>
          <div className="mb-6">
            <p className="text-gray-300 text-center mb-4">
              We've sent a 6-digit verification code to your email
            </p>
            
            <Input
              icon={ShieldCheck}
              type="text"
              placeholder="Enter 6-digit code"
              value={code}
              onChange={(e) => {
                // Allow only numbers and limit to 6 digits
                const value = e.target.value.replace(/\D/g, "").slice(0, 6);
                setCode(value);
              }}
              maxLength={6}
              autoComplete="one-time-code"
              autoFocus
            />
            
            {localError && (
              <p className="text-red-400 text-xs mt-1 text-center">{localError}</p>
            )}
          </div>

          <motion.button
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            className="w-full py-3 px-6 bg-gradient-to-r from-green-500 to-emerald-600 text-white font-medium rounded-lg shadow-lg disabled:opacity-50"
            disabled={isLoading}
            type="submit"
          >
            {isLoading ? "Verifying..." : "Verify Email"}
          </motion.button>
        </form>

        <div className="mt-6 text-center text-sm text-gray-400">
          Didn't receive a code?{" "}
          <button 
            className="text-green-400 hover:underline focus:outline-none"
            onClick={() => {
              // Add resend logic here if needed
            }}
          >
            Resend Code
          </button>
        </div>
      </div>
    </motion.div>
    </div>
  );
};

export default Verify;