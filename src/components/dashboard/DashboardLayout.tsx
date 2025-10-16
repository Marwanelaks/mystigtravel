import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  BarChart3, 
  Hotel, 
  Car, 
  Package, 
  UtensilsCrossed,
  Settings,
  LogOut,
  Menu,
  X,
  Users,
  Activity,
  Briefcase,
  MapPin,
  Crown,
  Bell,
  Search,
  ChevronLeft,
  ChevronRight,
  Globe
} from 'lucide-react';
import { getCurrentUser, isAuthenticated, logout as doLogout } from "@/services/auth";
import { useNavigate, useLocation } from 'react-router-dom';

interface DashboardLayoutProps {
  children: React.ReactNode;
}

interface UserData {
  id: string;
  name: string;
  email: string;
  role: string;
  avatar: string | null;
  phone: string | null;
  businessInfo: {
    companyName: string | null;
  };
}

const DashboardLayout = ({ children }: DashboardLayoutProps) => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [user, setUser] = useState<UserData | null>(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (isAuthenticated()) {
      getCurrentUser()
        .then((userData) => setUser(userData))
        .catch(() => {})
        .finally(() => setLoading(false));
    } else {
      setLoading(false);
      navigate('/login');
    }
  }, [navigate]);

  const menuItems = [
    { icon: BarChart3, label: 'Statistics', href: '/dashboard/statistics' },
    { icon: Users, label: 'Client Demands', href: '/dashboard/demands' },
    { icon: Crown, label: 'Umrah Demands', href: '/dashboard/umrah-demands' },
    { icon: Crown, label: 'Umrah Proposals', href: '/dashboard/admin/umrah/proposals' },
    { icon: Hotel, label: 'Hotels', href: '/dashboard/hotels' },
    { icon: Package, label: 'Special Packages', href: '/dashboard/special-packages' },
    { icon: Car, label: 'Transport', href: '/dashboard/transport' },
    { icon: MapPin, label: 'Cities', href: '/dashboard/cities' },
    { icon: Activity, label: 'Activities', href: '/dashboard/activities' },
    { icon: Briefcase, label: 'Services', href: '/dashboard/services' },
  ];

  const handleLogout = () => {
    doLogout();
    navigate('/');
  };

  const isActiveItem = (href: string) => location.pathname === href;

  if (loading) {
    return (
      <div className="min-h-screen bg-[hsl(var(--dashboard-bg))] flex items-center justify-center">
        <div className="w-16 h-16 border-4 border-[hsl(var(--dashboard-royal-blue))] border-t-[hsl(var(--dashboard-gold))] rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[hsl(var(--dashboard-bg))] font-poppins">
      {/* Sidebar */}
      <motion.aside
        initial={false}
        animate={{ width: sidebarOpen ? 240 : 80 }}
        transition={{ duration: 0.3, ease: 'easeInOut' }}
        className="fixed left-0 top-0 h-screen bg-[hsl(var(--dashboard-sidebar))] shadow-xl z-50"
      >
        <div className="flex flex-col h-full">
          {/* Logo */}
          <div className="flex items-center justify-between p-6 border-b border-white/10">
            <AnimatePresence mode="wait">
              {sidebarOpen ? (
                <motion.div
                  key="logo-full"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.2 }}
                  className="flex items-center space-x-3"
                >
                  <div className="w-10 h-10 bg-[hsl(var(--dashboard-gold))] rounded-xl flex items-center justify-center shadow-lg">
                    <span className="text-[hsl(var(--dashboard-royal-blue))] font-bold text-lg">M</span>
                  </div>
                  <div>
                    <h1 className="text-white font-bold text-lg tracking-wide">MysticTravel</h1>
                    <p className="text-white/60 text-xs">Admin Panel</p>
                  </div>
                </motion.div>
              ) : (
                <motion.div
                  key="logo-mini"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.2 }}
                  className="w-10 h-10 bg-[hsl(var(--dashboard-gold))] rounded-xl flex items-center justify-center shadow-lg mx-auto"
                >
                  <span className="text-[hsl(var(--dashboard-royal-blue))] font-bold text-lg">M</span>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Toggle Button */}
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="absolute -right-3 top-20 w-6 h-6 bg-[hsl(var(--dashboard-gold))] rounded-full flex items-center justify-center shadow-lg hover:bg-[hsl(var(--dashboard-gold-hover))] transition-colors z-10"
          >
            {sidebarOpen ? (
              <ChevronLeft className="w-4 h-4 text-[hsl(var(--dashboard-royal-blue))]" />
            ) : (
              <ChevronRight className="w-4 h-4 text-[hsl(var(--dashboard-royal-blue))]" />
            )}
          </button>

          {/* Navigation */}
          <nav className="flex-1 p-4 space-y-2 overflow-y-auto">
            {menuItems.map((item) => {
              const active = isActiveItem(item.href);
              return (
                <motion.button
                  key={item.href}
                  onClick={() => navigate(item.href)}
                  whileHover={{ scale: 1.02, x: 4 }}
                  whileTap={{ scale: 0.98 }}
                  className={`relative flex items-center w-full px-4 py-3 rounded-xl transition-all duration-200 group ${
                    active
                      ? 'bg-[hsl(var(--dashboard-gold))] text-[hsl(var(--dashboard-royal-blue))] shadow-lg'
                      : 'text-white/70 hover:text-white hover:bg-white/5'
                  }`}
                >
                  {active && (
                    <motion.div
                      layoutId="activeTab"
                      className="absolute left-0 w-1 h-8 bg-[hsl(var(--dashboard-royal-blue))] rounded-r-full"
                      transition={{ type: "spring", stiffness: 300, damping: 30 }}
                    />
                  )}
                  <item.icon className={`w-5 h-5 ${sidebarOpen ? 'mr-3' : 'mx-auto'} flex-shrink-0`} />
                  <AnimatePresence>
                    {sidebarOpen && (
                      <motion.span
                        initial={{ opacity: 0, width: 0 }}
                        animate={{ opacity: 1, width: 'auto' }}
                        exit={{ opacity: 0, width: 0 }}
                        transition={{ duration: 0.2 }}
                        className="font-medium text-sm whitespace-nowrap"
                      >
                        {item.label}
                      </motion.span>
                    )}
                  </AnimatePresence>
                </motion.button>
              );
            })}
          </nav>

          {/* Bottom actions */}
          <div className="p-4 border-t border-white/10 space-y-2">
            <motion.button
              onClick={() => navigate('/dashboard/settings')}
              whileHover={{ scale: 1.02, x: 4 }}
              whileTap={{ scale: 0.98 }}
              className={`relative flex items-center w-full px-4 py-3 rounded-xl transition-all duration-200 ${
                isActiveItem('/dashboard/settings')
                  ? 'bg-[hsl(var(--dashboard-gold))] text-[hsl(var(--dashboard-royal-blue))]'
                  : 'text-white/70 hover:text-white hover:bg-white/5'
              }`}
            >
              <Settings className={`w-5 h-5 ${sidebarOpen ? 'mr-3' : 'mx-auto'}`} />
              {sidebarOpen && <span className="font-medium text-sm">Settings</span>}
            </motion.button>
            
            <motion.button
              onClick={handleLogout}
              whileHover={{ scale: 1.02, x: 4 }}
              whileTap={{ scale: 0.98 }}
              className="flex items-center w-full px-4 py-3 rounded-xl transition-all duration-200 text-white/70 hover:text-red-400 hover:bg-red-500/10"
            >
              <LogOut className={`w-5 h-5 ${sidebarOpen ? 'mr-3' : 'mx-auto'}`} />
              {sidebarOpen && <span className="font-medium text-sm">Logout</span>}
            </motion.button>
          </div>
        </div>
      </motion.aside>

      {/* Main content */}
      <motion.div
        initial={false}
        animate={{ marginLeft: sidebarOpen ? 240 : 80 }}
        transition={{ duration: 0.3, ease: 'easeInOut' }}
        className="min-h-screen"
      >
        {/* Navbar */}
        <nav className="bg-white shadow-sm border-b border-gray-200 sticky top-0 z-40">
          <div className="px-6 py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <h2 className="text-xl font-semibold text-[hsl(var(--dashboard-text))]">
                  {menuItems.find(item => isActiveItem(item.href))?.label || 'Dashboard'}
                </h2>
              </div>
              
              <div className="flex items-center space-x-4">
                {/* Search */}
                <div className="hidden md:flex items-center bg-gray-50 rounded-xl px-4 py-2 border border-gray-200">
                  <Search className="w-4 h-4 text-[hsl(var(--dashboard-text-muted))] mr-2" />
                  <input 
                    type="text" 
                    placeholder="Search destinations, clients..." 
                    className="bg-transparent border-none outline-none text-sm text-[hsl(var(--dashboard-text))] placeholder-[hsl(var(--dashboard-text-muted))] w-64"
                  />
                </div>
                
                {/* Language Selector */}
                <button className="p-2 rounded-lg hover:bg-gray-100 transition-colors">
                  <Globe className="w-5 h-5 text-[hsl(var(--dashboard-text-muted))]" />
                </button>
                
                {/* Notifications */}
                <button className="relative p-2 rounded-lg hover:bg-gray-100 transition-colors">
                  <Bell className="w-5 h-5 text-[hsl(var(--dashboard-text-muted))]" />
                  <div className="absolute top-1 right-1 w-2 h-2 bg-[hsl(var(--destructive))] rounded-full"></div>
                </button>
                
                {/* User Profile */}
                {user && (
                  <div className="flex items-center space-x-3 pl-4 border-l border-gray-200">
                    <div className="text-right hidden md:block">
                      <p className="text-sm font-medium text-[hsl(var(--dashboard-text))]">{user.name}</p>
                      <p className="text-xs text-[hsl(var(--dashboard-text-muted))]">{user.email}</p>
                    </div>
                    <div className="w-10 h-10 bg-[hsl(var(--dashboard-gold))] rounded-full flex items-center justify-center">
                      <span className="text-[hsl(var(--dashboard-royal-blue))] font-bold text-sm">
                        {user.name.split(' ').map(n => n[0]).join('').slice(0, 2)}
                      </span>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </nav>

        {/* Page Content */}
        <main className="p-6 md:p-8">
          {children}
        </main>
      </motion.div>
    </div>
  );
};

export default DashboardLayout;
