import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  LayoutDashboard,
  PieChart,
  TrendingUp,
  Settings,
  LogIn,
  Menu,
  X,
} from "lucide-react";
import { Link } from "react-router-dom";

const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const navigate = useNavigate();
  return (
    <nav className="bg-white text-gray-900 shadow-md fixed w-full top-0 z-50">
      <div className="container mx-auto flex justify-between items-center px-6 py-4">
        <div className="flex items-center space-x-2">
          <PieChart className="h-8 w-8 text-blue-600" />
          <span className="text-2xl font-semibold">PortfolioX</span>
        </div>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center space-x-6">
          <Link to="/" className="no-underline">
            <button className="flex items-center space-x-2 px-3 py-2 rounded-lg hover:bg-blue-50 transition-colors">
              <LayoutDashboard />
              <span>Dashboard</span>
            </button>
          </Link>
          <Link to="/markets" className="no-underline">
            <button className="flex items-center space-x-2 px-3 py-2 rounded-lg hover:bg-blue-50 transition-colors">
              <TrendingUp />
              <span>Markets</span>
            </button>
          </Link>
          <Link to="/settings" className="no-underline">
            <button className="flex items-center space-x-2 px-3 py-2 rounded-lg hover:bg-blue-50 transition-colors">
              <Settings />
              <span>Settings</span>
            </button>
          </Link>
        </div>

        <div className="flex items-center space-x-4">
          <button className="p-2 hover:bg-blue-50 rounded-full transition-colors"
          onClick={() => navigate("/login")}
          >
            <LogIn size={20} />
          </button>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2 hover:bg-blue-50 rounded-full transition-colors"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden absolute top-full left-0 w-full bg-white border-t border-gray-200 py-2 shadow-md">
          <div className="container mx-auto space-y-1">
            <Link to="/" className="no-underline">
              <button className="flex items-center space-x-2 px-4 py-3 w-full hover:bg-blue-50 transition-colors">
                <LayoutDashboard />
                <span>Dashboard</span>
              </button>
            </Link>
            <Link to="/markets" className="no-underline">
              <button className="flex items-center space-x-2 px-4 py-3 w-full hover:bg-blue-50 transition-colors">
                <TrendingUp />
                <span>Markets</span>
              </button>
            </Link>
            <Link to="/settings" className="no-underline">
              <button className="flex items-center space-x-2 px-4 py-3 w-full hover:bg-blue-50 transition-colors">
                <Settings />
                <span>Settings</span>
              </button>
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
