import {
  Facebook,
  Twitter,
  Instagram,
  Linkedin,
  Mail,
  Phone,
  MapPin,
} from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-gray-300">
      <div className="max-w-7xl mx-auto px-4 py-12">
        {/* Responsive Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* About Us Section */}
          <div>
            <h3 className="text-xl font-semibold text-white mb-4">About Us</h3>
            <p className="text-gray-400 text-sm md:text-base">
              We provide innovative investment solutions and expert financial
              guidance to help our clients achieve their financial goals.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-xl font-semibold text-white mb-4">
              Quick Links
            </h3>
            <ul className="space-y-2 text-sm md:text-base">
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  Investment Strategies
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  Market Analysis
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  Financial Planning
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  Retirement Solutions
                </a>
              </li>
            </ul>
          </div>

          {/* Contact Information */}
          <div>
            <h3 className="text-xl font-semibold text-white mb-4">
              Contact Us
            </h3>
            <ul className="space-y-3 text-sm md:text-base">
              <li className="flex items-center gap-3">
                <Mail size={20} />
                <a
                  href="mailto:contact@investment.com"
                  className="hover:text-white transition-colors"
                >
                  contact@investment.com
                </a>
              </li>
              <li className="flex items-center gap-3">
                <Phone size={20} />
                <a
                  href="tel:+1234567890"
                  className="hover:text-white transition-colors"
                >
                  +1 (234) 567-890
                </a>
              </li>
              <li className="flex items-center gap-3">
                <MapPin size={20} />
                <span>123 Investment Street, NY 10001</span>
              </li>
            </ul>
          </div>

          {/* Social Media */}
          <div>
            <h3 className="text-xl font-semibold text-white mb-4">Follow Us</h3>
            <div className="flex space-x-4">
              <a
                href="#"
                className="hover:text-white transition-colors"
                aria-label="Facebook"
              >
                <Facebook size={24} />
              </a>
              <a
                href="#"
                className="hover:text-white transition-colors"
                aria-label="Twitter"
              >
                <Twitter size={24} />
              </a>
              <a
                href="#"
                className="hover:text-white transition-colors"
                aria-label="Instagram"
              >
                <Instagram size={24} />
              </a>
              <a
                href="#"
                className="hover:text-white transition-colors"
                aria-label="LinkedIn"
              >
                <Linkedin size={24} />
              </a>
            </div>
          </div>
        </div>

        {/* Footer Bottom */}
        <div className="border-t border-gray-800 mt-8 pt-6 text-center">
          <p className="text-gray-400 text-sm md:text-base">
            © {new Date().getFullYear()} Investment Dashboard. All rights
            reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
