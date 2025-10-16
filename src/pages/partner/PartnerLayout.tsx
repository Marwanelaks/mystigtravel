import { useNavigate, useLocation } from "react-router-dom";
import { LayoutDashboard, ClipboardList, Briefcase, LogOut, FileText, Users, BarChart3 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { logout as doLogout } from "@/services/auth";

interface PartnerLayoutProps {
  children: React.ReactNode;
}

const menuItems = [
  { 
    icon: LayoutDashboard, 
    label: "Dashboard", 
    href: "/partner-dashboard",
    description: "Overview and statistics"
  },
  { 
    icon: ClipboardList, 
    label: "Assigned Demands", 
    href: "/assigned-demands",
    description: "View assigned client demands"
  },
  // { 
  //   icon: FileText, 
  //   label: "Create Proposals", 
  //   href: "/create-proposals",
  //   description: "Create new proposals for demands"
  // },
  { 
    icon: Briefcase, 
    label: "My Proposals", 
    href: "/my-proposals",
    description: "Manage your submitted proposals"
  },
  // { 
  //   icon: BarChart3, 
  //   label: "Statistics", 
  //   href: "/partner-statistics",
  //   description: "View performance metrics"
  // },
];

const PartnerLayout = ({ children }: PartnerLayoutProps) => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const navigate = useNavigate();
  const location = useLocation();

  const isActiveItem = (href: string) => location.pathname === href;

  const handleLogout = () => {
    doLogout();
    navigate("/login");
  };

  return (
    <div className="min-h-screen bg-gray-50 font-poppins">
      {/* Sidebar */}
      <motion.aside
        initial={false}
        animate={{ width: sidebarOpen ? 280 : 80 }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
        className="fixed left-0 top-0 h-screen bg-gradient-to-b from-blue-900 to-indigo-900 shadow-2xl z-50 overflow-hidden"
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
                  <div className="w-11 h-11 bg-gradient-to-br from-yellow-400 to-orange-400 rounded-xl flex items-center justify-center shadow-lg">
                    <span className="text-blue-900 font-bold text-xl">M</span>
                  </div>
                  <div>
                    <h1 className="text-white font-bold text-lg tracking-wide">Mystic Partner</h1>
                    <p className="text-white/60 text-xs">Partner Panel</p>
                  </div>
                </motion.div>
              ) : (
                <motion.div
                  key="logo-mini"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.2 }}
                  className="w-11 h-11 bg-gradient-to-br from-yellow-400 to-orange-400 rounded-xl flex items-center justify-center shadow-lg mx-auto"
                >
                  <span className="text-blue-900 font-bold text-xl">M</span>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Toggle Button */}
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="absolute -right-3 top-20 w-7 h-7 bg-gradient-to-br from-yellow-400 to-orange-400 rounded-full flex items-center justify-center shadow-lg hover:shadow-xl transition-all z-10 hover:scale-110 border-2 border-white"
          >
            {sidebarOpen ? (
              <span className="text-blue-900 font-bold text-sm">&lt;</span>
            ) : (
              <span className="text-blue-900 font-bold text-sm">&gt;</span>
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
                  className={`relative flex items-start w-full px-4 py-3.5 rounded-xl transition-all duration-200 group ${
                    active
                      ? "bg-gradient-to-r from-yellow-400 to-orange-400 text-blue-900 shadow-lg"
                      : "text-white/70 hover:text-white hover:bg-white/10"
                  }`}
                >
                  {active && (
                    <motion.div
                      layoutId="activeTab"
                      className="absolute left-0 w-1 h-12 bg-blue-900 rounded-r-full"
                      transition={{ type: "spring", stiffness: 300, damping: 30 }}
                    />
                  )}
                  <item.icon className={`w-5 h-5 ${sidebarOpen ? "mr-3 mt-1" : "mx-auto"} flex-shrink-0`} />
                  <AnimatePresence>
                    {sidebarOpen && (
                      <motion.div
                        initial={{ opacity: 0, width: 0 }}
                        animate={{ opacity: 1, width: "auto" }}
                        exit={{ opacity: 0, width: 0 }}
                        transition={{ duration: 0.2 }}
                        className="text-left flex-1"
                      >
                        <div className="font-semibold text-sm whitespace-nowrap">
                          {item.label}
                        </div>
                        <div className="text-xs opacity-70 mt-0.5">
                          {item.description}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                  
                  {/* Active indicator dot for collapsed sidebar */}
                  {!sidebarOpen && active && (
                    <div className="absolute top-2 right-2 w-2 h-2 bg-blue-900 rounded-full" />
                  )}
                </motion.button>
              );
            })}
          </nav>

          {/* User Info & Logout */}
          <div className="p-4 border-t border-white/10 space-y-3">
            {/* User Info (optional - if you have user data) */}
            <AnimatePresence>
              {sidebarOpen && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="px-3 py-2 rounded-lg bg-white/5"
                >
                  <div className="text-white text-sm font-medium">Partner Account</div>
                  <div className="text-white/60 text-xs">Ready to create proposals</div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Logout Button */}
            <motion.button
              onClick={handleLogout}
              whileHover={{ scale: 1.02, x: 4 }}
              whileTap={{ scale: 0.98 }}
              className="flex items-center w-full px-4 py-3 rounded-xl transition-all duration-200 text-white/70 hover:text-red-400 hover:bg-red-500/10 group"
            >
              <LogOut className={`w-5 h-5 ${sidebarOpen ? "mr-3" : "mx-auto"} group-hover:scale-110 transition-transform`} />
              <AnimatePresence>
                {sidebarOpen && (
                  <motion.span
                    initial={{ opacity: 0, width: 0 }}
                    animate={{ opacity: 1, width: "auto" }}
                    exit={{ opacity: 0, width: 0 }}
                    transition={{ duration: 0.2 }}
                    className="font-medium text-sm"
                  >
                    Logout
                  </motion.span>
                )}
              </AnimatePresence>
            </motion.button>
          </div>
        </div>
      </motion.aside>

      {/* Main content */}
      <motion.div
        initial={false}
        animate={{ marginLeft: sidebarOpen ? 280 : 80 }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
        className="min-h-screen"
      >
        <main className="p-6">{children}</main>
      </motion.div>
    </div>
  );
};

export default PartnerLayout;