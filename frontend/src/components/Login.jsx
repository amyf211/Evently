import React, { useState } from "react";
import { Navigate } from "react-router-dom";
import { doSignInWithGoogle } from "../firebase/auth";
import { useAuth } from "../contexts/authContext";

const Login = () => {
  const { userLoggedIn } = useAuth();
  const [isSigningIn, setIsSigningIn] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const onGoogleSignIn = async (e) => {
    e.preventDefault();
    setErrorMessage("");

    if (!isSigningIn) {
      setIsSigningIn(true);

      try {
        await doSignInWithGoogle();
        console.log("Google Sign-In successful");
      } catch (error) {
        console.error("Error during Google Sign-In:", error);
        setErrorMessage(
          "Failed to sign in with Google. Please try again later."
        );
      } finally {
        setIsSigningIn(false);
      }
    }
  };


  if (userLoggedIn) {
    return <Navigate to="/home" replace={true} />;
  }

  return (
    <div>
      <main>
        <div>
          <h1 className="login-title">Evently</h1>

          <button
            className="google-button"
            disabled={isSigningIn}
            onClick={onGoogleSignIn}
          >
            {isSigningIn ? "Signing In..." : "Continue with Google"}
          </button>
          
          {errorMessage && (
            <p className="error-message" style={{ color: "red" }}>
              {errorMessage}
            </p>
          )}
        </div>
      </main>
    </div>
  );
};

export default Login;
