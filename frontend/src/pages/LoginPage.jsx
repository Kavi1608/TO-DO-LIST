import React, { useState } from 'react';
import { signInWithPopup } from 'firebase/auth';
import { auth, googleProvider, githubProvider } from '../firebase';
import { useNavigate } from 'react-router-dom';

const LoginPage = () => {
  const navigate = useNavigate();
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSocialLogin = async (provider) => {
    setError('');
    setLoading(true);
    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;
      const token = await user.getIdToken();
      localStorage.setItem('authToken', token);
      navigate('/dashboard');
    } catch (err) {
      setError('Login failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="w-full max-w-md bg-white rounded-xl shadow-lg p-8 text-center">
        <h2 className="text-2xl font-bold mb-6 text-gray-800">Login to Task Manager</h2>

        {error && (
          <div className="mb-4 text-sm text-red-600 bg-red-100 p-2 rounded">
            {error}
          </div>
        )}

        <div className="flex flex-col items-center space-y-8">
          <button
            onClick={() => handleSocialLogin(googleProvider)}
            disabled={loading}
            className="w-72 px-8 py-4 bg-red-600 hover:bg-red-700 text-white font-medium rounded transition"
          >
            {loading ? 'Signing in...' : 'Sign in with Google'}
          </button>

          <button
            onClick={() => handleSocialLogin(githubProvider)}
            disabled={loading}
            className="w-72 px-8 py-4 bg-gray-900 hover:bg-gray-800 text-white font-medium rounded transition"
          >
            {loading ? 'Signing in...' : 'Sign in with GitHub'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
