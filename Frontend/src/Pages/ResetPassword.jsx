/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */

import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { resetPassword } from "../States/Auth/Action";
import { Loader2, Eye, EyeOff, Shield, Gem, Lock } from "lucide-react";
import { toast } from "react-toastify";
import { useNavigate, useParams } from "react-router-dom";

const getStrength = (pw) => {
    let s = 0;
    if (pw.length >= 8) s++;
    if (/[A-Z]/.test(pw)) s++;
    if (/\d/.test(pw)) s++;
    if (/[!@#$%^&*]/.test(pw)) s++;
    return s;
};

const strengthMeta = [
    { label: "", bar: "bg-zinc-700" },
    { label: "Weak", bar: "bg-red-500", text: "text-red-400" },
    { label: "Fair", bar: "bg-amber-500", text: "text-amber-400" },
    { label: "Good", bar: "bg-yellow-400", text: "text-yellow-300" },
    { label: "Strong", bar: "bg-emerald-400", text: "text-emerald-400" },
];

export default function ResetPassword() {
    const { token } = useParams();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { loading, error, resetPasswordMessage } = useSelector((s) => s.auth);

    const [form, setForm] = useState({ newPassword: "", confirmPassword: "" });
    const [showPw, setShowPw] = useState(false);
    const [showCPw, setShowCPw] = useState(false);

    useEffect(() => {
        if (error) {
            toast.error(typeof error === "string" ? error : "Failed to reset password");
        }
    }, [error]);

    const strength = getStrength(form.newPassword);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (form.newPassword !== form.confirmPassword) {
            toast.error("Passwords do not match.");
            return;
        }
        if (strength < 4) {
            toast.error("Please use a stronger password.");
            return;
        }
        dispatch(resetPassword(token, form.newPassword, form.confirmPassword));
    };

    const handleChange = (e) => setForm((f) => ({ ...f, [e.target.name]: e.target.value }));

    const inp = "w-full px-4 py-3 text-sm bg-[#171510] border border-[rgba(212,175,55,0.13)] text-[#e8dfc8] placeholder-[#3a3528] outline-none transition-all duration-200 focus:border-[rgba(212,175,55,0.5)] focus:bg-[#1c1a12] rounded-sm";

    return (
        <div className="min-h-screen flex bg-[#0d0c0a] text-[#e8dfc8]" style={{ fontFamily: "'Jost', sans-serif" }}>
            {/* ── Left panel – desktop only ── */}
            <div className="hidden lg:flex flex-1 flex-col items-center justify-center relative overflow-hidden" style={{ background: "#0a0908" }}>
                <div className="absolute inset-0 pointer-events-none"
                    style={{ backgroundImage: "repeating-linear-gradient(0deg,transparent,transparent 79px,rgba(212,175,55,0.04) 80px),repeating-linear-gradient(90deg,transparent,transparent 79px,rgba(212,175,55,0.04) 80px)" }} />
                <div className="absolute inset-0 pointer-events-none"
                    style={{ background: "radial-gradient(ellipse 55% 45% at 50% 50%, rgba(212,175,55,0.1) 0%, transparent 70%)" }} />
                {["top-8 left-8", "top-8 right-8", "bottom-8 left-8", "bottom-8 right-8"].map((pos, i) => (
                    <div key={i} className={`absolute w-8 h-8 ${pos}`}
                        style={{
                            borderTop: i < 2 ? "1px solid rgba(212,175,55,0.3)" : "none",
                            borderBottom: i >= 2 ? "1px solid rgba(212,175,55,0.3)" : "none",
                            borderLeft: i % 2 === 0 ? "1px solid rgba(212,175,55,0.3)" : "none",
                            borderRight: i % 2 !== 0 ? "1px solid rgba(212,175,55,0.3)" : "none",
                        }} />
                ))}
                <div className="relative z-10 text-center px-12 max-w-xs">
                    <div className="w-20 h-20 mx-auto mb-8 rotate-45 flex items-center justify-center"
                        style={{ border: "1px solid rgba(212,175,55,0.35)", boxShadow: "0 0 48px rgba(212,175,55,0.1), inset 0 0 24px rgba(212,175,55,0.05)" }}>
                        <span className="-rotate-45 text-4xl select-none" style={{ color: "#d4af37", textShadow: "0 0 24px rgba(212,175,55,0.7)" }}>◆</span>
                    </div>
                    <h1 className="text-5xl font-light tracking-[0.22em] mb-1" style={{ fontFamily: "'Cormorant Garamond', serif", color: "#e8dfc8" }}>JEWELLMART</h1>
                    <p className="text-[0.58rem] tracking-[0.5em] uppercase mb-6" style={{ color: "#d4af37" }}>Luxury · Curated · Timeless</p>
                </div>
            </div>

            <div className="flex-1 flex flex-col items-center justify-center overflow-y-auto px-6 py-12 lg:max-w-125 lg:px-12"
                style={{ background: "linear-gradient(155deg,#12100d 0%,#0d0c0a 100%)" }}>
                <div className="w-full max-w-97.5">
                    <div className="mb-7">
                        <h2 className="text-[2.2rem] font-light italic leading-none mb-2"
                            style={{ fontFamily: "'Cormorant Garamond', serif", color: "#e8dfc8" }}>
                            Reset Password
                        </h2>
                        <p className="text-[0.7rem] tracking-wider" style={{ color: "#4a4438" }}>
                            Secure your account with a new, stronger password.
                        </p>
                    </div>

                    {resetPasswordMessage ? (
                        <div className="p-6 border border-[rgba(212,175,55,0.2)] bg-[rgba(212,175,55,0.03)] text-center">
                            <p className="text-sm text-[#d4af37] mb-4">{resetPasswordMessage || "Your password has been successfully reset."}</p>
                            <button onClick={() => navigate("/auth")} className="text-[0.65rem] tracking-[0.2em] uppercase underline underline-offset-4 text-[#e8dfc8] hover:text-[#d4af37] transition-all">
                                Sign In Now
                            </button>
                        </div>
                    ) : (
                        <form onSubmit={handleSubmit} noValidate className="space-y-5">
                            <div>
                                <label className="block text-[0.58rem] tracking-[0.28em] uppercase mb-1.5" style={{ color: "#6a6050" }}>New Password</label>
                                <div className="relative">
                                    <input name="newPassword" type={showPw ? "text" : "password"} value={form.newPassword} onChange={handleChange}
                                        placeholder="Enter new password" required className={`${inp} pr-11`} />
                                    <button type="button" onClick={() => setShowPw((v) => !v)}
                                        className="absolute right-3 top-1/2 -translate-y-1/2 text-[#3a3528] hover:text-[#d4af37] transition-colors">
                                        {showPw ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                                    </button>
                                </div>
                                {form.newPassword && (
                                    <div className="mt-2.5 space-y-1.5">
                                        <div className="flex gap-1">
                                            {[1, 2, 3, 4].map((i) => (
                                                <div key={i} className={`h-0.5 flex-1 transition-all duration-300 ${i <= strength ? strengthMeta[strength].bar : "bg-[#252018]"}`} />
                                            ))}
                                        </div>
                                        {strength > 0 && <span className={`text-[0.58rem] tracking-widest uppercase ${strengthMeta[strength].text}`}>{strengthMeta[strength].label}</span>}
                                    </div>
                                )}
                            </div>

                            <div>
                                <label className="block text-[0.58rem] tracking-[0.28em] uppercase mb-1.5" style={{ color: "#6a6050" }}>Confirm Password</label>
                                <div className="relative">
                                    <input name="confirmPassword" type={showCPw ? "text" : "password"} value={form.confirmPassword} onChange={handleChange}
                                        placeholder="Repeat new password" required className={`${inp} pr-11`} />
                                    <button type="button" onClick={() => setShowCPw((v) => !v)}
                                        className="absolute right-3 top-1/2 -translate-y-1/2 text-[#3a3528] hover:text-[#d4af37] transition-colors">
                                        {showCPw ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                                    </button>
                                </div>
                                {form.confirmPassword && (
                                    <p className={`text-[0.62rem] mt-1.5 tracking-wider ${form.newPassword === form.confirmPassword ? "text-emerald-400" : "text-red-400"}`}>
                                        {form.newPassword === form.confirmPassword ? "✓ Passwords match" : "✗ Passwords do not match"}
                                    </p>
                                )}
                            </div>

                            <button type="submit" disabled={loading}
                                className="w-full py-3.5 mt-2 flex items-center justify-center gap-2 text-[0.65rem] tracking-[0.35em] uppercase font-semibold transition-all duration-300 rounded-sm disabled:opacity-50 disabled:cursor-not-allowed active:scale-[0.99]"
                                style={{
                                    background: loading ? "rgba(212,175,55,0.45)" : "linear-gradient(135deg,#b8911f 0%,#ddb83a 40%,#e8c84a 60%,#c49a22 100%)",
                                    color: "#0d0c0a",
                                    boxShadow: loading ? "none" : "0 4px 28px rgba(212,175,55,0.18)",
                                }}>
                                {loading && <Loader2 className="w-3.5 h-3.5 animate-spin" />}
                                {loading ? "Resetting..." : "Reset Password"}
                            </button>
                        </form>
                    )}

                    <div className="flex items-center justify-center gap-6 mt-12 pt-6 border-t border-[rgba(212,175,55,0.08)]">
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
