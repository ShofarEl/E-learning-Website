import { useContext } from 'react'
import { CartContext } from './AddToCart'
const { cartItems, addToCart, removeFromCart, clearCart, getCartTotal } = useContext(CartContext)
export default function Cart() {
    return (
      <>
      {/* Courses Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-8 mb-12">
          {currentCourses.map((course) => (
            <div key={course.id} className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
              <div className="h-40 overflow-hidden">
                <img 
                  src={course.image} 
                  alt={course.title}
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                />
              </div>
              <div className="p-5">
                <span className="inline-block px-3 py-1 text-xs font-semibold bg-emerald-100 text-emerald-800 rounded-full mb-2">
                  {course.category}
                </span>
                <h3 className="text-lg font-semibold text-gray-800 mb-2">{course.title}</h3>
                
                <div className="flex items-center text-sm text-gray-600 mb-3">
                  <User className="mr-1" size={14} />
                  <span>{course.tutor}</span>
                </div>
                
                <div className="flex justify-between items-center mb-4">
                  <div className="flex items-center text-sm text-gray-600">
                    <Clock className="mr-1" size={14} />
                    <span>{course.hours} hours</span>
                  </div>
                  <div className="flex items-center text-sm text-yellow-600">
                    <Star className="mr-1" size={14} />
                    <span>{course.rating}</span>
                  </div>
                </div>
                
                <div className="flex justify-between items-center">
                  <span className="text-xl font-bold text-gray-900">{course.price}</span>
                  <a href="#"><button onClick={() => addToCart(product)} className="bg-emerald-600
                  flex items-center justify-center gap-2 hover:bg-gray-50 hover:text-gray-900 cursor-pointer px-3 py-1 text-white 
                   rounded-xl text-sm font-medium transition-colors">
                    <ShoppingCart className=" text-gray-800 mb-3" size={24} />
                    <span>Add to Cart</span>
                  </button></a>
                </div>
              </div>
            </div>
          ))}
        </div>

      </>
    )
  }