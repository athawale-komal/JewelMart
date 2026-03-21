/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { updateUserProfile, changePassword, getUserProfile } from '../States/Auth/Action';
import { User, Mail, Phone, MapPin, Edit2, Save, X, Camera, ArrowRight, Shield, Lock, Loader2, CheckCircle2 } from 'lucide-react';
import { toast } from 'react-toastify';

const Profile = () => {
  const dispatch = useDispatch();
  const { user, loading, error } = useSelector(state => state.auth);

  const [isEditing, setIsEditing] = useState(false);
  const [isChangingPassword, setIsChangingPassword] = useState(false);

  const [formData, setFormData] = useState({
    name: '',
    surname: '',
    email: '',
    mobile: '',
    address: '',
    city: '',
    state: '',
    pincode: ''
  });

  const [passwordData, setPasswordData] = useState({
    oldPassword: '',
    newPassword: '',
    confirmPassword: ''
  });

  useEffect(() => {
    dispatch(getUserProfile());
  }, [dispatch]);

  useEffect(() => {
    if (user) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setFormData({
        name: user.name || '',
        surname: user.surname || '',
        email: user.email || '',
        mobile: user.mobile || '',
        address: user.address || '',
        city: user.city || '',
        state: user.state || '',
        pincode: user.pincode || ''
      });
    }
  }, [user]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handlePasswordChange = (e) => {
    setPasswordData({ ...passwordData, [e.target.name]: e.target.value });
  };

  const handleSaveProfile = async (e) => {
    e.preventDefault();
    try {
      await dispatch(updateUserProfile(formData));
      setIsEditing(false);
      toast.success('Profile updated successfully!');
    } catch (err) {
      toast.error(err.message || 'Failed to update profile');
    }
  };

  const handleChangePassword = async (e) => {
    e.preventDefault();
    if (passwordData.newPassword !== passwordData.confirmPassword) {
      toast.error('Passwords do not match.');
      return;
    }
    try {
      await dispatch(changePassword({
        oldPassword: passwordData.oldPassword,
        newPassword: passwordData.newPassword
      }));
      setIsChangingPassword(false);
      setPasswordData({ oldPassword: '', newPassword: '', confirmPassword: '' });
      toast.success('Password changed successfully!');
    } catch (err) {
      toast.error(err.message || 'Failed to change password');
    }
  };

  const handlePhotoUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const uploadData = new FormData();
    uploadData.append('photo', file);

    try {
      await dispatch(updateUserProfile(uploadData));
      toast.success('Photo updated successfully!');
    } catch (err) {
      toast.error('Failed to upload photo');
    }
  };

  if (loading && !user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50">
        <Loader2 className="w-10 h-10 text-amber-600 animate-spin" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-linear-to-b from-white via-amber-50/30 to-white pt-24 pb-20">
      <div className=" px-6 lg:px-14">
        {/* Header Section */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <div className="inline-flex items-center gap-2 bg-amber-600/10 text-amber-700 px-3 py-1 rounded-full mb-4 border border-amber-200">
              <Shield className="w-4 h-4" />
              <span className="text-[10px] font-bold tracking-widest uppercase">Secure Account</span>
            </div>
            <h1 className="text-4xl font-bold text-slate-900 tracking-tight">Your Profile</h1>
            <p className="text-slate-500 mt-2">Manage your personal information and account security.</p>
          </div>

          <div className="flex gap-3">
            {!isEditing ? (
              <button
                onClick={() => setIsEditing(true)}
                className="flex items-center gap-2 px-6 py-3 bg-white text-slate-700 border border-slate-200 rounded-2xl font-bold hover:bg-slate-50 hover:border-amber-300 transition-all shadow-sm"
              >
                <Edit2 size={16} className="text-amber-600" />
                Edit Details
              </button>
            ) : (
              <div className="flex gap-2">
                <button
                  onClick={handleSaveProfile}
                  className="flex items-center gap-2 px-6 py-3 bg-amber-600 text-white rounded-2xl font-bold hover:bg-amber-700 transition-all shadow-md shadow-amber-200"
                >
                  <Save size={16} />
                  Save Changes
                </button>
                <button
                  onClick={() => { setIsEditing(false); dispatch(getUserProfile()); }}
                  className="flex items-center gap-2 px-6 py-3 bg-slate-100 text-slate-600 rounded-2xl font-bold hover:bg-slate-200 transition-all"
                >
                  <X size={16} />
                  Cancel
                </button>
              </div>
            )}
          </div>
        </div>

        <div className="grid lg:grid-cols-12 gap-8">
          {/* Left Column: Avatar and Quick Stats */}
          <div className="lg:col-span-4 lg:sticky lg:top-28 self-start">
            <div className="bg-white rounded-[2.5rem] shadow-2xl shadow-slate-200/50 p-8 border border-slate-100 overflow-hidden relative">
              <div className="absolute top-0 right-0 w-32 h-32 bg-amber-100/50 rounded-full blur-3xl -mr-16 -mt-16" />

              {/* Avatar */}
              <div className="relative w-40 h-40 mx-auto mb-8 z-10">
                <div className="w-full h-full rounded-[2.5rem] bg-linear-to-br from-amber-500 to-orange-600 flex items-center justify-center text-white text-5xl font-bold shadow-xl overflow-hidden border-4 border-white">
                  {user?.photo ? (
                    <img src={user.photo} alt={user.name} className="w-full h-full object-cover" />
                  ) : (
                    <span>{user?.name?.[0].toUpperCase()}</span>
                  )}
                </div>
                <label className="absolute -bottom-2 -right-2 w-12 h-12 bg-white rounded-2xl shadow-xl border border-amber-100 flex items-center justify-center cursor-pointer hover:bg-amber-50 hover:scale-110 transition-all">
                  <Camera size={20} className="text-amber-600" />
                  <input type="file" className="hidden" onChange={handlePhotoUpload} accept="image/*" />
                </label>
              </div>

              <div className="text-center mb-8 relative z-10">
                <h2 className="text-2xl font-bold text-slate-900 mb-1">{user?.name} {user?.surname}</h2>
                <p className="text-amber-600 font-semibold text-sm tracking-wide uppercase">{user?.role || 'Customer'}</p>
              </div>

              <div className="space-y-4 relative z-10">
                <div className="flex items-center gap-4 p-4 bg-slate-50 rounded-2xl border border-slate-100 transition-all hover:border-amber-200">
                  <div className="w-10 h-10 rounded-xl bg-white flex items-center justify-center shadow-sm">
                    <Mail size={18} className="text-amber-600" />
                  </div>
                  <div className="min-w-0">
                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Email</p>
                    <p className="text-sm font-bold text-slate-700 truncate">{user?.email}</p>
                  </div>
                </div>

                <div className="flex items-center gap-4 p-4 bg-slate-50 rounded-2xl border border-slate-100 transition-all hover:border-amber-200">
                  <div className="w-10 h-10 rounded-xl bg-white flex items-center justify-center shadow-sm">
                    <Phone size={18} className="text-amber-600" />
                  </div>
                  <div>
                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Mobile</p>
                    <p className="text-sm font-bold text-slate-700">{user?.mobile || 'Not provided'}</p>
                  </div>
                </div>
              </div>

              <div className="mt-8 pt-8 border-t border-dashed border-slate-200">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">Verification Status</span>
                  <CheckCircle2 size={16} className="text-emerald-500" />
                </div>
                <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
                  <div className="w-[85%] h-full bg-linear-to-r from-emerald-400 to-emerald-600 rounded-full" />
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Information Forms */}
          <div className="lg:col-span-8 space-y-8">
            {/* Personal Info Form */}
            <div className="bg-white rounded-[2.5rem] shadow-xl shadow-slate-200/40 p-8 border border-slate-100">
              <h3 className="text-xl font-bold text-slate-900 mb-8 flex items-center gap-3">
                <div className="w-1.5 h-6 bg-amber-500 rounded-full" />
                Personal Information
              </h3>

              <form className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-slate-400 uppercase tracking-widest ml-1">First Name</label>
                    <div className="relative group">
                      <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-300 group-focus-within:text-amber-500 transition-colors" />
                      <input
                        type="text" name="name" value={formData.name} onChange={handleChange} disabled={!isEditing}
                        className="w-full pl-12 pr-4 py-4 bg-slate-50 border border-slate-100 rounded-2xl outline-none focus:bg-white focus:border-amber-500 focus:ring-4 focus:ring-amber-500/10 transition-all font-semibold text-slate-700 disabled:opacity-70"
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-slate-400 uppercase tracking-widest ml-1">Surname</label>
                    <div className="relative group">
                      <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-300 group-focus-within:text-amber-500 transition-colors" />
                      <input
                        type="text" name="surname" value={formData.surname} onChange={handleChange} disabled={!isEditing}
                        className="w-full pl-12 pr-4 py-4 bg-slate-50 border border-slate-100 rounded-2xl outline-none focus:bg-white focus:border-amber-500 focus:ring-4 focus:ring-amber-500/10 transition-all font-semibold text-slate-700 disabled:opacity-70"
                      />
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-bold text-slate-400 uppercase tracking-widest ml-1">Delivery Address</label>
                  <div className="relative group">
                    <MapPin className="absolute left-4 top-5 w-5 h-5 text-slate-300 group-focus-within:text-amber-500 transition-colors" />
                    <textarea
                      name="address" value={formData.address} onChange={handleChange} disabled={!isEditing} rows="3"
                      className="w-full pl-12 pr-4 py-4 bg-slate-50 border border-slate-100 rounded-2xl outline-none focus:bg-white focus:border-amber-500 focus:ring-4 focus:ring-amber-500/10 transition-all font-semibold text-slate-700 disabled:opacity-70 resize-none"
                    />
                  </div>
                </div>

                <div className="grid md:grid-cols-3 gap-6">
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-slate-400 uppercase tracking-widest ml-1">City</label>
                    <input
                      type="text" name="city" value={formData.city} onChange={handleChange} disabled={!isEditing}
                      className="w-full px-5 py-4 bg-slate-50 border border-slate-100 rounded-2xl outline-none focus:bg-white focus:border-amber-500 focus:ring-4 focus:ring-amber-500/10 transition-all font-semibold text-slate-700 disabled:opacity-70"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-slate-400 uppercase tracking-widest ml-1">State</label>
                    <input
                      type="text" name="state" value={formData.state} onChange={handleChange} disabled={!isEditing}
                      className="w-full px-5 py-4 bg-slate-50 border border-slate-100 rounded-2xl outline-none focus:bg-white focus:border-amber-500 focus:ring-4 focus:ring-amber-500/10 transition-all font-semibold text-slate-700 disabled:opacity-70"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-slate-400 uppercase tracking-widest ml-1">Pincode</label>
                    <input
                      type="text" name="pincode" value={formData.pincode} onChange={handleChange} disabled={!isEditing}
                      className="w-full px-5 py-4 bg-slate-50 border border-slate-100 rounded-2xl outline-none focus:bg-white focus:border-amber-500 focus:ring-4 focus:ring-amber-500/10 transition-all font-semibold text-slate-700 disabled:opacity-70"
                    />
                  </div>
                </div>
              </form>
            </div>

            {/* Password Section */}
            <div className="bg-white rounded-[2.5rem] shadow-xl shadow-slate-200/40 border border-slate-100 overflow-hidden">
              {!isChangingPassword ? (
                <button
                  onClick={() => setIsChangingPassword(true)}
                  className="w-full p-8 flex items-center justify-between group hover:bg-slate-50 transition-all"
                >
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-2xl bg-amber-50 flex items-center justify-center group-hover:bg-amber-100 transition-colors">
                      <Lock size={20} className="text-amber-600" />
                    </div>
                    <div className="text-left">
                      <h3 className="text-xl font-bold text-slate-900">Security Settings</h3>
                      <p className="text-sm text-slate-500">Update your password to keep your account safe.</p>
                    </div>
                  </div>
                  <ArrowRight size={20} className="text-slate-300 group-hover:text-amber-600 group-hover:translate-x-1 transition-all" />
                </button>
              ) : (
                <div className="p-8">
                  <div className="flex items-center justify-between mb-8">
                    <h3 className="text-xl font-bold text-slate-900 flex items-center gap-3">
                      <div className="w-1.5 h-6 bg-amber-500 rounded-full" />
                      Change Password
                    </h3>
                    <button onClick={() => setIsChangingPassword(false)} className="p-2 hover:bg-slate-100 rounded-full transition-colors">
                      <X size={20} className="text-slate-400" />
                    </button>
                  </div>

                  <form onSubmit={handleChangePassword} className="space-y-6">
                    <div className="space-y-2">
                      <label className="text-xs font-bold text-slate-400 uppercase tracking-widest ml-1">Current Password</label>
                      <input
                        type="password" name="oldPassword" value={passwordData.oldPassword} onChange={handlePasswordChange} required
                        className="w-full px-5 py-4 bg-slate-50 border border-slate-100 rounded-2xl outline-none focus:bg-white focus:border-amber-500 focus:ring-4 focus:ring-amber-500/10 transition-all font-semibold text-slate-700"
                      />
                    </div>
                    <div className="grid md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <label className="text-xs font-bold text-slate-400 uppercase tracking-widest ml-1">New Password</label>
                        <input
                          type="password" name="newPassword" value={passwordData.newPassword} onChange={handlePasswordChange} required
                          className="w-full px-5 py-4 bg-slate-50 border border-slate-100 rounded-2xl outline-none focus:bg-white focus:border-amber-500 focus:ring-4 focus:ring-amber-500/10 transition-all font-semibold text-slate-700"
                        />
                      </div>
                      <div className="space-y-2">
                        <label className="text-xs font-bold text-slate-400 uppercase tracking-widest ml-1">Confirm Password</label>
                        <input
                          type="password" name="confirmPassword" value={passwordData.confirmPassword} onChange={handlePasswordChange} required
                          className="w-full px-5 py-4 bg-slate-50 border border-slate-100 rounded-2xl outline-none focus:bg-white focus:border-amber-500 focus:ring-4 focus:ring-amber-500/10 transition-all font-semibold text-slate-700"
                        />
                      </div>
                    </div>
                    {passwordData.confirmPassword && (
                      <p className={`text-xs mt-2 font-medium tracking-wide ${passwordData.newPassword === passwordData.confirmPassword ? "text-emerald-500" : "text-red-500"}`}>
                        {passwordData.newPassword === passwordData.confirmPassword ? "✓ Passwords match" : "✗ Passwords do not match."}
                      </p>
                    )}
                    <button
                      type="submit"
                      className="w-full py-4 bg-slate-900 text-white font-bold rounded-2xl hover:bg-slate-800 transition-all shadow-xl shadow-slate-200 mt-4"
                    >
                      Update Password
                    </button>
                  </form>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;