import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Gem, Mail, Lock, User, Eye, EyeOff, ArrowRight, Shield, ShoppingBag } from 'lucide-react';

export default function Login() {
  const [userType, setUserType] = useState('customer'); // 'customer' or 'admin'
  const [isLogin, setIsLogin] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (isLogin) {
      // Login Logic
      console.log(`${userType} Login:`, { email: formData.email, password: formData.password });
      
      // Store user data in localStorage
      const userData = {
        name: formData.email.split('@')[0], // Extract name from email
        email: formData.email,
        id: Date.now().toString(),
        userType: userType // Store user type (admin or customer)
      };
      
      localStorage.setItem('user', JSON.stringify(userData));
      localStorage.setItem('authToken', 'sample-auth-token-' + Date.now());
      localStorage.setItem('userType', userType);
      
      // Show success message
      alert(`${userType === 'admin' ? 'Admin' : 'Customer'} login successful!`);
      
      // Navigate based on user type
      if (userType === 'admin') {
        navigate('/admin/dashboard'); // Navigate to admin dashboard
      } else {
        navigate('/'); // Navigate to home page for customers
      }
      
      // Reload to update header state
      window.location.reload();
      
    } else {
      // Sign Up Logic (only for customers)
      if (formData.password !== formData.confirmPassword) {
        alert('Passwords do not match!');
        return;
      }
      
      console.log('Customer Signup:', formData);
      
      // Store user data in localStorage
      const userData = {
        name: formData.name,
        email: formData.email,
        id: Date.now().toString(),
        userType: 'customer' // New accounts are always customers
      };
      
      localStorage.setItem('user', JSON.stringify(userData));
      localStorage.setItem('authToken', 'sample-auth-token-' + Date.now());
      localStorage.setItem('userType', 'customer');
      
      // Show success message
      alert('Account created successfully!');
      
      // Navigate to home page
      navigate('/');
      
      // Reload to update header state
      window.location.reload();
    }
  };

  const handleUserTypeChange = (type) => {
    setUserType(type);
    setIsLogin(true); // Reset to login mode when switching user type
    setFormData({
      name: '',
      email: '',
      password: '',
      confirmPassword: ''
    });
    setShowPassword(false);
  };

  const toggleMode = () => {
    setIsLogin(!isLogin);
    setFormData({
      name: '',
      email: '',
      password: '',
      confirmPassword: ''
    });
    setShowPassword(false);
  };

  return (
    <div className="min-h-screen bg-linear-to-br from-slate-900 via-amber-900 to-slate-900 flex items-center justify-center p-4">
      {/* Background Decorations */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 left-10 w-72 h-72 bg-amber-500 rounded-full mix-blend-multiply filter blur-3xl opacity-10"></div>
        <div className="absolute bottom-20 right-10 w-72 h-72 bg-amber-400 rounded-full mix-blend-multiply filter blur-3xl opacity-10"></div>
      </div>

      <div className="relative w-full max-w-md">
        {/* Logo Section */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-linear-to-br from-amber-400 to-amber-600 rounded-full mb-4 shadow-2xl">
            <Gem className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-3xl font-bold text-white mb-2">JewelMart</h1>
          <p className="text-amber-200 text-sm">Your Precious Jewelry Destination</p>
        </div>

        {/* Form Card */}
        <div className="bg-white rounded-2xl shadow-2xl p-8 backdrop-blur-lg">
          {/* User Type Toggle (Admin/Customer) */}
          <div className="flex gap-2 mb-6 bg-slate-100 p-1 rounded-lg">
            <button
              type="button"
              onClick={() => handleUserTypeChange('customer')}
              className={`flex-1 py-3 px-4 rounded-lg font-semibold transition-all duration-300 flex items-center justify-center gap-2 ${
                userType === 'customer'
                  ? 'bg-linear-to-r from-amber-500 to-amber-600 text-white shadow-md'
                  : 'text-slate-600 hover:text-slate-800'
              }`}
            >
              <ShoppingBag className="w-4 h-4" />
              Customer
            </button>
            <button
              type="button"
              onClick={() => handleUserTypeChange('admin')}
              className={`flex-1 py-3 px-4 rounded-lg font-semibold transition-all duration-300 flex items-center justify-center gap-2 ${
                userType === 'admin'
                  ? 'bg-linear-to-r from-amber-500 to-amber-600 text-white shadow-md'
                  : 'text-slate-600 hover:text-slate-800'
              }`}
            >
              <Shield className="w-4 h-4" />
              Admin
            </button>
          </div>

        
          {/* Form Title */}
          <h2 className="text-2xl font-bold text-slate-800 mb-6">
            {userType === 'admin' 
              ? 'Admin Login' 
              : isLogin 
                ? 'Welcome Back!' 
                : 'Create Account'}
          </h2>

          {/* Admin Notice */}
          {userType === 'admin' && (
            <div className="mb-6 p-4 bg-amber-50 border border-amber-200 rounded-lg flex items-start gap-3">
              <Shield className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
              <div>
                <p className="text-sm font-semibold text-amber-900">Admin Access Only</p>
                <p className="text-xs text-amber-700 mt-1">Please use your administrator credentials to continue.</p>
              </div>
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Name Field (Customer Sign Up Only) */}
            {userType === 'customer' && !isLogin && (
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Full Name
                </label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-slate-400" />
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="John Doe"
                    required
                    className="w-full pl-11 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-all"
                  />
                </div>
              </div>
            )}

            {/* Email Field */}
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                Email Address
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-slate-400" />
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder={userType === 'admin' ? 'admin@jewelmart.com' : 'you@example.com'}
                  required
                  className="w-full pl-11 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-all"
                />
              </div>
            </div>

            {/* Password Field */}
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                Password
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-slate-400" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="••••••••"
                  required
                  className="w-full pl-11 pr-12 py-3 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-all"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-slate-400 hover:text-slate-600"
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
            </div>

            {/* Confirm Password Field (Customer Sign Up Only) */}
            {userType === 'customer' && !isLogin && (
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Confirm Password
                </label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-slate-400" />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    placeholder="••••••••"
                    required
                    className="w-full pl-11 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-all"
                  />
                </div>
              </div>
            )}

            {/* Remember Me & Forgot Password (Login Only) */}
            {isLogin && (
              <div className="flex items-center justify-between text-sm">
                <label className="flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    className="w-4 h-4 text-amber-600 border-slate-300 rounded focus:ring-amber-500"
                  />
                  <span className="ml-2 text-slate-600">Remember me</span>
                </label>
                <button type="button" className="text-amber-600 hover:text-amber-700 font-medium">
                  Forgot Password?
                </button>
              </div>
            )}

            {/* Terms & Conditions (Customer Sign Up Only) */}
            {userType === 'customer' && !isLogin && (
              <div className="flex items-start">
                <input
                  type="checkbox"
                  required
                  className="w-4 h-4 mt-1 text-amber-600 border-slate-300 rounded focus:ring-amber-500"
                />
                <span className="ml-2 text-sm text-slate-600">
                  I agree to the{' '}
                  <button type="button" className="text-amber-600 hover:text-amber-700 font-medium">
                    Terms & Conditions
                  </button>{' '}
                  and{' '}
                  <button type="button" className="text-amber-600 hover:text-amber-700 font-medium">
                    Privacy Policy
                  </button>
                </span>
              </div>
            )}

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full flex items-center justify-center gap-2 py-3 px-4 bg-linear-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-white font-semibold rounded-lg transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
            >
              {userType === 'admin' ? (
                <>
                  <Shield className="w-5 h-5" />
                  Admin Login
                </>
              ) : isLogin ? (
                <>
                  Sign In
                  <ArrowRight className="w-5 h-5" />
                </>
              ) : (
                <>
                  Create Account
                  <ArrowRight className="w-5 h-5" />
                </>
              )}
            </button>
          </form>

          {/* Social Login (Customer Only) */}
          {userType === 'customer' && isLogin && (
            <div className="mt-6">
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-slate-200"></div>
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-4 bg-white text-slate-500">Or continue with</span>
                </div>
              </div>

              <div className="mt-4 grid grid-cols-2 gap-3">
                <button type="button" className="flex items-center justify-center gap-2 px-4 py-2 border border-slate-200 rounded-lg hover:bg-slate-50 transition-all">
                  <svg className="w-5 h-5" viewBox="0 0 24 24">
                    <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                    <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                    <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                    <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                  </svg>
                  <span className="text-sm font-medium text-slate-700">Google</span>
                </button>

                <button type="button" className="flex items-center justify-center gap-2 px-4 py-2 border border-slate-200 rounded-lg hover:bg-slate-50 transition-all">
                  <svg className="w-5 h-5" fill="#1877F2" viewBox="0 0 24 24">
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                  </svg>
                  <span className="text-sm font-medium text-slate-700">Facebook</span>
                </button>
              </div>
            </div>
          )}

          {/* Toggle Link (Customer Only) */}
          {userType === 'customer' && (
            <p className="mt-6 text-center text-sm text-slate-600">
              {isLogin ? "Don't have an account? " : 'Already have an account? '}
              <button
                type="button"
                onClick={toggleMode}
                className="text-amber-600 hover:text-amber-700 font-semibold"
              >
                {isLogin ? 'Sign Up' : 'Sign In'}
              </button>
            </p>
          )}
        </div>

        {/* Footer */}
        <p className="text-center text-xs text-amber-200 mt-6">
          © 2026 JewelMart. All rights reserved.
        </p>
      </div>
    </div>
  );
}