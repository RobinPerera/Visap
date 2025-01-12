import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function LoginPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState({ username: "", password: "" });

  const validateForm = () => {
    const errors = {};
    if (!username.trim()) {
      errors.username = "Username is required.";
    }
    if (!password) {
      errors.password = "Password is required.";
    }
    setError(errors);
    return Object.keys(errors).length === 0;
  };

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (validateForm()) {
      console.log("Form submitted:", { username, password });
      const name = "robin";
      const pass = 1234;
      try {
        //const user_details = await User_Auth(); // Await the promise

        if (name === username) {
          if (pass === parseInt(password)) {
            console.log("Login successful");
            navigate("/home"); // Redirect to home
          } else {
            setError((prevError) => ({
              ...prevError,
              password: "Username or Password is incorrect",
            }));
          }
        } else {
          setError((prevError) => ({
            ...prevError,
            password: "Username or Password is incorrect",
          }));
        }
      } catch (err) {
        console.error("Error during login:", err.message);
      }
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-r from-[#003366] via-[#004080] to-[#0073e6] text-white">
      {/* Main Content */}
      <main
        className="flex-grow flex flex-col lg:flex-row items-center justify-between 
            px-4 md:px-8 lg:px-24 
            py-8 md:py-10 lg:py-16 
            space-y-4 lg:space-y-0 lg:space-x-8"
      >
        {/* Logo and Text Section */}
        <div
          className="flex flex-col items-center lg:items-start text-center lg:text-left lg:w-1/2 mb-8 lg:mb-0 
                pt-4 md:pt-6 lg:pt-8 
                mt-4 md:mt-6 lg:mt-[-17rem]"
        >
          <div className="bg-white rounded-full h-16 w-16 flex justify-center items-center mb-4">
            <span className="text-[#003366] text-xl font-extrabold">Vi</span>
          </div>
          <h1 className="text-2xl md:text-3xl font-bold mb-2">Vi-SAP</h1>
          <p className="text-sm md:text-lg">
            Hello. Sign in and let the learning begin!
          </p>
        </div>

        {/* Sign-in Box */}
        <div className="bg-white rounded-lg shadow-lg w-full lg:w-[40%] p-6 md:p-8 text-gray-800">
          <h2 className="text-2xl md:text-3xl font-semibold mb-6 text-center">
            Sign in
          </h2>
          <form onSubmit={handleSubmit} noValidate>
            {/* Username Input */}
            <div className="mb-4 md:mb-6">
              <label
                htmlFor="username"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Username
              </label>
              <input
                id="username"
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className={`mt-1 block w-full rounded-md border-gray-300 shadow-sm h-12 focus:ring-[#0073e6] focus:border-[#0073e6] text-gray-700 sm:text-lg px-4 ${
                  error.username ? "border-red-500" : ""
                }`}
                placeholder="Enter your username"
              />
              {error.username && (
                <p className="text-red-500 text-sm mt-1">{error.username}</p>
              )}
            </div>

            {/* Password Input */}
            <div className="mb-4 md:mb-6">
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Password
              </label>
              <div className="relative">
                <input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className={`mt-1 block w-full rounded-md border-gray-300 shadow-sm h-12 focus:ring-[#0073e6] focus:border-[#0073e6] text-gray-700 sm:text-lg px-4 ${
                    error.password ? "border-red-500" : ""
                  }`}
                  placeholder="Enter your password"
                />
                <span
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-3 flex items-center text-[#0073e6] font-medium cursor-pointer"
                >
                  {showPassword ? "Hide" : "Show"}
                </span>
              </div>
              {error.password && (
                <p className="text-red-500 text-sm mt-1">{error.password}</p>
              )}
            </div>

            {/* Forgot Password Link */}
            <a
              href="/app"
              className="text-sm text-[#0073e6] hover:underline mb-4 inline-block"
            >
              Forgot your username or password?
            </a>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full bg-[#FFC107] text-gray-800 py-3 rounded-md font-medium hover:bg-[#FFB300] transition"
            >
              Sign in
            </button>
          </form>
          <hr className="my-6" />
          <p className="text-center text-sm">
            New to Pearson?{" "}
            <a
              href="/app"
              className="text-[#0073e6] font-medium hover:underline"
            >
              Create an account
            </a>
          </p>
        </div>
      </main>

      {/* Footer Section */}
      <footer className="bg-[#002244] text-white text-xs sm:text-sm py-4">
        <div className="max-w-6xl mx-auto flex flex-wrap justify-between items-center px-4 sm:px-6">
          <div className="mb-2 sm:mb-0">
            <a href="/terms" className="hover:underline mr-4">
              Terms of Use
            </a>
            <a href="/privacy" className="hover:underline mr-4">
              Privacy
            </a>
            <a href="/accessibility" className="hover:underline mr-4">
              Accessibility
            </a>
            <a href="/support" className="hover:underline">
              Support
            </a>
          </div>
          <div>Copyright © 2025 Pearson. All rights reserved.</div>
        </div>
      </footer>
    </div>
  );
}

export default LoginPage;
