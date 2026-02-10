import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { User, Mail, Phone, MapPin, Edit2, Save, X, Camera, Shield } from 'lucide-react';

const Profile = () => {
  const [user, setUser] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    state: '',
    pincode: ''
  });
  const navigate = useNavigate();

  useEffect(() => {
    // Check if user is logged in
    const userData = localStorage.getItem('user');
    if (!userData) {
      navigate('/login');
      return;
    }

    const parsedUser = JSON.parse(userData);
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setUser(parsedUser);
    
    // Load profile data from localStorage or set defaults
    const profileData = localStorage.getItem('profileData');
    if (profileData) {
      setFormData(JSON.parse(profileData));
    } else {
      setFormData({
        name: parsedUser.name || '',
        email: parsedUser.email || '',
        phone: '',
        address: '',
        city: '',
        state: '',
        pincode: ''
      });
    }
  }, [navigate]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSave = () => {
    // Save profile data to localStorage
    localStorage.setItem('profileData', JSON.stringify(formData));
    
    // Update user data
    const updatedUser = {
      ...user,
      name: formData.name,
      email: formData.email
    };
    localStorage.setItem('user', JSON.stringify(updatedUser));
    setUser(updatedUser);
    
    setIsEditing(false);
    alert('Profile updated successfully!');
  };

  const handleCancel = () => {
    // Reset form to saved data
    const profileData = localStorage.getItem('profileData');
    if (profileData) {
      setFormData(JSON.parse(profileData));
    }
    setIsEditing(false);
  };

  if (!user) {
    return null;
  }

  return (
    <div className="min-h-screen bg-linear-to-b from-white via-amber-50/30 to-white pt-24">
      <div className="max-w-5xl mx-auto px-6 lg:px-20 py-12">
        {/* Header */}
        <div className="mb-12">
          <div className="inline-flex items-center gap-2 bg-linear-to-r from-amber-500 to-yellow-600 text-white px-4 py-2 rounded-full mb-4">
            <User className="w-5 h-5" />
            <span className="text-sm font-bold tracking-wide">MY ACCOUNT</span>
          </div>

          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            <span className="bg-linear-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">
              My Profile
            </span>
          </h1>

          <p className="text-lg text-gray-600">
            Manage your account information and preferences
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Profile Card */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl shadow-xl p-8 border border-stone-100">
              {/* Avatar */}
              <div className="relative w-32 h-32 mx-auto mb-6">
                <div className="w-full h-full rounded-full bg-linear-to-br from-amber-500 to-yellow-600 flex items-center justify-center text-white text-4xl font-bold">
                  {formData.name.charAt(0).toUpperCase()}
                </div>
                <button className="absolute bottom-0 right-0 w-10 h-10 bg-white rounded-full shadow-lg border-2 border-amber-500 flex items-center justify-center hover:bg-amber-50 transition-all">
                  <Camera className="w-5 h-5 text-amber-600" />
                </button>
              </div>

              <div className="text-center mb-6">
                <h2 className="text-2xl font-bold text-gray-900 mb-1">
                  {formData.name}
                </h2>
                <p className="text-gray-600 text-sm">
                  {formData.email}
                </p>
              </div>

              <div className="space-y-3">
                <div className="flex items-center gap-3 text-sm text-gray-600">
                  <Shield className="w-4 h-4 text-amber-600" />
                  <span>Member since 2026</span>
                </div>
                <div className="flex items-center gap-3 text-sm text-gray-600">
                  <Mail className="w-4 h-4 text-amber-600" />
                  <span>Verified Email</span>
                </div>
              </div>

              <div className="mt-6 pt-6 border-t border-stone-100">
                <div className="bg-linear-to-r from-amber-50 to-yellow-50 rounded-lg p-4 border border-amber-200">
                  <p className="text-xs font-bold text-amber-900 mb-1">Gold Member</p>
                  <p className="text-xs text-amber-700">Special discounts on all purchases</p>
                </div>
              </div>
            </div>
          </div>

          {/* Profile Form */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-2xl shadow-xl p-8 border border-stone-100">
              <div className="flex items-center justify-between mb-8">
                <h2 className="text-2xl font-bold text-gray-900">
                  Personal Information
                </h2>
                {!isEditing ? (
                  <button
                    onClick={() => setIsEditing(true)}
                    className="flex items-center gap-2 px-4 py-2 bg-amber-50 text-amber-700 border border-amber-200 rounded-lg font-semibold hover:bg-amber-100 transition-all"
                  >
                    <Edit2 className="w-4 h-4" />
                    Edit Profile
                  </button>
                ) : (
                  <div className="flex gap-2">
                    <button
                      onClick={handleSave}
                      className="flex items-center gap-2 px-4 py-2 bg-linear-to-r from-amber-500 to-yellow-600 text-white rounded-lg font-semibold hover:from-amber-600 hover:to-yellow-700 transition-all"
                    >
                      <Save className="w-4 h-4" />
                      Save
                    </button>
                    <button
                      onClick={handleCancel}
                      className="flex items-center gap-2 px-4 py-2 bg-gray-100 text-gray-700 rounded-lg font-semibold hover:bg-gray-200 transition-all"
                    >
                      <X className="w-4 h-4" />
                      Cancel
                    </button>
                  </div>
                )}
              </div>

              <form className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Full Name
                    </label>
                    <div className="relative">
                      <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        disabled={!isEditing}
                        className={`w-full pl-11 pr-4 py-3 border rounded-lg outline-none transition-all ${
                          isEditing
                            ? 'border-gray-200 focus:ring-2 focus:ring-amber-500/30 focus:border-amber-500'
                            : 'border-gray-100 bg-gray-50 cursor-not-allowed'
                        }`}
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Email Address
                    </label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        disabled={!isEditing}
                        className={`w-full pl-11 pr-4 py-3 border rounded-lg outline-none transition-all ${
                          isEditing
                            ? 'border-gray-200 focus:ring-2 focus:ring-amber-500/30 focus:border-amber-500'
                            : 'border-gray-100 bg-gray-50 cursor-not-allowed'
                        }`}
                      />
                    </div>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Phone Number
                  </label>
                  <div className="relative">
                    <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      disabled={!isEditing}
                      placeholder="+91 98765 43210"
                      className={`w-full pl-11 pr-4 py-3 border rounded-lg outline-none transition-all ${
                        isEditing
                          ? 'border-gray-200 focus:ring-2 focus:ring-amber-500/30 focus:border-amber-500'
                          : 'border-gray-100 bg-gray-50 cursor-not-allowed'
                      }`}
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Address
                  </label>
                  <div className="relative">
                    <MapPin className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
                    <textarea
                      name="address"
                      value={formData.address}
                      onChange={handleChange}
                      disabled={!isEditing}
                      rows="3"
                      placeholder="Enter your address"
                      className={`w-full pl-11 pr-4 py-3 border rounded-lg outline-none resize-none transition-all ${
                        isEditing
                          ? 'border-gray-200 focus:ring-2 focus:ring-amber-500/30 focus:border-amber-500'
                          : 'border-gray-100 bg-gray-50 cursor-not-allowed'
                      }`}
                    />
                  </div>
                </div>

                <div className="grid md:grid-cols-3 gap-6">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      City
                    </label>
                    <input
                      type="text"
                      name="city"
                      value={formData.city}
                      onChange={handleChange}
                      disabled={!isEditing}
                      placeholder="City"
                      className={`w-full px-4 py-3 border rounded-lg outline-none transition-all ${
                        isEditing
                          ? 'border-gray-200 focus:ring-2 focus:ring-amber-500/30 focus:border-amber-500'
                          : 'border-gray-100 bg-gray-50 cursor-not-allowed'
                      }`}
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      State
                    </label>
                    <input
                      type="text"
                      name="state"
                      value={formData.state}
                      onChange={handleChange}
                      disabled={!isEditing}
                      placeholder="State"
                      className={`w-full px-4 py-3 border rounded-lg outline-none transition-all ${
                        isEditing
                          ? 'border-gray-200 focus:ring-2 focus:ring-amber-500/30 focus:border-amber-500'
                          : 'border-gray-100 bg-gray-50 cursor-not-allowed'
                      }`}
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Pincode
                    </label>
                    <input
                      type="text"
                      name="pincode"
                      value={formData.pincode}
                      onChange={handleChange}
                      disabled={!isEditing}
                      placeholder="Pincode"
                      className={`w-full px-4 py-3 border rounded-lg outline-none transition-all ${
                        isEditing
                          ? 'border-gray-200 focus:ring-2 focus:ring-amber-500/30 focus:border-amber-500'
                          : 'border-gray-100 bg-gray-50 cursor-not-allowed'
                      }`}
                    />
                  </div>
                </div>
              </form>
            </div>

            {/* Additional Settings */}
            <div className="mt-8 bg-white rounded-2xl shadow-xl p-8 border border-stone-100">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">
                Account Settings
              </h2>

              <div className="space-y-4">
                <button className="w-full flex items-center justify-between px-4 py-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-all">
                  <span className="font-semibold text-gray-700">Change Password</span>
                  <Edit2 className="w-4 h-4 text-gray-600" />
                </button>

                <button className="w-full flex items-center justify-between px-4 py-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-all">
                  <span className="font-semibold text-gray-700">Email Preferences</span>
                  <Edit2 className="w-4 h-4 text-gray-600" />
                </button>

                <button className="w-full flex items-center justify-between px-4 py-3 bg-red-50 rounded-lg hover:bg-red-100 transition-all">
                  <span className="font-semibold text-red-700">Delete Account</span>
                  <X className="w-4 h-4 text-red-600" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;