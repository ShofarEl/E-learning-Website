import { Route, Routes, Navigate } from 'react-router-dom';
import Signin from './pages/signin.jsx';
import Signup from './pages/signup.jsx';
import Verify from './pages/Verify.jsx';
import Home from './pages/home.jsx';
import { useAuthStore } from './store/authstore.js';
import { useEffect } from 'react';
import TechCourses from './Courseware/Courseware.jsx';
import DarkGreenLoader from './utilsx/Loader.jsx';
import CartPage from './pages/Cart'; 
import CheckoutPage from './pages/checkoutpage.jsx';
import DashboardPage from './pages/studentdashboard.jsx';
import { Toaster } from 'react-hot-toast';
import SignoutPage from './pages/signout.jsx'
import ForgotPasswordPage from './pages/forgotpassword.jsx';
import ResetPasswordPage from './pages/resetpassword.jsx';

const ProtectedRoute = ({ children }) => {
  const { isAuthenticated, user, isCheckingAuth } = useAuthStore();
  
  // Show loading state while checking auth status
  if (isCheckingAuth) {
    return <div>Loading...</div>;
  }

  // Redirect conditions
  if (!isAuthenticated) {
    return <Navigate to="/signin" replace />;
  }


  return children;
};
// Auth route component (for signin/signup)
const AuthRoute = ({ children }) => {
  const { isAuthenticated, user } = useAuthStore();
  if (isAuthenticated ) {
    return <Navigate to="/" replace />;
  }
  return children;
};


function App() {
  const { checkAuth, isCheckingAuth, isAuthenticated, user } = useAuthStore();

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);
console.log("isAuthenticated: ", isAuthenticated)
console.log("User: ", user)

  if (isCheckingAuth) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-green-900 to-emerald-950 flex items-center justify-center">
        <div><DarkGreenLoader/></div>
      </div>
    );
  }
 


  return (
    <>
    <Toaster position="top-center" reverseOrder={false} />
      <Routes>
        <Route path="/" element={<ProtectedRoute><Home /></ProtectedRoute>} />
        
        <Route path="/signin" element={
            <Signin />
        } />
        
        <Route path="/signup" element={
          <AuthRoute>
            <Signup />
          </AuthRoute>
        } />
        <Route path="/signout" element={<SignoutPage/>}/>
        <Route/>
        <Route path="/verify" element={
            <Verify />
         
        } />
        <Route path="/Courseware" element={
         <ProtectedRoute>
          <TechCourses/>
         </ProtectedRoute> 

        }/>
         <Route path="/Cart" element={
            <ProtectedRoute>
<CartPage/>
  </ProtectedRoute>

        }/>
         <Route path="/checkoutpage" element={
         <ProtectedRoute>
          <CheckoutPage/>
         </ProtectedRoute> }/>

       
    <Route path="/studentdashboard" element={   <ProtectedRoute><DashboardPage /></ProtectedRoute>} />
    <Route path="/forgotpassword" element={<ForgotPasswordPage/>}/>
<Route path= "/reset-password/:token" element={<ResetPasswordPage/>}/>

              </Routes>
              </>

  );
}

export default App;