import { useState } from "react";
import {
  LayoutDashboard,
  PieChart,
  TrendingUp,
  Settings,
  Bell,
  User,
  Menu,
  X,
} from "lucide-react";
import { Link } from "react-router-dom";

const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <nav className="bg-gray-900 text-white p-4 fixed w-full top-0 z-50">
      <div className="container mx-auto flex justify-between items-center">
        <div className="flex items-center space-x-2">
          <PieChart className="h-6 w-6 text-blue-500" />
          <span className="text-xl font-bold">PortfolioX</span>
        </div>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center space-x-6">
          <Link to="/" className="no-underline hover:bg-gray-800 rounded">
            <button className="flex items-center space-x-2 px-3 py-2 rounded-lg transition-colors ">
              <LayoutDashboard />
              <span>Dashboard</span>
            </button>
          </Link>
          <Link
            to="/markets"
            className="no-underline hover:bg-gray-800 rounded"
          >
            <button className="flex items-center space-x-2 px-3 py-2 rounded-lg transition-colors ">
              <TrendingUp />
              <span>Markets</span>
            </button>
          </Link>
          <Link
            to="/settings"
            className="no-underline hover:bg-gray-800 rounded"
          >
            <button className="flex items-center space-x-2 px-3 py-2 rounded-lg transition-colors ">
              <Settings />
              <span>Settings</span>
            </button>
          </Link>
        </div>

        <div className="flex items-center space-x-4">
          <button className="p-2 hover:bg-gray-800 rounded-full">
            <Bell size={20} />
          </button>
          <button className="p-2 hover:bg-gray-800 rounded-full">
            <User size={20} />
          </button>
          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2 hover:bg-gray-800 rounded-full"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden absolute top-full left-0 w-full bg-gray-900 border-t border-gray-800 py-2">
          <div className="container mx-auto space-y-1">
            <Link to="/" className="no-underline hover:bg-gray-800 rounded">
              <button className="flex items-center space-x-2 px-4 py-3 w-full transition-colors">
                <LayoutDashboard />
                <span>Dashboard</span>
              </button>
            </Link>
            <Link
              to="/markets"
              className="no-underline hover:bg-gray-800 rounded"
            >
              <button className="flex items-center space-x-2 px-4 py-3 w-full transition-colors">
                <TrendingUp />
                <span>Markets</span>
              </button>
            </Link>
            <Link
              to="/settings"
              className="no-underline hover:bg-gray-800 rounded"
            >
              <button className="flex items-center space-x-2 px-4 py-3 w-full transition-colors">
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
