import React, { useState, FormEvent } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const UserSignup: React.FC = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const signup = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const response = await axios.post('https://brainwave-jibt.onrender.com/api/v1/signup', {
        username,
        email,
        password,
      });

      if (response.data.message === "Signup success") {
        alert("Sign Up Successful");
      }
      navigate('/signin')
    } catch (error: any) {
      console.error('Error:', error.response?.data || error.message);
      setError("Sign up failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 flex items-center justify-center">
      <div className="w-full max-w-md px-6 py-12 bg-gray-800 rounded-lg shadow-lg">
        <h2 className="text-3xl font-bold text-center text-white">Create Account</h2>

        <form onSubmit={signup} className="mt-6 space-y-6">
          {/* Username Field */}
          <div>
            <label htmlFor="username" className="block text-sm font-medium text-gray-200">
              Username
            </label>
            <input
              id="username"
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
              className="block w-full rounded-lg bg-gray-800 px-4 py-2 text-white shadow-sm ring-1 ring-inset ring-gray-700 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-500 transform transition-all duration-200 ease-in-out hover:ring-2 hover:ring-indigo-500/50 sm:text-sm" />
          </div>

          {/* Email Field */}
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-200">
              Email
            </label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="block w-full rounded-lg bg-gray-800 px-4 py-2 text-white shadow-sm ring-1 ring-inset ring-gray-700 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-500 transform transition-all duration-200 ease-in-out hover:ring-2 hover:ring-indigo-500/50 sm:text-sm" />

          </div>

          {/* Password Field */}
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-200">
              Password
            </label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="block w-full rounded-lg bg-gray-800 px-4 py-2 text-white shadow-sm ring-1 ring-inset ring-gray-700 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-500 transform transition-all duration-200 ease-in-out hover:ring-2 hover:ring-indigo-500/50 sm:text-sm" />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full py-2.5 bg-indigo-600 text-white rounded-lg font-semibold hover:bg-indigo-500 disabled:opacity-70 transition"
          >
            {loading ? "Creating Account..." : "Create Account"}
          </button>

          {/* Error Message */}
          {error && <p className="text-red-500 text-sm text-center">{error}</p>}
        </form>

        <p className="mt-6 text-center text-sm text-gray-400">
          Already have an account?{" "}
          <a href="/signin" className="text-indigo-400 hover:text-indigo-300 transition">
            Sign in
          </a>
        </p>
      </div>
    </div>
  );
};

export default UserSignup;
