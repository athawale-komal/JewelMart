// import { useState, useEffect, useRef } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { useNavigate } from "react-router-dom";
// import { registerUser, loginUser } from "../States/Auth/Action";
// import {
//   Eye,
//   EyeOff,
//   Check,
//   Upload,
//   User,
//   ShoppingBag,
//   Loader2,
//   Rocket,
//   Lock,
//   Repeat,
//   MessageCircle,
//   Shield,
//   Verified,
//   LockIcon
// } from "lucide-react";
// import { toast } from "react-toastify";

// const getStrength = (pw) => {
//   let s = 0;
//   if (pw.length >= 8) s++;
//   if (/[A-Z]/.test(pw)) s++;
//   if (/\d/.test(pw)) s++;
//   if (/[!@#$%^&*]/.test(pw)) s++;
//   return s;
// };

// const strengthMeta = [
//   { label: "", barClass: "bg-stone-100" },
//   { label: "Weak", barClass: "bg-red-400", textClass: "text-red-400" },
//   { label: "Fair", barClass: "bg-orange-400", textClass: "text-orange-400" },
//   { label: "Good", barClass: "bg-yellow-400", textClass: "text-yellow-500" },
//   { label: "Strong", barClass: "bg-emerald-500", textClass: "text-emerald-500" },
// ];

// const rules = [
//   { label: "8+ characters", test: (p) => p.length >= 8 },
//   { label: "Uppercase letter", test: (p) => /[A-Z]/.test(p) },
//   { label: "Number", test: (p) => /\d/.test(p) },
//   { label: "Symbol (!@#$%^&*)", test: (p) => /[!@#$%^&*]/.test(p) },
// ];

// const Label = ({ children }) => (
//   <label className="block text-xs font-semibold tracking-widest uppercase text-stone-400 mb-1.5">
//     {children}
//   </label>
// );

// const TextInput = ({ rightSlot, className = "", ...props }) => (
//   <div className="relative">
//     <input
//       {...props}
//       className={`w-full px-4 py-3 rounded-xl border border-stone-200 bg-white text-stone-800 text-sm placeholder-stone-300 outline-none transition-all duration-200 focus:border-amber-500 focus:ring-2 focus:ring-amber-500/10 ${rightSlot ? "pr-11" : ""} ${className}`}
//     />
//     {rightSlot && (
//       <div className="absolute right-3 top-1/2 -translate-y-1/2">
//         {rightSlot}
//       </div>
//     )}
//   </div>
// );

// export default function Login() {
//   const dispatch = useDispatch();
//   const navigate = useNavigate();
//   const { loading, error, user, isAuthenticated } = useSelector((s) => s.auth);

//   const [mode, setMode] = useState("login");
//   const [showPw, setShowPw] = useState(false);
//   const [showCPw, setShowCPw] = useState(false);
//   const [localError, setLocalError] = useState("");
//   const [success, setSuccess] = useState("");
//   const [photoPreview, setPhotoPreview] = useState(null);
//   const fileRef = useRef(null);

//   const [form, setForm] = useState({
//     name: "", surname: "", email: "", mobile: "",
//     password: "", confirmPassword: "", photo: "",
//   });

//   const [photoFile, setPhotoFile] = useState(null);

//   const strength = getStrength(form.password);
//   const isLogin = mode === "login";

//   useEffect(() => {

//     if (user) {

//       const userRole = user.role || user?.user?.role || user?.data?.role;
//       if (userRole === "ADMIN") {
//         toast.success('Welcome Admin! Redirecting to dashboard...', { autoClose: 2000 });
//         navigate("/admin", { replace: true });
//       } else if (userRole === "USER") {
//         toast.success('Welcome User! Redirecting to home...', { autoClose: 2000 });
//         navigate("/", { replace: true });
//       } else {
//         toast.warning('Logged in but no valid role found.', { autoClose: 3000 });
//       }
//     // eslint-disable-next-line no-empty
//     } else {
//     }
//   }, [user, isAuthenticated, navigate]);

//   const switchMode = (next) => {

//     if (next === mode) return;
//     setLocalError(""); setSuccess(""); setPhotoPreview(null); setPhotoFile(null);
//     setForm({ name: "", surname: "", email: "", mobile: "", password: "", confirmPassword: "", photo: "" });
//     setMode(next);
//   };

//   const handleChange = (e) => {
//     setLocalError("");
//     setForm((f) => ({ ...f, [e.target.name]: e.target.value }));
//   };

//   const handlePhoto = (e) => {
//     const file = e.target.files[0];
//     if (!file) return;
//     setPhotoFile(file);
//     // Show local preview instantly
//     const reader = new FileReader();
//     reader.onloadend = () => setPhotoPreview(reader.result);
//     reader.readAsDataURL(file);
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setLocalError(""); setSuccess("");

//     if (!isLogin) {
//       if (form.password !== form.confirmPassword) {
//         setLocalError("Passwords do not match.");
//         return;
//       }
//       if (strength < 4) {
//         setLocalError("Password doesn't meet all requirements yet.");
//         return;
//       }

//       // Build FormData so multer can read req.file on the backend
//       const formData = new FormData();
//       formData.append("name", form.name);
//       formData.append("surname", form.surname);
//       formData.append("email", form.email);
//       formData.append("mobile", form.mobile);
//       formData.append("password", form.password);
//       if (photoFile) {
//         formData.append("photo", photoFile);
//       }

//       try {
//         const res = await dispatch(registerUser(formData));

//         if (!res?.error) {
//           setSuccess("Account created! Redirecting...");
//         }
//       } catch (err) {
//         setLocalError(err.message || "Registration failed");
//       }
//     } else {
//       try {
//         const res = await dispatch(loginUser({
//           email: form.email,
//           password: form.password
//         }));

//         if (!res?.error) {
//           setSuccess("Welcome back! Redirecting...");
//         }
//       } catch (err) {
//         setLocalError(err.message || "Login failed");
//       }
//     }
//   };

//   useEffect(() => {
//     if (error) {
//       // eslint-disable-next-line react-hooks/set-state-in-effect
//       setLocalError(error);
//     }
//   }, [error]);

  

//   return (
//     <div className="min-h-screen flex bg-stone-50">
//       <div className="flex-1 flex items-start justify-center p-6 sm:p-10 overflow-y-auto">
//         <div className="w-full max-w-105 py-8">

//           {/* Mobile brand */}

//           {/* Mode tabs */}
//           <div className="flex bg-stone-100 rounded-2xl p-1 mb-8 gap-1">
//             {[
//               { key: "login", label: "Sign In" },
//               { key: "register", label: "Create Account" },
//             ].map(({ key, label }) => (
//               <button
//                 key={key}
//                 onClick={() => switchMode(key)}
//                 className={`flex-1 py-2.5 text-sm font-semibold rounded-xl transition-all duration-200 ${mode === key
//                   ? "bg-white text-stone-800 shadow-sm"
//                   : "text-stone-400 hover:text-stone-600"
//                   }`}
//               >
//                 {label}
//               </button>
//             ))}
//           </div>

//           {/* Heading */}
//           <div className="mb-6">
//             <h1 className="text-2xl font-bold text-stone-800 mb-1.5">
//               {isLogin ? "Welcome back 👋" : "Join ShopMart"}
//             </h1>
//             <p className="text-stone-400 text-sm leading-relaxed">
//               {isLogin
//                 ? "Sign in to access your orders, wishlist and more."
//                 : "Create your free account in under a minute."}
//             </p>
//           </div>

//           {/* Alerts */}
//           {localError && (
//             <div className="flex items-start gap-2.5 bg-red-50 border border-red-200 text-red-700 text-sm px-4 py-3 rounded-xl mb-5">
//               <span className="mt-0.5">⚠️</span>
//               <span>{localError}</span>
//             </div>
//           )}
//           {success && (
//             <div className="flex items-start gap-2.5 bg-emerald-50 border border-emerald-200 text-emerald-700 text-sm px-4 py-3 rounded-xl mb-5">
//               <span className="mt-0.5">✅</span>
//               <span>{success}</span>
//             </div>
//           )}

//           {/* ── FORM ── */}
//           <form onSubmit={handleSubmit} noValidate className="space-y-4">

//             {/* REGISTER ONLY */}
//             {!isLogin && (
//               <>
//                 {/* Name grid */}
//                 <div className="grid grid-cols-2 gap-3">
//                   <div>
//                     <Label>First Name</Label>
//                     <TextInput
//                       name="name" value={form.name} onChange={handleChange}
//                       placeholder="Jane" required
//                     />
//                   </div>
//                   <div>
//                     <Label>Last Name</Label>
//                     <TextInput
//                       name="surname" value={form.surname} onChange={handleChange}
//                       placeholder="Smith" required
//                     />
//                   </div>
//                 </div>

//                 {/* Mobile */}
//                 <div>
//                   <Label>
//                     Mobile{" "}
//                     <span className="normal-case tracking-normal font-normal text-stone-300">
//                       (optional)
//                     </span>
//                   </Label>
//                   <TextInput
//                     name="mobile" type="tel" value={form.mobile}
//                     onChange={handleChange} placeholder="+1 555 000 0000"
//                   />
//                 </div>

//                 {/* Photo Upload */}
//                 <div>
//                   <Label>
//                     Profile Photo{" "}
//                     <span className="normal-case tracking-normal font-normal text-stone-300">
//                       (optional)
//                     </span>
//                   </Label>
//                   <div className="flex items-center gap-4 p-3 rounded-xl border border-stone-200 bg-white">
//                     {/* Circle preview */}
//                     <div className="w-14 h-14 rounded-full bg-stone-100 border-2 border-dashed border-stone-200 overflow-hidden flex items-center justify-center shrink-0 transition-all duration-200">
//                       {photoPreview ? (
//                         <img src={photoPreview} alt="Preview" className="w-full h-full object-cover" />
//                       ) : (
//                         <User className="w-6 h-6 text-stone-300" />
//                       )}
//                     </div>
//                     {/* Controls */}
//                     <div className="flex-1">
//                       <div className="flex items-center gap-2 flex-wrap">
//                         <button
//                           type="button"
//                           onClick={() => fileRef.current?.click()}
//                           className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold text-stone-600 bg-stone-100 border border-stone-200 hover:bg-amber-50 hover:text-amber-700 hover:border-amber-300 transition-all duration-150"
//                         >
//                           <Upload className="w-3.5 h-3.5" />
//                           {photoPreview ? "Change photo" : "Upload photo"}
//                         </button>
//                         {photoPreview && (
//                           <button
//                             type="button"
//                             onClick={() => {
//                               setPhotoPreview(null);
//                               setPhotoFile(null);
//                               setForm((f) => ({ ...f, photo: "" }));
//                               if (fileRef.current) fileRef.current.value = "";
//                             }}
//                             className="text-xs text-red-400 hover:text-red-600 transition-colors underline underline-offset-2"
//                           >
//                             Remove
//                           </button>
//                         )}
//                       </div>
//                       <p className="text-xs text-stone-300 mt-1.5">JPG, PNG or GIF · max 5 MB</p>
//                     </div>
//                   </div>
//                   <input
//                     ref={fileRef} type="file" accept="image/*"
//                     onChange={handlePhoto} className="hidden"
//                   />
//                 </div>
//               </>
//             )}

//             {/* Email */}
//             <div>
//               <Label>Email</Label>
//               <TextInput
//                 name="email" type="email" value={form.email}
//                 onChange={handleChange} placeholder="jane@example.com" required
//               />
//             </div>

//             {/* Password */}
//             <div>
//               <Label>Password</Label>
//               <TextInput
//                 name="password"
//                 type={showPw ? "text" : "password"}
//                 value={form.password}
//                 onChange={handleChange}
//                 placeholder={isLogin ? "Your password" : "Create a strong password"}
//                 required
//                 rightSlot={
//                   <button
//                     type="button" onClick={() => setShowPw((v) => !v)}
//                     className="text-stone-400 hover:text-amber-500 transition-colors p-0.5"
//                   >
//                     {showPw ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
//                   </button>
//                 }
//               />

//               {/* Strength meter — register only */}
//               {!isLogin && form.password && (
//                 <div className="mt-3 space-y-2.5">
//                   {/* Bars */}
//                   <div className="flex gap-1.5">
//                     {[1, 2, 3, 4].map((i) => (
//                       <div
//                         key={i}
//                         className={`h-1.5 flex-1 rounded-full transition-all duration-300 ${i <= strength
//                           ? strengthMeta[strength].barClass
//                           : "bg-stone-100"
//                           }`}
//                       />
//                     ))}
//                   </div>
//                   {/* Label */}
//                   {strength > 0 && (
//                     <span className={`text-xs font-semibold ${strengthMeta[strength].textClass}`}>
//                       {strengthMeta[strength].label}
//                     </span>
//                   )}
//                   {/* Rules checklist */}
//                   <div className="grid grid-cols-2 gap-y-1.5 gap-x-2 pt-0.5">
//                     {rules.map((r) => {
//                       const pass = r.test(form.password);
//                       return (
//                         <div
//                           key={r.label}
//                           className={`flex items-center gap-1.5 text-xs transition-colors duration-200 ${pass ? "text-emerald-600" : "text-stone-400"
//                             }`}
//                         >
//                           <div
//                             className={`w-3.5 h-3.5 rounded-full border flex items-center justify-center shrink-0 transition-all duration-200 ${pass
//                               ? "bg-emerald-500 border-emerald-500 text-white"
//                               : "border-stone-200"
//                               }`}
//                           >
//                             {pass && <Check className="w-2.5 h-2.5 stroke-3" />}
//                           </div>
//                           {r.label}
//                         </div>
//                       );
//                     })}
//                   </div>
//                 </div>
//               )}
//             </div>

//             {/* Confirm Password — register only */}
//             {!isLogin && (
//               <div>
//                 <Label>Confirm Password</Label>
//                 <TextInput
//                   name="confirmPassword"
//                   type={showCPw ? "text" : "password"}
//                   value={form.confirmPassword}
//                   onChange={handleChange}
//                   placeholder="Repeat your password"
//                   rightSlot={
//                     <button
//                       type="button" onClick={() => setShowCPw((v) => !v)}
//                       className="text-stone-400 hover:text-amber-500 transition-colors p-0.5"
//                     >
//                       {showCPw ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
//                     </button>
//                   }
//                 />
//                 {form.confirmPassword && (
//                   <p className={`text-xs mt-1.5 font-medium ${form.password === form.confirmPassword
//                     ? "text-emerald-500"
//                     : "text-red-400"
//                     }`}>
//                     {form.password === form.confirmPassword
//                       ? "✓ Passwords match"
//                       : "✗ Passwords don't match"}
//                   </p>
//                 )}
//               </div>
//             )}

//             {/* Forgot password link */}
//             {isLogin && (
//               <div className="flex justify-end">
//                 <a
//                   href="/forgot-password"
//                   className="text-xs font-semibold text-amber-600 hover:text-amber-700 transition-colors"
//                 >
//                   Forgot password?
//                 </a>
//               </div>
//             )}

//             {/* Submit button */}
//             <button
//               type="submit"
//               disabled={loading}
//               className={`w-full mt-2 py-3.5 rounded-xl text-sm font-bold tracking-wide flex items-center justify-center gap-2 transition-all duration-200 shadow-sm hover:shadow-md active:scale-[0.99] disabled:opacity-60 disabled:cursor-not-allowed ${isLogin
//                 ? "bg-stone-900 text-white hover:bg-stone-800"
//                 : "bg-amber-500 text-stone-900 hover:bg-amber-400"
//                 }`}
//             >
//               {loading && <Loader2 className="w-4 h-4 animate-spin" />}
//               {loading
//                 ? isLogin ? "Signing in…" : "Creating account…"
//                 : isLogin ? "Sign In →" : "Create Account →"}
//             </button>
//           </form>

//           {/* Switch mode */}
//           <p className="text-center text-sm text-stone-400 mt-6">
//             {isLogin ? "Don't have an account? " : "Already a member? "}
//             <button
//               onClick={() => switchMode(isLogin ? "register" : "login")}
//               className="font-semibold text-amber-600 hover:text-amber-700 transition-colors"
//             >
//               {isLogin ? "Sign up free" : "Sign in"}
//             </button>
//           </p>

//           {/* Trust strip */}
//           <div className="flex items-center justify-center gap-6 mt-8 pt-6 border-t border-stone-100">
//             {[
//               { icon: Shield, label: "SSL Secure" },
//               { icon: Verified, label: "Verified" },
//               { icon: LockIcon, label: "Private" }
//             // eslint-disable-next-line no-unused-vars
//             ].map(({ icon: Icon, label }) => (
//               <span key={label} className="flex items-center gap-1 text-xs text-stone-300 font-medium">
//                 <Icon className="w-3 h-3" />
//                 {label}
//               </span>
//             ))}
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

import { useState, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { registerUser, loginUser } from '../states/Auth/Action';
import {
  Gem, Mail, Lock, User, Eye, EyeOff, ArrowRight, Shield, ShoppingBag,
  Check, Upload, Loader2, Rocket, Repeat, MessageCircle, Verified, LockIcon
} from 'lucide-react';
import { toast } from 'react-toastify';

const getStrength = (pw) => {
  let s = 0;
  if (pw.length >= 8) s++;
  if (/[A-Z]/.test(pw)) s++;
  if (/\d/.test(pw)) s++;
  if (/[!@#$%^&*]/.test(pw)) s++;
  return s;
};

const strengthMeta = [
  { label: "", barClass: "bg-stone-100" },
  { label: "Weak", barClass: "bg-red-400", textClass: "text-red-400" },
  { label: "Fair", barClass: "bg-orange-400", textClass: "text-orange-400" },
  { label: "Good", barClass: "bg-yellow-400", textClass: "text-yellow-500" },
  { label: "Strong", barClass: "bg-emerald-500", textClass: "text-emerald-500" },
];

const rules = [
  { label: "8+ characters", test: (p) => p.length >= 8 },
  { label: "Uppercase letter", test: (p) => /[A-Z]/.test(p) },
  { label: "Number", test: (p) => /\d/.test(p) },
  { label: "Symbol (!@#$%^&*)", test: (p) => /[!@#$%^&*]/.test(p) },
];

const Label = ({ children }) => (
  <label className="block text-xs font-semibold tracking-widest uppercase text-stone-400 mb-1.5">
    {children}
  </label>
);

const TextInput = ({ rightSlot, className = "", ...props }) => (
  <div className="relative">
    <input
      {...props}
      className={`w-full px-4 py-3 rounded-xl border border-stone-200 bg-white text-stone-800 text-sm placeholder-stone-300 outline-none transition-all duration-200 focus:border-amber-500 focus:ring-2 focus:ring-amber-500/10 ${rightSlot ? "pr-11" : ""} ${className}`}
    />
    {rightSlot && (
      <div className="absolute right-3 top-1/2 -translate-y-1/2">
        {rightSlot}
      </div>
    )}
  </div>
);

export default function Login() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, error, user, isAuthenticated } = useSelector((s) => s.auth);

  const [userType, setUserType] = useState('customer');
  const [mode, setMode] = useState('login');
  const [showPw, setShowPw] = useState(false);
  const [showCPw, setShowCPw] = useState(false);
  const [localError, setLocalError] = useState("");
  const [success, setSuccess] = useState("");
  const [photoPreview, setPhotoPreview] = useState(null);
  const fileRef = useRef(null);

  const [form, setForm] = useState({
    name: "",
    surname: "",
    email: "",
    mobile: "",
    password: "",
    confirmPassword: "",
    photo: "",
  });

  const [photoFile, setPhotoFile] = useState(null);

  const strength = getStrength(form.password);
  const isLogin = mode === 'login';

  // Handle successful authentication
  useEffect(() => {
    if (user) {
      const userRole = user.role || user?.user?.role || user?.data?.role;
      if (userRole === "ADMIN") {
        toast.success('Welcome Admin! Redirecting to dashboard...', { autoClose: 2000 });
        navigate("/admin", { replace: true });
      } else if (userRole === "USER") {
        toast.success('Welcome User! Redirecting to home...', { autoClose: 2000 });
        navigate("/", { replace: true });
      } else {
        toast.warning('Logged in but no valid role found.', { autoClose: 3000 });
      }
    }
  }, [user, isAuthenticated, navigate]);

  // Handle error updates
  useEffect(() => {
    if (error) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setLocalError(error);
    }
  }, [error]);

  const switchMode = (next) => {
    if (next === mode) return;
    setLocalError("");
    setSuccess("");
    setPhotoPreview(null);
    setPhotoFile(null);
    setForm({
      name: "",
      surname: "",
      email: "",
      mobile: "",
      password: "",
      confirmPassword: "",
      photo: "",
    });
    setMode(next);
  };

  const handleUserTypeChange = (type) => {
    setUserType(type);
    setMode('login');
    setLocalError("");
    setSuccess("");
    setPhotoPreview(null);
    setPhotoFile(null);
    setForm({
      name: "",
      surname: "",
      email: "",
      mobile: "",
      password: "",
      confirmPassword: "",
      photo: "",
    });
    setShowPw(false);
    setShowCPw(false);
  };

  const handleChange = (e) => {
    setLocalError("");
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }));
  };

  const handlePhoto = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setPhotoFile(file);
    const reader = new FileReader();
    reader.onloadend = () => setPhotoPreview(reader.result);
    reader.readAsDataURL(file);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLocalError("");
    setSuccess("");

    if (!isLogin) {
      // Register validation
      if (form.password !== form.confirmPassword) {
        setLocalError("Passwords do not match.");
        return;
      }
      if (strength < 4) {
        setLocalError("Password doesn't meet all requirements yet.");
        return;
      }

      const formData = new FormData();
      formData.append("name", form.name);
      formData.append("surname", form.surname);
      formData.append("email", form.email);
      formData.append("mobile", form.mobile);
      formData.append("password", form.password);
      if (photoFile) {
        formData.append("photo", photoFile);
      }

      try {
        const res = await dispatch(registerUser(formData));
        if (!res?.error) {
          setSuccess("Account created! Redirecting...");
        }
      } catch (err) {
        setLocalError(err.message || "Registration failed");
      }
    } else {
      // Login
      try {
        const res = await dispatch(loginUser({
          email: form.email,
          password: form.password
        }));
        if (!res?.error) {
          setSuccess("Welcome back! Redirecting...");
        }
      } catch (err) {
        setLocalError(err.message || "Login failed");
      }
    }
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
                <p className="text-xs text-amber-700 mt-1">
                  Please use your administrator credentials to continue.
                </p>
              </div>
            </div>
          )}

          {/* Error Alert */}
          {localError && (
            <div className="flex items-start gap-2.5 bg-red-50 border border-red-200 text-red-700 text-sm px-4 py-3 rounded-xl mb-5">
              <span className="mt-0.5">⚠️</span>
              <span>{localError}</span>
            </div>
          )}

          {/* Success Alert */}
          {success && (
            <div className="flex items-start gap-2.5 bg-emerald-50 border border-emerald-200 text-emerald-700 text-sm px-4 py-3 rounded-xl mb-5">
              <span className="mt-0.5">✅</span>
              <span>{success}</span>
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit} noValidate className="space-y-5">
            {/* REGISTER ONLY FIELDS */}
            {!isLogin && userType === 'customer' && (
              <>
                {/* Name grid */}
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <Label>First Name</Label>
                    <TextInput
                      name="name"
                      value={form.name}
                      onChange={handleChange}
                      placeholder="Jane"
                      required
                    />
                  </div>
                  <div>
                    <Label>Last Name</Label>
                    <TextInput
                      name="surname"
                      value={form.surname}
                      onChange={handleChange}
                      placeholder="Smith"
                      required
                    />
                  </div>
                </div>

                {/* Mobile */}
                <div>
                  <Label>
                    Mobile{" "}
                    <span className="normal-case tracking-normal font-normal text-stone-300">
                      (optional)
                    </span>
                  </Label>
                  <TextInput
                    name="mobile"
                    type="tel"
                    value={form.mobile}
                    onChange={handleChange}
                    placeholder="+1 555 000 0000"
                  />
                </div>

                {/* Photo Upload */}
                <div>
                  <Label>
                    Profile Photo{" "}
                    <span className="normal-case tracking-normal font-normal text-stone-300">
                      (optional)
                    </span>
                  </Label>
                  <div className="flex items-center gap-4 p-3 rounded-xl border border-stone-200 bg-white">
                    <div className="w-14 h-14 rounded-full bg-stone-100 border-2 border-dashed border-stone-200 overflow-hidden flex items-center justify-center shrink-0 transition-all duration-200">
                      {photoPreview ? (
                        <img
                          src={photoPreview}
                          alt="Preview"
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <User className="w-6 h-6 text-stone-300" />
                      )}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 flex-wrap">
                        <button
                          type="button"
                          onClick={() => fileRef.current?.click()}
                          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold text-stone-600 bg-stone-100 border border-stone-200 hover:bg-amber-50 hover:text-amber-700 hover:border-amber-300 transition-all duration-150"
                        >
                          <Upload className="w-3.5 h-3.5" />
                          {photoPreview ? "Change photo" : "Upload photo"}
                        </button>
                        {photoPreview && (
                          <button
                            type="button"
                            onClick={() => {
                              setPhotoPreview(null);
                              setPhotoFile(null);
                              setForm((f) => ({ ...f, photo: "" }));
                              if (fileRef.current) fileRef.current.value = "";
                            }}
                            className="text-xs text-red-400 hover:text-red-600 transition-colors underline underline-offset-2"
                          >
                            Remove
                          </button>
                        )}
                      </div>
                      <p className="text-xs text-stone-300 mt-1.5">
                        JPG, PNG or GIF · max 5 MB
                      </p>
                    </div>
                  </div>
                  <input
                    ref={fileRef}
                    type="file"
                    accept="image/*"
                    onChange={handlePhoto}
                    className="hidden"
                  />
                </div>
              </>
            )}

            {/* Email Field */}
            <div>
              <Label>Email Address</Label>
              <TextInput
                name="email"
                type="email"
                value={form.email}
                onChange={handleChange}
                placeholder={
                  userType === 'admin' ? 'admin@jewelmart.com' : 'you@example.com'
                }
                required
              />
            </div>

            {/* Password Field */}
            <div>
              <Label>Password</Label>
              <TextInput
                name="password"
                type={showPw ? 'text' : 'password'}
                value={form.password}
                onChange={handleChange}
                placeholder={
                  isLogin ? "Your password" : "Create a strong password"
                }
                required
                rightSlot={
                  <button
                    type="button"
                    onClick={() => setShowPw((v) => !v)}
                    className="text-stone-400 hover:text-amber-500 transition-colors p-0.5"
                  >
                    {showPw ? (
                      <EyeOff className="w-4 h-4" />
                    ) : (
                      <Eye className="w-4 h-4" />
                    )}
                  </button>
                }
              />

              {/* Strength meter — register only */}
              {!isLogin && form.password && (
                <div className="mt-3 space-y-2.5">
                  {/* Bars */}
                  <div className="flex gap-1.5">
                    {[1, 2, 3, 4].map((i) => (
                      <div
                        key={i}
                        className={`h-1.5 flex-1 rounded-full transition-all duration-300 ${
                          i <= strength
                            ? strengthMeta[strength].barClass
                            : "bg-stone-100"
                        }`}
                      />
                    ))}
                  </div>
                  {/* Label */}
                  {strength > 0 && (
                    <span
                      className={`text-xs font-semibold ${
                        strengthMeta[strength].textClass
                      }`}
                    >
                      {strengthMeta[strength].label}
                    </span>
                  )}
                  {/* Rules checklist */}
                  <div className="grid grid-cols-2 gap-y-1.5 gap-x-2 pt-0.5">
                    {rules.map((r) => {
                      const pass = r.test(form.password);
                      return (
                        <div
                          key={r.label}
                          className={`flex items-center gap-1.5 text-xs transition-colors duration-200 ${
                            pass ? "text-emerald-600" : "text-stone-400"
                          }`}
                        >
                          <div
                            className={`w-3.5 h-3.5 rounded-full border flex items-center justify-center shrink-0 transition-all duration-200 ${
                              pass
                                ? "bg-emerald-500 border-emerald-500 text-white"
                                : "border-stone-200"
                            }`}
                          >
                            {pass && <Check className="w-2.5 h-2.5 stroke-3" />}
                          </div>
                          {r.label}
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>

            {/* Confirm Password — register only */}
            {!isLogin && userType === 'customer' && (
              <div>
                <Label>Confirm Password</Label>
                <TextInput
                  name="confirmPassword"
                  type={showCPw ? 'text' : 'password'}
                  value={form.confirmPassword}
                  onChange={handleChange}
                  placeholder="Repeat your password"
                  required
                  rightSlot={
                    <button
                      type="button"
                      onClick={() => setShowCPw((v) => !v)}
                      className="text-stone-400 hover:text-amber-500 transition-colors p-0.5"
                    >
                      {showCPw ? (
                        <EyeOff className="w-4 h-4" />
                      ) : (
                        <Eye className="w-4 h-4" />
                      )}
                    </button>
                  }
                />
                {form.confirmPassword && (
                  <p
                    className={`text-xs mt-1.5 font-medium ${
                      form.password === form.confirmPassword
                        ? "text-emerald-500"
                        : "text-red-400"
                    }`}
                  >
                    {form.password === form.confirmPassword
                      ? "✓ Passwords match"
                      : "✗ Passwords don't match"}
                  </p>
                )}
              </div>
            )}

            {/* Remember Me & Forgot Password (Login Only) */}
            {isLogin && userType === 'customer' && (
              <div className="flex items-center justify-between text-sm">
                <label className="flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    className="w-4 h-4 text-amber-600 border-slate-300 rounded focus:ring-amber-500"
                  />
                  <span className="ml-2 text-slate-600">Remember me</span>
                </label>
                <button
                  type="button"
                  className="text-amber-600 hover:text-amber-700 font-medium"
                >
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
                  I agree to the{" "}
                  <button
                    type="button"
                    className="text-amber-600 hover:text-amber-700 font-medium"
                  >
                    Terms & Conditions
                  </button>{" "}
                  and{" "}
                  <button
                    type="button"
                    className="text-amber-600 hover:text-amber-700 font-medium"
                  >
                    Privacy Policy
                  </button>
                </span>
              </div>
            )}

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className={`w-full flex items-center justify-center gap-2 py-3 px-4 bg-linear-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-white font-semibold rounded-lg transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 disabled:opacity-60 disabled:cursor-not-allowed ${loading ? 'scale-95' : ''}`}
            >
              {loading && <Loader2 className="w-5 h-5 animate-spin" />}
              {userType === 'admin' ? (
                <>
                  <Shield className="w-5 h-5" />
                  {loading ? "Signing In..." : "Admin Login"}
                </>
              ) : isLogin ? (
                <>
                  {loading ? "Signing In..." : "Sign In"}
                  {!loading && <ArrowRight className="w-5 h-5" />}
                </>
              ) : (
                <>
                  {loading ? "Creating Account..." : "Create Account"}
                  {!loading && <ArrowRight className="w-5 h-5" />}
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
                  <span className="px-4 bg-white text-slate-500">
                    Or continue with
                  </span>
                </div>
              </div>

              <div className="mt-4 grid grid-cols-2 gap-3">
                <button
                  type="button"
                  className="flex items-center justify-center gap-2 px-4 py-2 border border-slate-200 rounded-lg hover:bg-slate-50 transition-all"
                >
                  <svg className="w-5 h-5" viewBox="0 0 24 24">
                    <path
                      fill="#4285F4"
                      d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                    />
                    <path
                      fill="#34A853"
                      d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                    />
                    <path
                      fill="#FBBC05"
                      d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                    />
                    <path
                      fill="#EA4335"
                      d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                    />
                  </svg>
                  <span className="text-sm font-medium text-slate-700">
                    Google
                  </span>
                </button>

                <button
                  type="button"
                  className="flex items-center justify-center gap-2 px-4 py-2 border border-slate-200 rounded-lg hover:bg-slate-50 transition-all"
                >
                  <svg
                    className="w-5 h-5"
                    fill="#1877F2"
                    viewBox="0 0 24 24"
                  >
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                  </svg>
                  <span className="text-sm font-medium text-slate-700">
                    Facebook
                  </span>
                </button>
              </div>
            </div>
          )}

          {/* Toggle Link (Customer Only) */}
          {userType === 'customer' && (
            <p className="mt-6 text-center text-sm text-slate-600">
              {isLogin ? "Don't have an account? " : "Already have an account? "}
              <button
                type="button"
                onClick={() => switchMode(isLogin ? 'register' : 'login')}
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