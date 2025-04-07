import { createContext, useContext, useState, useEffect } from 'react';
import toast from 'react-hot-toast';

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [isClient, setIsClient] = useState(false);
  const [cart, setCart] = useState([]);
  const [purchasedCourses, setPurchasedCourses] = useState([]);
  const [isInitialized, setIsInitialized] = useState(false);

  // Initialize client-side and load data
  useEffect(() => {
    setIsClient(true);
    loadFromLocalStorage();
  }, []);

  const loadFromLocalStorage = () => {
    try {
      const savedCart = localStorage.getItem('cart');
      const savedPurchases = localStorage.getItem('purchasedCourses');
      
      if (savedCart) {
        const parsedCart = JSON.parse(savedCart);
        if (Array.isArray(parsedCart)) {
          setCart(parsedCart);
        }
      }
      
      if (savedPurchases) {
        const parsedPurchases = JSON.parse(savedPurchases);
        if (Array.isArray(parsedPurchases)) {
          setPurchasedCourses(parsedPurchases);
        }
      }
    } catch (error) {
      console.error("Error loading cart data:", error);
      localStorage.removeItem('cart');
      localStorage.removeItem('purchasedCourses');
    } finally {
      setIsInitialized(true);
    }
  };

  // Save to localStorage when cart or purchases change
  useEffect(() => {
    if (!isInitialized || !isClient) return;
    
    localStorage.setItem('cart', JSON.stringify(cart));
    localStorage.setItem('purchasedCourses', JSON.stringify(purchasedCourses));
  }, [cart, purchasedCourses, isInitialized, isClient]);

  const addToCart = (course) => {
    if (!isClient) {
      toast.error("Cart not available yet");
      return false;
    }

    if (!course?.id) {
      toast.error("Invalid course");
      return false;
    }

    if (cart.some(item => item.id === course.id)) {
      toast.error("Course already in cart");
      return false;
    }
    
    if (purchasedCourses.includes(course.id)) {
      toast("You already own this course!", { icon: "✅" });
      return false;
    }
    
    setCart(prev => [...prev, course]);
    toast.success("Course added to cart!");
    return true;
  };

  const removeFromCart = (courseId) => {
    if (!isClient) return;
    setCart(prev => prev.filter(item => item.id !== courseId));
    toast("Removed from cart", { icon: "🗑️" });
  };

  const purchaseCourses = (items = cart) => {
    if (!isClient) {
      toast.error("Cannot purchase - cart not initialized");
      return;
    }

    const itemsToPurchase = Array.isArray(items) ? items : [items];
    const newPurchaseIds = itemsToPurchase.map(item => item.id);
    
    setPurchasedCourses(prev => [...new Set([...prev, ...newPurchaseIds])]);
    setCart(prev => prev.filter(item => !newPurchaseIds.includes(item.id)));
    
    toast.success(
      `Purchased ${newPurchaseIds.length} course(s)!`,
      { icon: "🎉" }
    );
  };

  const clearCart = () => {
    if (!isClient) return;
    setCart([]);
    toast("Cart cleared", { icon: "🧹" });
  };

  const clearAll = () => {
    if (!isClient) return;
    setCart([]);
    setPurchasedCourses([]);
    localStorage.removeItem('cart');
    localStorage.removeItem('purchasedCourses');
    toast("Reset all cart data", { icon: "⚠️" });
  };

  const isInCart = (courseId) => cart.some(item => item.id === courseId);
  const isPurchased = (courseId) => purchasedCourses.includes(courseId);

  if (!isClient) return null;

  return (
    <CartContext.Provider value={{
      cart,
      purchasedCourses,
      addToCart,
      removeFromCart,
      purchaseCourses,
      clearCart,
      clearAll,
      isInCart,
      isPurchased,
      isInitialized
    }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);