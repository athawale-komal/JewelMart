import React, { useState, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  Menu, X, ShoppingCart, Search, User, ChevronDown,
  Gem, Sparkles, LogIn, LogOut, Package, Heart, Settings
} from 'lucide-react';
import { products } from '../Data/Product';
import { logoutUser } from '../States/Auth/Action';
import { useDispatch, useSelector } from 'react-redux';

const CATEGORIES = [...new Set(products.map(p => p.category))];

export default function Header({ cartCount = 0 }) {
  const dispatch   = useDispatch();
  const navigate   = useNavigate();
  const { user, jwt } = useSelector(s => s.auth);
  const isLoggedIn = !!jwt && !!user;
  const [mobileOpen,   setMobileOpen]   = useState(false);
  const [catOpen,      setCatOpen]      = useState(false);
  const [profileOpen,  setProfileOpen]  = useState(false);
  const [searchOpen,   setSearchOpen]   = useState(false);
  const [searchVal,    setSearchVal]    = useState('');
  const [scrolled,     setScrolled]     = useState(false);

  const catTimer     = useRef(null);
  const profileTimer = useRef(null);
  const searchRef    = useRef(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    const handler = (e) => {
      if (searchRef.current && !searchRef.current.contains(e.target)) setSearchOpen(false);
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  const openCat  = () => { clearTimeout(catTimer.current);     setCatOpen(true); };
  const closeCat = () => { catTimer.current = setTimeout(()  => setCatOpen(false), 120); };

  const openProf  = () => { clearTimeout(profileTimer.current);    setProfileOpen(true); };
  const closeProf = () => { profileTimer.current = setTimeout(() => setProfileOpen(false), 120); };

  const handleLogout = () => {
    dispatch(logoutUser());
    setProfileOpen(false);
    setMobileOpen(false);
    navigate('/auth');
  };

  const navCls = scrolled
    ? 'text-stone-700 hover:text-amber-700 hover:bg-amber-50/80'
    : 'text-white/90 hover:text-white hover:bg-white/10';

  const base = 'font-medium text-[0.82rem] tracking-wide px-3.5 py-2 rounded-lg transition-all duration-200';

  return (
    <>
  
      <header className={` fixed top-0 z-50 w-full transition-all duration-400 ${
        scrolled
          ? 'bg-white/98 backdrop-blur-xl shadow-[0_2px_24px_rgba(0,0,0,0.08)] border-b border-stone-100'
          : 'bg-linear-to-b from-black/40 to-transparent'
      }`}>

        <div className="max-w-350 mx-auto flex items-center justify-between px-5 sm:px-8 lg:px-12 h-17">

          {/* ── LOGO ────────────────────────────────────────────────────── */}
          <Link to="/" className="flex items-center gap-2.5 group shrink-0">
            <div className={`w-9 h-9 rounded-xl flex items-center justify-center transition-all duration-300 ${
              scrolled
                ? 'bg-amber-700 group-hover:bg-amber-800 shadow-md'
                : 'bg-white/15 backdrop-blur-sm border border-white/30 group-hover:bg-white/25'
            }`}>
              <Gem className={`w-4.5 h-4.5 transition-colors duration-300 ${scrolled ? 'text-white' : 'text-amber-300'}`} size={18} />
            </div>
            <span className={`hdr-logo text-[1.45rem] font-semibold tracking-wide transition-colors duration-300 ${
              scrolled ? 'text-stone-800' : 'text-white drop-shadow-sm'
            }`}>
              Jewel<span className={scrolled ? 'text-amber-700' : 'text-amber-300'}>Mart</span>
            </span>
          </Link>

          {/* ── DESKTOP NAV ─────────────────────────────────────────────── */}
          <nav className="hidden lg:flex items-center gap-1">

            {/* Collections dropdown */}
            <div className="relative" onMouseEnter={openCat} onMouseLeave={closeCat}>
              <button className={`${base} ${navCls} flex items-center gap-1`}>
                Collections
                <ChevronDown size={13} className={`transition-transform duration-200 ${catOpen ? 'rotate-180' : ''}`} />
              </button>

              {catOpen && (
                <div className="dropdown-enter absolute top-[calc(100%+6px)] left-0 w-52 bg-white rounded-2xl shadow-[0_8px_40px_rgba(0,0,0,0.14)] border border-stone-100 overflow-hidden"
                  onMouseEnter={openCat} onMouseLeave={closeCat}>
                  <div className="px-4 pt-3 pb-1.5">
                    <p className="text-[0.6rem] font-bold uppercase tracking-[0.2em] text-stone-400">Explore</p>
                  </div>
                  {CATEGORIES.map(cat => (
                    <Link key={cat} to={`/category/${cat.toLowerCase()}`}
                      onClick={() => setCatOpen(false)}
                      className="group/item flex items-center justify-between px-4 py-2.5 text-[0.82rem] font-medium text-stone-700 hover:bg-amber-50 hover:text-amber-700 transition-colors duration-150">
                      {cat}
                      <ChevronDown size={12} className="-rotate-90 opacity-0 group-hover/item:opacity-100 group-hover/item:translate-x-0.5 transition-all duration-150" />
                    </Link>
                  ))}
                  <div className="h-px bg-stone-100 mx-3 my-1" />
                  <Link to="/products" onClick={() => setCatOpen(false)}
                    className="flex items-center justify-between px-4 py-2.5 text-[0.78rem] font-semibold text-amber-700 hover:bg-amber-50 transition-colors duration-150 group/all">
                    View All
                    <span className="group-hover/all:translate-x-0.5 transition-transform duration-150 text-base">→</span>
                  </Link>
                </div>
              )}
            </div>

            <Link to="/products" className={`${base} ${navCls}`}>Products</Link>
            <Link to="/about"    className={`${base} ${navCls}`}>About</Link>
            <Link to="/contact"  className={`${base} ${navCls}`}>Contact</Link>

            <Link to="/ai-stylist"
              className={`${base} flex items-center gap-1.5 ml-1 font-semibold transition-all duration-200 hover:scale-[1.03] ${
                scrolled
                  ? 'text-amber-700 bg-amber-50 border border-amber-200 hover:bg-amber-100 hover:border-amber-300'
                  : 'text-white bg-white/15 border border-white/25 hover:bg-white/25 backdrop-blur-sm'
              }`}>
              <Sparkles size={13} />
              AI Stylist
            </Link>
          </nav>

          {/* ── RIGHT SIDE ──────────────────────────────────────────────── */}
          <div className="flex items-center gap-2 sm:gap-3">

            {/* Search */}
            <div ref={searchRef} className="relative hidden md:block">
              <button
                onClick={() => setSearchOpen(v => !v)}
                className={`w-9 h-9 rounded-xl flex items-center justify-center transition-all duration-200 ${
                  scrolled
                    ? 'text-stone-600 hover:bg-stone-100 hover:text-amber-700'
                    : 'text-white/80 hover:text-white hover:bg-white/15'
                }`}>
                <Search size={18} />
              </button>
              {searchOpen && (
                <div className="dropdown-enter absolute right-0 top-[calc(100%+8px)] w-72 bg-white rounded-2xl shadow-[0_8px_40px_rgba(0,0,0,0.14)] border border-stone-100 p-3">
                  <div className="relative">
                    <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-stone-400" />
                    <input autoFocus value={searchVal} onChange={e => setSearchVal(e.target.value)}
                      placeholder="Search jewellery…"
                      className="search-glow w-full pl-9 pr-4 py-2.5 text-sm bg-stone-50 border border-stone-200 rounded-xl outline-none focus:border-amber-300 transition-all text-stone-800 placeholder-stone-400" />
                  </div>
                </div>
              )}
            </div>

            {/* Cart */}
            <Link to="/cart" className={`relative w-9 h-9 rounded-xl flex items-center justify-center transition-all duration-200 hover:scale-105 ${
              scrolled
                ? 'text-stone-600 hover:bg-stone-100 hover:text-amber-700'
                : 'text-white/80 hover:text-white hover:bg-white/15'
            }`}>
              <ShoppingCart size={19} />
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-amber-600 text-white text-[9px] font-bold w-4.5 h-4.5 flex items-center justify-center rounded-full border border-white shadow-sm">
                  {cartCount}
                </span>
              )}
            </Link>

            {/* Profile or Login */}
            {isLoggedIn ? (
              <div className="relative hidden sm:block" onMouseEnter={openProf} onMouseLeave={closeProf}>
                <button className="flex items-center gap-1.5 group focus:outline-none">
                  {/* Avatar */}
                  <div className={`w-9 h-9 rounded-xl overflow-hidden flex items-center justify-center transition-all duration-200 group-hover:scale-105 ${
                    scrolled
                      ? 'border-2 border-stone-200 bg-stone-100 group-hover:border-amber-300'
                      : 'border-2 border-white/40 bg-white/15 group-hover:border-white/70'
                  }`}>
                    {user?.photo ? (
                      <img src={user.photo} alt={user.name} className="w-full h-full object-cover" />
                    ) : (
                      <span className={`text-sm font-semibold ${scrolled ? 'text-stone-600' : 'text-white'}`}>
                        {(user?.name?.[0] ?? '?').toUpperCase()}
                      </span>
                    )}
                  </div>
                  <ChevronDown size={13} className={`transition-all duration-200 ${profileOpen ? 'rotate-180' : ''} ${scrolled ? 'text-stone-500' : 'text-white/70'}`} />
                </button>

                {profileOpen && (
                  <div className="dropdown-enter absolute right-0 top-[calc(100%+8px)] w-56 bg-white rounded-2xl shadow-[0_8px_40px_rgba(0,0,0,0.14)] border border-stone-100 overflow-hidden"
                    onMouseEnter={openProf} onMouseLeave={closeProf}>
                    {/* User info */}
                    <div className="px-4 py-3.5 bg-linear-to-br from-amber-50 to-stone-50 border-b border-stone-100">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl overflow-hidden bg-amber-100 flex items-center justify-center shrink-0">
                          {user?.photo
                            ? <img src={user.photo} alt="" className="w-full h-full object-cover" />
                            : <span className="text-sm font-bold text-amber-700">{(user?.name?.[0] ?? '?').toUpperCase()}</span>}
                        </div>
                        <div className="min-w-0">
                          <p className="font-semibold text-stone-800 text-sm truncate">{user?.name ?? 'Member'}</p>
                          <p className="text-[0.7rem] text-stone-500 truncate">{user?.email ?? ''}</p>
                        </div>
                      </div>
                    </div>

                    <div className="py-1.5">
                      {[
                        { to: '/profile',  icon: User,    label: 'My Profile' },
                        { to: '/orders',   icon: Package, label: 'My Orders'  },
                        { to: '/wishlist', icon: Heart,   label: 'Wishlist'   },
                      ].map(({ to, icon: Icon, label }) => (
                        <Link key={to} to={to} onClick={() => setProfileOpen(false)}
                          className="group/mi flex items-center gap-3 px-4 py-2.5 text-[0.82rem] font-medium text-stone-700 hover:bg-amber-50 hover:text-amber-700 transition-colors duration-150">
                          <Icon size={15} className="text-stone-400 group-hover/mi:text-amber-600 transition-colors" />
                          {label}
                        </Link>
                      ))}
                    </div>

                    <div className="h-px bg-stone-100 mx-3" />
                    <button onClick={handleLogout}
                      className="w-full flex items-center gap-3 px-4 py-3 text-[0.82rem] font-semibold text-red-500 hover:bg-red-50 transition-colors duration-150">
                      <LogOut size={15} />
                      Sign Out
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <button onClick={() => navigate('/auth')}
                className={`hidden sm:flex items-center gap-1.5 text-[0.8rem] font-semibold px-4 py-2 rounded-xl transition-all duration-200 hover:scale-[1.02] ${
                  scrolled
                    ? 'text-stone-700 border border-stone-200 hover:bg-amber-50 hover:text-amber-700 hover:border-amber-200'
                    : 'text-white border border-white/30 bg-white/10 hover:bg-white/20 backdrop-blur-sm'
                }`}>
                <LogIn size={15} />
                Sign In
              </button>
            )}

            {/* Mobile burger */}
            <button
              onClick={() => setMobileOpen(v => !v)}
              className={`lg:hidden w-9 h-9 rounded-xl flex items-center justify-center transition-all duration-200 ${
                scrolled
                  ? 'text-stone-700 hover:bg-stone-100'
                  : 'text-white hover:bg-white/15'
              }`}>
              {mobileOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>

        {/* ── MOBILE MENU ─────────────────────────────────────────────────── */}
        {mobileOpen && (
          <div className="mobile-enter lg:hidden bg-white border-t border-stone-100 shadow-xl max-h-[80vh] overflow-y-auto">
            <div className="px-5 py-4 space-y-1">

              {/* Mobile search */}
              <div className="relative mb-3">
                <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-stone-400" />
                <input placeholder="Search jewellery…"
                  className="w-full pl-9 pr-4 py-2.5 text-sm bg-stone-50 border border-stone-200 rounded-xl outline-none focus:border-amber-300 transition-all" />
              </div>

              {/* Nav links */}
              {[
                { to: '/',          label: 'Home'      },
                { to: '/products',  label: 'Products'  },
                { to: '/about',     label: 'About'     },
                { to: '/contact',   label: 'Contact'   },
              ].map(({ to, label }) => (
                <Link key={to} to={to} onClick={() => setMobileOpen(false)}
                  className="block px-4 py-2.5 rounded-xl text-[0.85rem] font-medium text-stone-700 hover:bg-amber-50 hover:text-amber-700 transition-colors">
                  {label}
                </Link>
              ))}

              <Link to="/ai-stylist" onClick={() => setMobileOpen(false)}
                className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-[0.85rem] font-semibold text-amber-700 bg-amber-50 border border-amber-200">
                <Sparkles size={14} /> AI Stylist
              </Link>

              {/* Mobile categories */}
              <div className="pt-2">
                <p className="px-4 pb-1.5 text-[0.6rem] font-bold uppercase tracking-[0.2em] text-stone-400">Collections</p>
                {CATEGORIES.map(cat => (
                  <Link key={cat} to={`/category/${cat.toLowerCase()}`} onClick={() => setMobileOpen(false)}
                    className="block px-4 py-2 text-[0.82rem] font-medium text-stone-600 hover:text-amber-700 hover:bg-amber-50 rounded-xl transition-colors">
                    {cat}
                  </Link>
                ))}
              </div>

              {/* Mobile profile or login */}
              <div className="pt-3 border-t border-stone-100 mt-2">
                {isLoggedIn ? (
                  <>
                    <div className="flex items-center gap-3 px-4 py-3 mb-2 bg-linear-to-br from-amber-50 to-stone-50 rounded-xl">
                      <div className="w-10 h-10 rounded-xl overflow-hidden bg-amber-100 flex items-center justify-center shrink-0">
                        {user?.photo
                          ? <img src={user.photo} alt="" className="w-full h-full object-cover" />
                          : <span className="text-sm font-bold text-amber-700">{(user?.name?.[0] ?? '?').toUpperCase()}</span>}
                      </div>
                      <div>
                        <p className="font-semibold text-stone-800 text-sm">{user?.name}</p>
                        <p className="text-[0.7rem] text-stone-500">{user?.email}</p>
                      </div>
                    </div>
                    {[
                      { to: '/profile',  icon: User,    label: 'My Profile' },
                      { to: '/orders',   icon: Package, label: 'My Orders'  },
                      { to: '/wishlist', icon: Heart,   label: 'Wishlist'   },
                    ].map(({ to, icon: Icon, label }) => (
                      <Link key={to} to={to} onClick={() => setMobileOpen(false)}
                        className="flex items-center gap-3 px-4 py-2.5 rounded-xl text-[0.83rem] font-medium text-stone-700 hover:bg-amber-50 hover:text-amber-700 transition-colors">
                        <Icon size={15} className="text-stone-400" />{label}
                      </Link>
                    ))}
                    <button onClick={handleLogout}
                      className="w-full mt-1 flex items-center gap-3 px-4 py-2.5 rounded-xl text-[0.83rem] font-semibold text-red-500 hover:bg-red-50 transition-colors">
                      <LogOut size={15} /> Sign Out
                    </button>
                  </>
                ) : (
                  <button onClick={() => { setMobileOpen(false); navigate('/auth'); }}
                    className="w-full flex items-center justify-center gap-2 py-3 rounded-xl bg-amber-700 text-white text-[0.85rem] font-semibold hover:bg-amber-800 transition-colors shadow-md shadow-amber-200">
                    <LogIn size={15} /> Sign In
                  </button>
                )}
              </div>
            </div>
          </div>
        )}
      </header>
    </>
  );
}