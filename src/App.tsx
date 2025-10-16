import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import RequireAuth from "./components/RequireAuth";
import { AuthProvider } from "./contexts/AuthContext";
import { ThemeProvider } from "./contexts/ThemeContext";
import { CartProvider } from "./contexts/CartContext";
import Cart from "./pages/Cart";
import Index from "./pages/Index";
import Products from "./pages/Products";
import Hotels from "./pages/products/Hotels";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Statistics from "./pages/dashboard/Statistics";
import Events from "./pages/dashboard/Events";
import TransportList from "./pages/dashboard/transport/TransportList";
import CreateTransport from "./pages/dashboard/transport/CreateTransport";
import Packages from "./pages/dashboard/Packages";
import Demands from "./pages/dashboard/Demands";
import SpecialPackages from "./pages/dashboard/SpecialPackages";
import Cities from "./pages/dashboard/Cities";
import Activities from "./pages/dashboard/Activities";
import Services from "./pages/dashboard/Services";
import Artisan from "./pages/dashboard/Artisan";
import Food from "./pages/dashboard/Food";
import Tickets from "./pages/dashboard/Tickets";
import Settings from "./pages/dashboard/Settings";
import NotFound from "./pages/NotFound";
import Hotelsc from "./pages/dashboard/Hotels";
import AboutDetailPage from "./components/AboutDetailPage";
import PhilosophyPage from "./components/PhilosophyPage";
import { LanguageProvider } from "./contexts/LanguageContext";
import IndexUmrah from "./pages/IndexUmrah";
import UmrahDemands from "./pages/dashboard/UmrahDemands";
import PartnerDashboard from "./pages/partner/PartnerDashboard";
import AssignedDemands from "./pages/partner/AssignedDemands";
import CreateProposal from "./pages/partner/CreateProposal";
import MyProposals from "./pages/partner/MyProposals";
import ProposalDetail from "./pages/partner/ProposalDetail";
import { useEffect, useState } from "react";
import { authAPI } from "@/services/api";
import { AdminProposalsDashboard } from "./pages/dashboard/AdminProposalsDashboard";

const queryClient = new QueryClient();

const App = () => {
  const [userRole, setUserRole] = useState<string | null>(null);
  const [loadingRole, setLoadingRole] = useState(true);

  useEffect(() => {
    const fetchRole = async () => {
      try {
        const user = await authAPI.getCurrentUser();
        setUserRole(user.role);
      } catch {
        setUserRole(null);
      } finally {
        setLoadingRole(false);
      }
    };
    fetchRole();
  }, []);

  if (loadingRole) return <div>Loading...</div>;

  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider>
        <AuthProvider>
          <CartProvider>
            <TooltipProvider>
              <LanguageProvider>
                <Toaster />
                <Sonner />
                <BrowserRouter>
                  <Routes>
                    {/* Public routes accessible to ALL users (no conditions) */}
                    <Route path="/" element={<Index />} />
                    <Route path="/umrah" element={<IndexUmrah />} />
                    <Route path="/about-us" element={<AboutDetailPage />} />
                    <Route path="/philosophy" element={<PhilosophyPage />} />
                    <Route path="/products" element={<Products />} />
                    <Route path="/products/hotels" element={<Hotels />} />
                    <Route path="/cart" element={<Cart />} />
                    <Route path="/login" element={<Login />} />

                    {/* Protected Admin Routes */}
                    <Route 
                      path="/dashboard" 
                      element={
                        <RequireAuth>
                          {userRole === "ROLE_ADMIN" ? <Dashboard /> : <Navigate to="/" replace />}
                        </RequireAuth>
                      } 
                    />
                    <Route 
                      path="/dashboard/statistics" 
                      element={
                        <RequireAuth>
                          {userRole === "ROLE_ADMIN" ? <Statistics /> : <Navigate to="/" replace />}
                        </RequireAuth>
                      } 
                    />
                    <Route 
                      path="/dashboard/demands" 
                      element={
                        <RequireAuth>
                          {userRole === "ROLE_ADMIN" ? <Demands /> : <Navigate to="/" replace />}
                        </RequireAuth>
                      } 
                    />
                    <Route 
                      path="/dashboard/hotels" 
                      element={
                        <RequireAuth>
                          {userRole === "ROLE_ADMIN" ? <Hotelsc /> : <Navigate to="/" replace />}
                        </RequireAuth>
                      } 
                    />
                    <Route 
                      path="/dashboard/special-packages" 
                      element={
                        <RequireAuth>
                          {userRole === "ROLE_ADMIN" ? <SpecialPackages /> : <Navigate to="/" replace />}
                        </RequireAuth>
                      } 
                    />
                    <Route 
                      path="/dashboard/events" 
                      element={
                        <RequireAuth>
                          {userRole === "ROLE_ADMIN" ? <Events /> : <Navigate to="/" replace />}
                        </RequireAuth>
                      } 
                    />
                    <Route 
                      path="/dashboard/transport" 
                      element={
                        <RequireAuth>
                          {userRole === "ROLE_ADMIN" ? <TransportList /> : <Navigate to="/" replace />}
                        </RequireAuth>
                      } 
                    />
                    <Route 
                      path="/dashboard/transport/create" 
                      element={
                        <RequireAuth>
                          {userRole === "ROLE_ADMIN" ? <CreateTransport /> : <Navigate to="/" replace />}
                        </RequireAuth>
                      } 
                    />
                    <Route 
                      path="/dashboard/cities" 
                      element={
                        <RequireAuth>
                          {userRole === "ROLE_ADMIN" ? <Cities /> : <Navigate to="/" replace />}
                        </RequireAuth>
                      } 
                    />
                    <Route 
                      path="/dashboard/activities" 
                      element={
                        <RequireAuth>
                          {userRole === "ROLE_ADMIN" ? <Activities /> : <Navigate to="/" replace />}
                        </RequireAuth>
                      } 
                    />
                    <Route 
                      path="/dashboard/services" 
                      element={
                        <RequireAuth>
                          {userRole === "ROLE_ADMIN" ? <Services /> : <Navigate to="/" replace />}
                        </RequireAuth>
                      } 
                    />
                    <Route 
                      path="/dashboard/packages" 
                      element={
                        <RequireAuth>
                          {userRole === "ROLE_ADMIN" ? <Packages /> : <Navigate to="/" replace />}
                        </RequireAuth>
                      } 
                    />
                    <Route 
                      path="/dashboard/artisan" 
                      element={
                        <RequireAuth>
                          {userRole === "ROLE_ADMIN" ? <Artisan /> : <Navigate to="/" replace />}
                        </RequireAuth>
                      } 
                    />
                    <Route 
                      path="/dashboard/food" 
                      element={
                        <RequireAuth>
                          {userRole === "ROLE_ADMIN" ? <Food /> : <Navigate to="/" replace />}
                        </RequireAuth>
                      } 
                    />
                    <Route 
                      path="/dashboard/tickets" 
                      element={
                        <RequireAuth>
                          {userRole === "ROLE_ADMIN" ? <Tickets /> : <Navigate to="/" replace />}
                        </RequireAuth>
                      } 
                    />
                    <Route 
                      path="/dashboard/settings" 
                      element={
                        <RequireAuth>
                          {userRole === "ROLE_ADMIN" ? <Settings /> : <Navigate to="/" replace />}
                        </RequireAuth>
                      } 
                    />
                    <Route 
                      path="/dashboard/umrah-demands" 
                      element={
                        <RequireAuth>
                          {userRole === "ROLE_ADMIN" ? <UmrahDemands /> : <Navigate to="/" replace />}
                        </RequireAuth>
                      } 
                    />
                     <Route 
                      path="/dashboard/admin/umrah/proposals" 
                      element={
                        <RequireAuth>
                          {userRole === "ROLE_ADMIN" ? <AdminProposalsDashboard /> : <Navigate to="/" replace />}
                        </RequireAuth>
                      } 
                    />

                    {/* Protected Partner Routes */}
                    <Route 
                      path="/partner-dashboard" 
                      element={
                        <RequireAuth>
                          {userRole === "ROLE_PARTENAIRE" ? <PartnerDashboard /> : <Navigate to="/" replace />}
                        </RequireAuth>
                      } 
                    />
                    <Route 
                      path="/assigned-demands" 
                      element={
                        <RequireAuth>
                          {userRole === "ROLE_PARTENAIRE" ? <AssignedDemands /> : <Navigate to="/" replace />}
                        </RequireAuth>
                      } 
                    />
                    <Route 
                      path="/my-proposals" 
                      element={
                        <RequireAuth>
                          {userRole === "ROLE_PARTENAIRE" ? <MyProposals /> : <Navigate to="/" replace />}
                        </RequireAuth>
                      } 
                    />
                    <Route 
                      path="/proposals/:id" 
                      element={
                        <RequireAuth>
                          {userRole === "ROLE_PARTENAIRE" ? <ProposalDetail /> : <Navigate to="/" replace />}
                        </RequireAuth>
                      } 
                    />
                    <Route 
                      path="/partner/proposals/create" 
                      element={
                        <RequireAuth>
                          {userRole === "ROLE_PARTENAIRE" ? <CreateProposal /> : <Navigate to="/" replace />}
                        </RequireAuth>
                      } 
                    />

                    {/* Catch-all route */}
                    <Route path="*" element={<NotFound />} />
                  </Routes>
                </BrowserRouter>
              </LanguageProvider>
            </TooltipProvider>
          </CartProvider>
        </AuthProvider>
      </ThemeProvider>
    </QueryClientProvider>
  );
};

export default App;