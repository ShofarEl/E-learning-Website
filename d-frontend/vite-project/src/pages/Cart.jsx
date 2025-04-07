import { useState } from 'react';
import { useCart } from '../context/CartContext';
import { Link, useNavigate } from 'react-router-dom';
import { ShoppingCart, X, ChevronLeft, Check, HelpCircle, Bookmark } from 'lucide-react';
import Footer from '../compartments/footer';
import { motion } from 'framer-motion';
import toast from 'react-hot-toast'; // ✅ import toast

const CartPage = () => {
  const { cart, removeFromCart } = useCart();
  const [selectedItems, setSelectedItems] = useState([]);
  const navigate = useNavigate();

  const toggleItemSelection = (itemId) => {
    setSelectedItems(prev =>
      prev.includes(itemId)
        ? prev.filter(id => id !== itemId)
        : [...prev, itemId]
    );
  };

  const handleCheckout = () => {
    const selectedItemsData = cart.filter(item => selectedItems.includes(item.id));
    if (selectedItemsData.length > 0) {
      toast.success('Redirecting to checkout...');
      setTimeout(() => {
        navigate('/checkoutpage', { state: { selectedItems: selectedItemsData } });
      }, 800); // delay a bit for toast visibility
    }
  };

  const selectedItemsData = cart.filter(item => selectedItems.includes(item.id));
  const selectedTotal = selectedItemsData
    .reduce((sum, item) => sum + parseFloat(item.price.replace(/[^0-9.]/g, '')), 0)
    .toFixed(2);

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <div className="max-w-4xl mx-auto px-4 py-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="flex justify-between items-center mb-6">
            <div className="flex items-center gap-4">
              <Link to="/Courseware" className="flex items-center text-gray-400 hover:text-white transition-colors">
                <ChevronLeft size={20} className="mr-1" />
                Back
              </Link>
              <h1 className="text-2xl font-bold">Your Cart ({cart.length})</h1>
            </div>
            <div className="flex gap-4">
              <button className="text-gray-400 hover:text-white">
                <HelpCircle size={20} />
              </button>
              <Link to="/wishlist" className="text-gray-400 hover:text-white">
                <Bookmark size={20} />
              </Link>
            </div>
          </div>

          {cart.length === 0 ? (
            <div className="text-center py-20">
              <ShoppingCart size={48} className="mx-auto text-gray-500 mb-4" />
              <p className="text-gray-400 mb-4">Your cart is empty.</p>
              <Link to="/Courseware" className="px-5 py-2 bg-emerald-600 rounded-lg text-white hover:bg-emerald-500 transition">
                Browse Courses
              </Link>
            </div>
          ) : (
            <>
              <motion.div
                className="bg-gray-800 rounded-xl shadow-lg mb-6 overflow-hidden"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
              >
                {cart.map((item, index) => (
                  <div
                    key={item.id}
                    className={`flex items-center px-6 py-4 border-b border-gray-700 ${selectedItems.includes(item.id) ? 'bg-emerald-950/30' : ''}`}
                  >
                    <button
                      onClick={() => toggleItemSelection(item.id)}
                      className={`w-5 h-5 mr-4 flex items-center justify-center border rounded-md ${
                        selectedItems.includes(item.id)
                          ? 'bg-emerald-600 border-emerald-600 text-white'
                          : 'border-gray-500 text-gray-400'
                      }`}
                    >
                      {selectedItems.includes(item.id) && <Check size={14} />}
                    </button>
                    <div className="flex-1">
                      <h3 className="font-semibold text-white">{item.title}</h3>
                      <p className="text-emerald-400 font-medium">{item.price}</p>
                    </div>
                    <button onClick={() => removeFromCart(item.id)} className="text-gray-400 hover:text-red-500 transition">
                      <X size={18} />
                    </button>
                  </div>
                ))}
              </motion.div>

              {selectedItems.length > 0 && (
                <motion.div
                  className="bg-gray-800 rounded-xl shadow-md p-6 mb-6"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.2 }}
                >
                  <div className="flex justify-between items-center mb-4">
                    <span className="text-gray-300 font-medium">Selected Items ({selectedItems.length})</span>
                    <span className="text-emerald-400 font-bold text-lg">${selectedTotal}</span>
                  </div>
                  <button
                    onClick={handleCheckout}
                    className="w-full bg-emerald-600 hover:bg-emerald-500 transition text-white py-3 rounded-lg font-semibold"
                  >
                    Proceed to Checkout
                  </button>
                </motion.div>
              )}

              <div className="bg-gray-800 rounded-xl shadow-md p-6">
                <div className="flex justify-between items-center mb-4">
                  <span className="text-gray-300 font-medium">All Items Total ({cart.length})</span>
                  <span className="text-white font-bold">
                    ${cart.reduce((sum, item) => sum + parseFloat(item.price.replace(/[^0-9.]/g, '')), 0).toFixed(2)}
                  </span>
                </div>
                <button
                  disabled
                  className="w-full bg-gray-600 text-gray-300 py-3 rounded-lg font-medium cursor-not-allowed"
                >
                  Checkout All (Coming Soon)
                </button>
              </div>
            </>
          )}
        </motion.div>
      </div>
      <Footer />
    </div>
  );
};

export default CartPage;
