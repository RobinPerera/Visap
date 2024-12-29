import React, { useState } from "react";

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

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      console.log("Form submitted:", { username, password });
      // Add your login logic here.
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-r from-[#003366] via-[#004080] to-[#0073e6] text-white">
      {/* Header Section */}
      <header className="flex justify-between items-center px-6 py-4">
        <div className="text-xl font-semibold flex items-center">
          <div className="bg-white rounded-full h-12 w-12 flex justify-center items-center mr-3">
            <span className="text-[#003366] text-lg font-extrabold">
              VI-SAP
            </span>
          </div>
          <span className="text-lg font-bold">VI-SAP</span>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-grow flex items-center justify-center px-4 sm:px-0">
        <div className="bg-white rounded-lg shadow-lg w-full max-w-md p-8 text-gray-800">
          <h2 className="text-3xl font-semibold mb-6 text-center">Sign in</h2>
          <form onSubmit={handleSubmit} noValidate>
            {/* Username Input */}
            <div className="mb-6">
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
            <div className="mb-6">
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
              className="text-sm text-[#0073e6] hover:underline mb-6 inline-block"
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
            New to VI-SAP?{" "}
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
      <footer className="bg-[#002244] text-sm py-4">
        <div className="max-w-6xl mx-auto flex flex-wrap justify-between items-center px-6">
          <div className="mb-2 sm:mb-0">
            <a href="/terms" className="text-[#0073e6] hover:underline mr-4">
              Terms of Use
            </a>
            <a href="/privacy" className="text-[#0073e6] hover:underline mr-4">
              Privacy
            </a>
            <a
              href="/accessibility"
              className="text-[#0073e6] hover:underline mr-4"
            >
              Accessibility
            </a>
            <a href="/support" className="text-[#0073e6] hover:underline">
              Support
            </a>
          </div>
          <div>Copyright © 2024 VI-SAP. All rights reserved.</div>
        </div>
      </footer>
    </div>
  );
}

export default LoginPage;
