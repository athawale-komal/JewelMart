/* eslint-disable no-unused-vars */

import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { forgotPassword } from "../States/Auth/Action";
import { Loader2, Mail, ArrowLeft, Shield, Gem, Lock } from "lucide-react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

export default function ForgotPassword() {
    const [email, setEmail] = useState("");
    const dispatch = useDispatch();
    const navigate = useNavigate();
     
    const { loading, error, forgotPasswordMessage } = useSelector((s) => s.auth);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!email) {
            toast.error("Please enter your email address.");
            return;
        }
        dispatch(forgotPassword(email));
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

            {/* ── Right form panel ── */}
            <div className="flex-1 flex flex-col items-center justify-center overflow-y-auto px-6 py-12 lg:max-w-125 lg:px-12"
                style={{ background: "linear-gradient(155deg,#12100d 0%,#0d0c0a 100%)" }}>
                <div className="w-full max-w-97.5">
                    <button onClick={() => navigate("/auth")} className="flex items-center gap-2 text-[0.6rem] tracking-[0.2em] uppercase text-[#6a6050] hover:text-[#d4af37] transition-colors mb-8">
                        <ArrowLeft className="w-3 h-3" /> Back to Sign In
                    </button>

                    <div className="mb-7">
                        <h2 className="text-[2.2rem] font-light italic leading-none mb-2"
                            style={{ fontFamily: "'Cormorant Garamond', serif", color: "#e8dfc8" }}>
                            Recover Access
                        </h2>
                        <p className="text-[0.7rem] tracking-wider" style={{ color: "#4a4438" }}>
                            Enter your email and we'll send you a link to reset your password.
                        </p>
                    </div>

                    {forgotPasswordMessage ? (
                        <div className="p-6 border border-[rgba(212,175,55,0.2)] bg-[rgba(212,175,55,0.03)] text-center">
                            <p className="text-sm text-[#d4af37] mb-4">{forgotPasswordMessage}</p>
                            <button onClick={() => navigate("/auth")} className="text-[0.65rem] tracking-[0.2em] uppercase underline underline-offset-4 text-[#e8dfc8] hover:text-[#d4af37] transition-all">
                                Return to Login
                            </button>
                        </div>
                    ) : (
                        <form onSubmit={handleSubmit} noValidate className="space-y-6">
                            <div>
                                <label className="block text-[0.58rem] tracking-[0.28em] uppercase mb-1.5" style={{ color: "#6a6050" }}>Email Address</label>
                                <div className="relative">
                                    <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="jane@example.com" required className={inp} />
                                    <Mail className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#3a3528]" />
                                </div>
                            </div>

                            <button type="submit" disabled={loading}
                                className="w-full py-3.5 flex items-center justify-center gap-2 text-[0.65rem] tracking-[0.35em] uppercase font-semibold transition-all duration-300 rounded-sm disabled:opacity-50 disabled:cursor-not-allowed active:scale-[0.99]"
                                style={{
                                    background: loading ? "rgba(212,175,55,0.45)" : "linear-gradient(135deg,#b8911f 0%,#ddb83a 40%,#e8c84a 60%,#c49a22 100%)",
                                    color: "#0d0c0a",
                                    boxShadow: loading ? "none" : "0 4px 28px rgba(212,175,55,0.18)",
                                }}>
                                {loading && <Loader2 className="w-3.5 h-3.5 animate-spin" />}
                                {loading ? "Sending link..." : "Send Reset Link"}
                            </button>
                        </form>
                    )}

                    <div className="flex items-center justify-center gap-6 mt-12 pt-6 border-t border-[rgba(212,175,55,0.08)]">
                        // eslint-disable-next-line no-unused-vars, no-unused-vars, no-unused-vars
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
