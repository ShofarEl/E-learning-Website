import { create } from 'zustand';
import axios from 'axios';

const API_URI = "https://edumally.onrender.com/api/auth" || 'http://localhost:3000/api/auth';

export const useAuthStore = create((set) => ({
  user: null,
  isAuthenticated: false,
  isLoading: false,
  isCheckingAuth: true,
  error: null,
  hasPurchasedCourse: false,

  // Signup function
  signup: async (name, email, password) => {
    set({ isLoading: true, error: null });
    try {
      const response = await axios.post(`${API_URI}/signup`, 
        { name, email, password },
        { withCredentials: true }
      );
      set({
        user: response.data.user,
        isAuthenticated: true,
        isLoading: false,
      });
      return response.data;
    } catch (error) {
      const errorMessage = error.response?.data?.message || "Signup failed";
      set({ error: errorMessage, isLoading: false });
      throw new Error(errorMessage);
    }
  },

  // Login function
  signin: async (email, password) => {
    set({ isLoading: true, error: null });
    try {
      const response = await axios.post(`${API_URI}/signin`, 
        { email, password },
        { withCredentials: true }
      );
      set({
        user: response.data.user,
        isAuthenticated: true,
        isLoading: false,
      });
      return response.data;
    } catch (error) {
      const errorMessage = error.response?.data?.message || "Login failed";
      set({ error: errorMessage, isLoading: false });
      throw new Error(errorMessage);
    }
  },

  // Email verification
  verifyEmail: async (code) => {
    set({ isLoading: true });
    try {
      const response = await axios.post(
        `${API_URL}/verify-email`, 
        { code },
        { withCredentials: true }
      );
      set({ 
        user: response.data.user,
        isLoading: false 
      });
      return response.data;
    } catch (error) {
      const errorMsg = error.response?.data?.message || 'Verification failed';
      set({ error: errorMsg, isLoading: false });
      throw new Error(errorMsg);
    }
  },

  // Auth check
  checkAuth: async () => {
    set({ isCheckingAuth: true });
    try {
      const response = await axios.get(`${API_URI}/check-auth`, {
        withCredentials: true
      });
      set({
        user: response.data.user,
        isAuthenticated: true,
        isCheckingAuth: false,
      });
      return true;
    } catch (error) {
      set({
        user: null,
        isAuthenticated: false,
        isCheckingAuth: false,
        error: error.response?.data?.message || 'Session expired'
      });
      return false;
    }
  },

  checkCourseOwnership: async () => {
    set({ isLoading: true });
    try {
      const response = await axios.get(
        `${API_URL}/check-course-ownership`,
        { withCredentials: true }
      );
      set({
        hasPurchasedCourse: response.data.hasPurchased, // Note: Check spelling of 'hasPurchased' vs 'hasPurchased'
        isLoading: false,
        error: null // Clear any previous errors
      });
      return response.data.hasPurchased;
    } catch (error) {
      const errorMessage = error.response?.data?.message 
        || error.message 
        || 'Ownership check failed';
      
      set({
        hasPurchasedCourse: false,
        isLoading: false,
        error: errorMessage
      });
      return false;
    }
  },
  // Signout
  signout: async () => {
    set({ isLoading: true });
    try {
      await axios.post(`${API_URI}/signout`, {}, { withCredentials: true });
      set({
        user: null,
        isAuthenticated: false,
        hasPurchasedCourse: false,
        isLoading: false,
        error: null,
      });
    } catch (error) {
      set({
        error: error.response?.data?.message || "Logout failed",
        isLoading: false,
      });
    }
  },
  forgotPassword: async (email) => {
    set({ isLoading: true, error: null, message: null });
    try {
      const res = await axios.post(
        `${API_URI}/forgot-password`,
        { email },
        { withCredentials: true }
      );
      set({
        message: res.data.message,
        isLoading: false,
        error: null,
      });
    } catch (error) {
      set({
        isLoading: false,
        message: null,
        error: error.response?.data?.message || "Something went wrong",
      });
    }
  },

  clearMessages: () => {
    set({ message: null, error: null });
  },
  resetPassword: async (token, password, confirmPassword) => {
    set({ isLoading: true, error: null, message: null });
    try {
      const res = await axios.post(
        `${API_URI}/reset-password/${token}`,
        { password, confirmPassword },
        { withCredentials: true }
      );
      set({
        isLoading: false,
        message: res.data.message,
        error: null,
      });
    } catch (error) {
      set({
        isLoading: false,
        message: null,
        error: error.response?.data?.message || "Reset failed",
      });
    }
  },

  clearMessages: () => {
    set({ message: null, error: null });
  },
}));
