import { Routes, Route, useLocation } from "react-router-dom";
import { useEffect } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { ToastProvider } from "@/hooks/useToast";
import { AuthProvider } from "@/hooks/useAuth";
import HomePage from "@/pages/HomePage";
import ExplorePage from "@/pages/ExplorePage";
import SalonDetailPage from "@/pages/SalonDetailPage";
import AboutPage from "@/pages/AboutPage";
import AuthPage from "@/pages/AuthPage";
import ProfilePage from "@/pages/ProfilePage";
import MapPage from "@/pages/MapPage";
import BookingsPage from "@/pages/BookingsPage";
import SavedSalonsPage from "@/pages/SavedSalonsPage";
import FeedbackPage from "@/pages/FeedbackPage";

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

function Layout({ children }: { children: React.ReactNode }) {
  const location = useLocation();
  const isAuthPage = location.pathname === "/login";

  return (
    <div className="min-h-screen bg-cream overflow-x-hidden">
      {!isAuthPage && <Navbar />}
      <ScrollToTop />
      <main className="animate-in fade-in duration-500">
        {children}
      </main>
      {!isAuthPage && <Footer />}
    </div>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <ToastProvider>
        <Layout>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/explore" element={<ExplorePage />} />
            <Route path="/salon/:id" element={<SalonDetailPage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/map" element={<MapPage />} />
            <Route path="/login" element={<AuthPage />} />
            <Route path="/profile" element={<ProfilePage />} />
            <Route path="/bookings" element={<BookingsPage />} />
            <Route path="/saved-salons" element={<SavedSalonsPage />} />
            <Route path="/feedback" element={<FeedbackPage />} />
          </Routes>
        </Layout>
      </ToastProvider>
    </AuthProvider>
  );
}
