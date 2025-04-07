// pages/SignoutPage.jsx
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {useAuthStore} from "../store/authstore.js"; // your Zustand store

const SignoutPage = () => {
  const navigate = useNavigate();
  const signout = useAuthStore((state) => state.signout);
  const isLoading = useAuthStore((state) => state.isLoading);
  const error = useAuthStore((state) => state.error);

  useEffect(() => {
    const handleSignout = async () => {
      await signout(); // Triggers your signout logic and clears user state
      navigate("/signin"); // Redirects after logout
    };

    handleSignout();
  }, [signout, navigate]);

  return (
    <div className="flex justify-center items-center h-screen">
      <div className="text-center">
        {isLoading ? (
          <p className="text-lg font-semibold">Signing you out...</p>
        ) : error ? (
          <p className="text-red-500">Error: {error}</p>
        ) : (
          <p className="text-lg font-semibold">You have been signed out.</p>
        )}
      </div>
    </div>
  );
};

export default SignoutPage;
