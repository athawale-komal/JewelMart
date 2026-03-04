import { useState, useEffect } from 'react';
import { Users, Menu, X, LayoutDashboard, LogOut, ClipboardList, Gem, Leaf, Package, UserRound, ChevronRight, Sparkles } from 'lucide-react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getUserProfile, logoutUser } from '../States/Auth/Action';
import { toast } from 'react-toastify';


export default function Sidebar() {
  const [isOpen, setIsOpen] = useState(true);
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [hoveredItem, setHoveredItem] = useState(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const { user, loading } = useSelector((state) => state.auth);

  useEffect(() => {
    const jwt = localStorage.getItem('jwt');
    if (jwt && !user) dispatch(getUserProfile());
  }, [dispatch, user]);

  const handleLogout = () => {
    toast.success('Logged out successfully', {
      position: "top-right",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: false,
      draggable: true,
      theme: "dark",
    });
    dispatch(logoutUser());
    navigate('/auth');
  };

  const menuItems = [
    { icon: LayoutDashboard, label: 'Dashboard', path: '/admin/dashboard', color: 'from-violet-400 to-purple-400' },
    { icon: Gem, label: 'Jwellery', path: '/admin/jwellery', color: 'from-emerald-400 to-teal-400' },
    { icon: ClipboardList, label: 'Orders', path: '/admin/orders', color: 'from-amber-400 to-orange-400' },
    { icon: Users, label: 'Users', path: '/admin/users', color: 'from-blue-400 to-cyan-400' },
  ];

  if (loading && !user) {
    return (
      <aside className="fixed lg:relative top-0 left-0 h-screen w-70 bg-linear-to-br from-slate-950  to-slate-950 z-40 flex items-center justify-center shadow-2xl border-r border-white/5">
        <div className="flex flex-col items-center gap-3">
          <div className="w-12 h-12 border-4 border-emerald-500/20 border-t-emerald-500 rounded-full animate-spin" />
          <span className="text-sm text-slate-400 font-medium">Loading dashboard...</span>
        </div>
      </aside>
    );
  }

  if (!user) {
    return (
      <aside className="fixed lg:relative top-0 left-0 h-screen w-70 bg-linear-to-br from-slate-950 via-slate-900 to-slate-950 z-40 flex items-center justify-center shadow-2xl border-r border-white/5">
        <div className="text-center px-6">
          <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-red-500/10 border border-red-500/20 flex items-center justify-center">
            <X className="w-8 h-8 text-red-400" />
          </div>
          <p className="text-slate-400 text-sm mb-4">Unable to load profile</p>
          <button
            onClick={() => navigate('/auth')}
            className="px-5 py-2.5 bg-emerald-500 hover:bg-emerald-600 text-white rounded-xl text-sm font-semibold transition-all duration-300 hover:scale-105 active:scale-95 shadow-lg shadow-emerald-500/25"
          >
            Go to Login
          </button>
        </div>
      </aside>
    );
  }

  const isActiveRoute = (path) => location.pathname === path;

  return (
    <>
      {/* Mobile toggle */}
      <button onClick={() => setIsMobileOpen(!isMobileOpen)}
        className="lg:hidden fixed top-4 left-5.5 z-50 p-3 bg-emerald-500 backdrop-blur-2xl  rounded-2xl shadow-2xl hover:bg-slate-800/90 transition-all duration-300 hover:scale-105 active:scale-95"
        aria-label="Toggle menu" >
        {isMobileOpen ? <X size={22} className="text-white" /> : <Menu size={22} className="text-white" />}
      </button>

      {/* Mobile backdrop */}
      {isMobileOpen && (
        <div className="lg:hidden fixed inset-0 bg-black/70 backdrop-blur-sm z-30 transition-opacity animate-fadeIn"
          onClick={() => setIsMobileOpen(false)} />
      )}

      {/* Sidebar */}
      <aside className={`
          fixed lg:relative top-0 left-0 h-screen 
          bg-white z-40 flex flex-col shadow-xl border-r border-slate-200/60
          transition-all duration-500 ease-out
          ${isOpen ? 'w-74' : 'w-24'}
          ${isMobileOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
        `}>
        {/* Subtle decorative elements */}
        <div className="absolute top-0 left-0 w-full h-px bg-linear-to-r from-transparent via-emerald-500/10 to-transparent" />

        {/* Header */}
        <div className={`relative flex items-center px-6 py-5 border-b border-slate-100 shrink-0 transition-all duration-500 ${isOpen ? "justify-between px-4" : "justify-center"
          }`} >

          <div className={`flex items-center gap-3.5 overflow-hidden transition-all duration-500 ${isOpen ? 'opacity-100 w-auto' : 'opacity-0 w-0'}`}>
            {/* Avatar/Logo */}
            <div className="relative group">
              <div className="relative w-11 h-11 bg-emerald-50 text-emerald-600 rounded-2xl flex items-center justify-center overflow-hidden border border-emerald-100 shadow-sm">
                <LayoutDashboard size={22} />
              </div>
            </div>

            {/* User info */}
            <div className="flex-1 min-w-0">
              <p className='text-xl font-bold text-slate-800 tracking-tight'>JewelMart</p>
              <p className='flex items-center gap-2 text-[11px] text-slate-500 font-bold uppercase tracking-widest'><div className="w-1.5 h-1.5 bg-emerald-500 rounded-full shadow-[0_0_8px_rgba(16,185,129,0.5)]"></div>Admin Panel</p>
            </div>
          </div>

          {/* Toggle button */}
          <button onClick={() => setIsOpen(!isOpen)}
            className={`flex items-center justify-center w-9 h-9 shrink-0 rounded-xl transition-all duration-300 ${isOpen
              ? 'bg-slate-50 hover:bg-slate-100 text-slate-400 border border-slate-200'
              : 'bg-emerald-50 hover:bg-emerald-100 text-emerald-600 border border-emerald-200 shadow-sm'
              }`}
            aria-label={isOpen ? 'Collapse sidebar' : 'Expand sidebar'}>
            <Menu size={18} className={`transition-transform duration-500 ${!isOpen ? 'rotate-180' : ''}`} />
          </button>

        </div>

        {/* Navigation */}
        <nav className="relative flex-1 py-6 px-3 space-y-1 scrollbar-thin scrollbar-track-transparent scrollbar-thumb-slate-200">
          {menuItems.map((item, index) => {
            const Icon = item.icon;
            const isActive = isActiveRoute(item.path);
            const isHovered = hoveredItem === index;

            return (
              <Link
                key={index}
                to={item.path}
                onMouseEnter={() => setHoveredItem(index)}
                onMouseLeave={() => setHoveredItem(null)}
                onClick={() => setIsMobileOpen(false)}
                className={`
                  group relative flex items-center gap-3 px-3.5 py-3 rounded-2xl
                  transition-all duration-300 cursor-pointer overflow-visible
                  ${isActive ? 'bg-emerald-50/50' : 'hover:bg-slate-50'}
                `}
              >
                {/* Active indicator */}
                {isActive && (
                  <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1.5 h-8 bg-emerald-500 rounded-r-full shadow-[2px_0_10px_rgba(16,185,129,0.3)]" />
                )}

                {/* Icon */}
                <div className={`
                  relative shrink-0 w-10 h-10 rounded-xl flex items-center justify-center
                  transition-all duration-300
                  ${isActive ? 'bg-emerald-500 text-white shadow-lg shadow-emerald-200' : 'bg-slate-50 text-slate-400 group-hover:text-slate-600'}
                  ${isHovered && !isActive ? 'scale-110 bg-slate-100' : ''}
                `}>
                  <Icon size={20} />
                </div>

                {/* Label */}
                <span
                  className={`
                    font-semibold text-[15px] whitespace-nowrap transition-all duration-500
                    ${isActive ? 'text-slate-900' : 'text-slate-500 group-hover:text-slate-800'}
                    ${isOpen ? 'opacity-100 w-auto translate-x-0' : 'opacity-0 w-0 -translate-x-4 overflow-hidden'}
                  `}
                >
                  {item.label}
                </span>

                {/* Tooltip (collapsed mode) */}
                {!isOpen && (
                  <div
                    className={`
                      absolute left-full top-1/2 -translate-y-1/2 ml-4 px-4 py-2.5
                      bg-slate-900 text-white text-xs font-semibold rounded-xl shadow-2xl
                      whitespace-nowrap pointer-events-none z-50
                      transition-all duration-300
                      ${isHovered ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-2'}
                    `}
                  >
                    {item.label}
                    <div className="absolute top-1/2 -left-1 w-2 h-2 bg-slate-900 rotate-45 -translate-y-1/2" />
                  </div>
                )}
              </Link>
            );
          })}
        </nav>

        {/* Logout footer */}
        <div className="relative p-4 border-t border-slate-100 shrink-0">
          <button
            onClick={handleLogout}
            className={`
              w-full flex items-center rounded-2xl transition-all duration-300 group
              ${isOpen ? 'px-4 py-3 gap-3 bg-slate-50 hover:bg-rose-50' : 'h-12 justify-center bg-slate-50 hover:bg-rose-50'}
            `}
          >
            <LogOut size={18} className="text-slate-400 group-hover:text-rose-500 transition-colors" />
            <span className={`
              font-bold text-sm text-slate-600 group-hover:text-rose-600 transition-all duration-500 whitespace-nowrap
              ${isOpen ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-4 w-0 overflow-hidden'}
            `}>
              Sign Out
            </span>

            {!isOpen && (
              <div className="absolute left-full top-1/2 -translate-y-1/2 ml-4 px-4 py-2 bg-slate-900 text-white text-xs font-bold rounded-xl opacity-0 group-hover:opacity-100 transition-all pointer-events-none shadow-xl">
                Sign Out
              </div>
            )}
          </button>
        </div>
      </aside>


    </>
  );
}