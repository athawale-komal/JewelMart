import { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { registerUser, loginUser } from "../States/Auth/Action";
import { Eye, EyeOff, Upload, User, Loader2, Shield, Gem, Lock } from "lucide-react";
import { toast } from "react-toastify";

const extractRole = (user) =>
  user?.role ?? user?.user?.role ?? user?.data?.role ?? null;

const redirectPath = (role) => {
  if (role === "ADMIN") return "/admin/dashboard";
  if (role === "CUSTOMER" || role === "USER") return "/";
  return null;
};

const getStrength = (pw) => {
  let s = 0;
  if (pw.length >= 8) s++;
  if (/[A-Z]/.test(pw)) s++;
  if (/\d/.test(pw)) s++;
  if (/[!@#$%^&*]/.test(pw)) s++;
  return s;
};

const strengthMeta = [
  { label: "",       bar: "bg-zinc-700" },
  { label: "Weak",   bar: "bg-red-500",    text: "text-red-400" },
  { label: "Fair",   bar: "bg-amber-500",  text: "text-amber-400" },
  { label: "Good",   bar: "bg-yellow-400", text: "text-yellow-300" },
  { label: "Strong", bar: "bg-emerald-400",text: "text-emerald-400" },
];

export default function Login() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  // ← now reading jwt from store too
  const { loading, error, user, jwt } = useSelector((s) => s.auth);

  const [mode,         setMode]         = useState("login");
  const [showPw,       setShowPw]       = useState(false);
  const [showCPw,      setShowCPw]      = useState(false);
  const [photoPreview, setPhotoPreview] = useState(null);
  const [photoFile,    setPhotoFile]    = useState(null);
  const fileRef     = useRef(null);
  const navigated   = useRef(false);

  const [form, setForm] = useState({
    name: "", surname: "", email: "", mobile: "",
    password: "", confirmPassword: "",
  });

  const strength = getStrength(form.password);
  const isLogin  = mode === "login";

  useEffect(() => {
    if (navigated.current) return;
    if (!user || !jwt) return;           
    const role = extractRole(user);
    const dest = redirectPath(role);

    if (!dest) {
      toast.warn("Signed in but role unrecognised.", { toastId: "role-warn" });
      return;
    }

    navigated.current = true;
    toast.success(
      role === "ADMIN" ? "Welcome, Admin!" : "Welcome back!",
      { toastId: "auth-success", autoClose: 1500 }
    );
    navigate(dest, { replace: true });
  }, [user, jwt, navigate]);

  useEffect(() => {
    if (error) toast.error(typeof error === "string" ? error : "Something went wrong.", { toastId: "auth-error", autoClose: 4000 });
  }, [error]);

  const switchMode = (next) => {
    if (next === mode) return;
    navigated.current = false;
    setPhotoPreview(null); setPhotoFile(null);
    setForm({ name: "", surname: "", email: "", mobile: "", password: "", confirmPassword: "" });
    setMode(next);
  };

  const handleChange = (e) => setForm((f) => ({ ...f, [e.target.name]: e.target.value }));

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
    navigated.current = false;
    if (!isLogin) {
      if (form.password !== form.confirmPassword) { toast.error("Passwords do not match."); return; }
      if (strength < 4) { toast.error("Password doesn't meet all requirements."); return; }
      const fd = new FormData();
      fd.append("name", form.name); fd.append("surname", form.surname);
      fd.append("email", form.email); fd.append("mobile", form.mobile);
      fd.append("password", form.password);
      if (photoFile) fd.append("photo", photoFile);
      await dispatch(registerUser(fd));
    } else {
      await dispatch(loginUser({ email: form.email, password: form.password }));
    }
  };

  const inp = "w-full px-4 py-3 text-sm bg-[#171510] border border-[rgba(212,175,55,0.13)] text-[#e8dfc8] placeholder-[#3a3528] outline-none transition-all duration-200 focus:border-[rgba(212,175,55,0.5)] focus:bg-[#1c1a12] rounded-sm";

  return (
    <div className="min-h-screen flex bg-[#0d0c0a] text-[#e8dfc8]" style={{ fontFamily: "'Jost', sans-serif" }}>

      {/* ── Left panel – desktop only ── */}
      <div className="hidden lg:flex flex-1 flex-col items-center justify-center relative overflow-hidden" style={{ background: "#0a0908" }}>
        <div className="absolute inset-0 pointer-events-none"
          style={{ backgroundImage: "repeating-linear-gradient(0deg,transparent,transparent 79px,rgba(212,175,55,0.04) 80px),repeating-linear-gradient(90deg,transparent,transparent 79px,rgba(212,175,55,0.04) 80px)" }} />
        <div className="absolute inset-0 pointer-events-none"
          style={{ background: "radial-gradient(ellipse 55% 45% at 50% 50%, rgba(212,175,55,0.1) 0%, transparent 70%)" }} />
        {["top-8 left-8","top-8 right-8","bottom-8 left-8","bottom-8 right-8"].map((pos, i) => (
          <div key={i} className={`absolute w-8 h-8 ${pos}`}
            style={{
              borderTop:    i < 2  ? "1px solid rgba(212,175,55,0.3)" : "none",
              borderBottom: i >= 2 ? "1px solid rgba(212,175,55,0.3)" : "none",
              borderLeft:   i % 2 === 0 ? "1px solid rgba(212,175,55,0.3)" : "none",
              borderRight:  i % 2 !== 0 ? "1px solid rgba(212,175,55,0.3)" : "none",
            }} />
        ))}
        <div className="relative z-10 text-center px-12 max-w-xs">
          <div className="w-20 h-20 mx-auto mb-8 rotate-45 flex items-center justify-center"
            style={{ border: "1px solid rgba(212,175,55,0.35)", boxShadow: "0 0 48px rgba(212,175,55,0.1), inset 0 0 24px rgba(212,175,55,0.05)" }}>
            <span className="-rotate-45 text-4xl select-none" style={{ color: "#d4af37", textShadow: "0 0 24px rgba(212,175,55,0.7)" }}>◆</span>
          </div>
          <h1 className="text-5xl font-light tracking-[0.22em] mb-1" style={{ fontFamily: "'Cormorant Garamond', serif", color: "#e8dfc8" }}>JEWELLMART</h1>
          <p className="text-[0.58rem] tracking-[0.5em] uppercase mb-6" style={{ color: "#d4af37" }}>Luxury · Curated · Timeless</p>
          <div className="w-8 h-px mx-auto mb-6" style={{ background: "rgba(212,175,55,0.35)" }} />
          <p className="text-xs leading-loose" style={{ color: "#6a6050", letterSpacing: "0.04em" }}>
            Discover handpicked fine jewellery crafted for those who appreciate the extraordinary.
          </p>
        </div>
      </div>

      {/* ── Right form panel ── */}
      <div className="flex-1 flex flex-col items-center justify-start overflow-y-auto px-6 py-12 lg:max-w-125 lg:px-12"
        style={{ background: "linear-gradient(155deg,#12100d 0%,#0d0c0a 100%)" }}>
        <div className="w-full max-w-97.5">

          {/* Mobile logo */}
          <div className="lg:hidden text-center mb-9">
            <p className="text-3xl font-light tracking-[0.22em]" style={{ fontFamily: "'Cormorant Garamond', serif" }}>JEWELLMART</p>
            <p className="text-[0.55rem] tracking-[0.45em] uppercase mt-1" style={{ color: "#d4af37" }}>Luxury · Curated · Timeless</p>
          </div>

          {/* Tabs */}
          <div className="flex mb-8 border-b border-[rgba(212,175,55,0.12)]">
            {[{ key: "login", label: "Sign In" }, { key: "register", label: "Create Account" }].map(({ key, label }) => (
              <button key={key} onClick={() => switchMode(key)}
                className={`flex-1 pb-3 text-[0.65rem] tracking-[0.28em] uppercase font-medium transition-all duration-300 ${
                  mode === key ? "border-b-2 border-[#d4af37] -mb-px text-[#d4af37]" : "text-[#4a4438] hover:text-[#8a7c68]"
                }`}>
                {label}
              </button>
            ))}
          </div>

          {/* Heading */}
          <div className="mb-7">
            <h2 className="text-[2.2rem] font-light italic leading-none mb-2"
              style={{ fontFamily: "'Cormorant Garamond', serif", color: "#e8dfc8" }}>
              {isLogin ? "Welcome back" : "Join Us"}
            </h2>
            <p className="text-[0.7rem] tracking-wider" style={{ color: "#4a4438" }}>
              {isLogin ? "Sign in to access your collection & orders." : "Create your complimentary account today."}
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} noValidate className="space-y-5">
            {!isLogin && (
              <>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-[0.58rem] tracking-[0.28em] uppercase mb-1.5" style={{ color: "#6a6050" }}>First Name</label>
                    <input name="name" value={form.name} onChange={handleChange} placeholder="Jane" required className={inp} />
                  </div>
                  <div>
                    <label className="block text-[0.58rem] tracking-[0.28em] uppercase mb-1.5" style={{ color: "#6a6050" }}>Last Name</label>
                    <input name="surname" value={form.surname} onChange={handleChange} placeholder="Smith" required className={inp} />
                  </div>
                </div>

                <div>
                  <label className="block text-[0.58rem] tracking-[0.28em] uppercase mb-1.5" style={{ color: "#6a6050" }}>
                    Mobile <span className="normal-case tracking-normal text-[#3a3528]">(optional)</span>
                  </label>
                  <input name="mobile" type="tel" value={form.mobile} onChange={handleChange} placeholder="+1 555 000 0000" className={inp} />
                </div>

                <div>
                  <label className="block text-[0.58rem] tracking-[0.28em] uppercase mb-1.5" style={{ color: "#6a6050" }}>
                    Profile Photo <span className="normal-case tracking-normal text-[#3a3528]">(optional)</span>
                  </label>
                  <div className="flex items-center gap-4 px-4 py-3 border border-[rgba(212,175,55,0.13)] bg-[#171510] rounded-sm">
                    <div className="w-11 h-11 rounded-full border border-[rgba(212,175,55,0.2)] overflow-hidden flex items-center justify-center shrink-0 bg-[#12100d]">
                      {photoPreview
                        ? <img src={photoPreview} alt="preview" className="w-full h-full object-cover" />
                        : <User className="w-4 h-4 text-[#3a3528]" />}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-3 flex-wrap">
                        <button type="button" onClick={() => fileRef.current?.click()}
                          className="inline-flex items-center gap-1.5 px-3 py-1.5 text-[0.6rem] tracking-widest uppercase border border-[rgba(212,175,55,0.22)] text-[#d4af37] hover:bg-[rgba(212,175,55,0.07)] transition-all rounded-sm">
                          <Upload className="w-3 h-3" />
                          {photoPreview ? "Change" : "Upload"}
                        </button>
                        {photoPreview && (
                          <button type="button"
                            onClick={() => { setPhotoPreview(null); setPhotoFile(null); if (fileRef.current) fileRef.current.value = ""; }}
                            className="text-[0.6rem] text-[#6a4040] hover:text-red-400 transition-colors underline underline-offset-2">
                            Remove
                          </button>
                        )}
                      </div>
                      <p className="text-[0.58rem] mt-1.5 text-[#3a3528]">JPG, PNG or GIF · max 5 MB</p>
                    </div>
                  </div>
                  <input ref={fileRef} type="file" accept="image/*" onChange={handlePhoto} className="hidden" />
                </div>
              </>
            )}

            <div>
              <label className="block text-[0.58rem] tracking-[0.28em] uppercase mb-1.5" style={{ color: "#6a6050" }}>Email Address</label>
              <input name="email" type="email" value={form.email} onChange={handleChange} placeholder="jane@example.com" required className={inp} />
            </div>

            <div>
              <label className="block text-[0.58rem] tracking-[0.28em] uppercase mb-1.5" style={{ color: "#6a6050" }}>Password</label>
              <div className="relative">
                <input name="password" type={showPw ? "text" : "password"} value={form.password} onChange={handleChange}
                  placeholder={isLogin ? "Your password" : "Create a strong password"} required className={`${inp} pr-11`} />
                <button type="button" onClick={() => setShowPw((v) => !v)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-[#3a3528] hover:text-[#d4af37] transition-colors">
                  {showPw ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
              {!isLogin && form.password && (
                <div className="mt-2.5 space-y-1.5">
                  <div className="flex gap-1">
                    {[1,2,3,4].map((i) => (
                      <div key={i} className={`h-0.5 flex-1 transition-all duration-300 ${i <= strength ? strengthMeta[strength].bar : "bg-[#252018]"}`} />
                    ))}
                  </div>
                  {strength > 0 && <span className={`text-[0.58rem] tracking-widest uppercase ${strengthMeta[strength].text}`}>{strengthMeta[strength].label}</span>}
                </div>
              )}
            </div>

            {!isLogin && (
              <div>
                <label className="block text-[0.58rem] tracking-[0.28em] uppercase mb-1.5" style={{ color: "#6a6050" }}>Confirm Password</label>
                <div className="relative">
                  <input name="confirmPassword" type={showCPw ? "text" : "password"} value={form.confirmPassword} onChange={handleChange}
                    placeholder="Repeat your password" className={`${inp} pr-11`} />
                  <button type="button" onClick={() => setShowCPw((v) => !v)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-[#3a3528] hover:text-[#d4af37] transition-colors">
                    {showCPw ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
                {form.confirmPassword && (
                  <p className={`text-[0.62rem] mt-1.5 tracking-wider ${form.password === form.confirmPassword ? "text-emerald-400" : "text-red-400"}`}>
                    {form.password === form.confirmPassword ? "✓ Passwords match" : "✗ Passwords don't match"}
                  </p>
                )}
              </div>
            )}

            {isLogin && (
              <div className="flex justify-end -mt-1">
                <a href="/forgot-password" className="text-[0.62rem] tracking-widest uppercase transition-colors hover:text-[#d4af37]" style={{ color: "#5a5040" }}>
                  Forgot password?
                </a>
              </div>
            )}

            <button type="submit" disabled={loading}
              className="w-full py-3.5 mt-1 flex items-center justify-center gap-2 text-[0.65rem] tracking-[0.35em] uppercase font-semibold transition-all duration-300 rounded-sm disabled:opacity-50 disabled:cursor-not-allowed active:scale-[0.99]"
              style={{
                background: loading ? "rgba(212,175,55,0.45)" : "linear-gradient(135deg,#b8911f 0%,#ddb83a 40%,#e8c84a 60%,#c49a22 100%)",
                color: "#0d0c0a",
                boxShadow: loading ? "none" : "0 4px 28px rgba(212,175,55,0.18)",
              }}>
              {loading && <Loader2 className="w-3.5 h-3.5 animate-spin" />}
              {loading ? (isLogin ? "Signing In…" : "Creating Account…") : (isLogin ? "Sign In" : "Create Account")}
            </button>
          </form>

          <p className="text-center text-[0.7rem] mt-6" style={{ color: "#4a4438" }}>
            {isLogin ? "New to JewellMart? " : "Already a member? "}
            <button onClick={() => switchMode(isLogin ? "register" : "login")}
              className="underline underline-offset-2 transition-colors hover:text-[#d4af37]" style={{ color: "#8a7a60" }}>
              {isLogin ? "Create a free account" : "Sign in"}
            </button>
          </p>

          <div className="flex items-center justify-center gap-6 mt-8 pt-6 border-t border-[rgba(212,175,55,0.08)]">
            {[{ icon: Shield, label: "SSL Secure" }, { icon: Gem, label: "Authentic" }, { icon: Lock, label: "Private" }].map(({ icon: Icon, label }) => (
              <span key={label} className="flex items-center gap-1.5 text-[0.58rem] tracking-widest uppercase" style={{ color: "#3a3528" }}>
                <Icon className="w-3 h-3" style={{ color: "rgba(212,175,55,0.35)" }} />{label}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}