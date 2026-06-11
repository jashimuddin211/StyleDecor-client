import { Link } from "react-router-dom";
import {
  FaFacebookF,
  FaInstagram,
  FaTwitter,
  FaYoutube,
} from "react-icons/fa";

import {
  Mail,
  Phone,
  MapPin,
} from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-neutral text-neutral-content mt-20">
      <div className="max-w-7xl mx-auto px-6 py-14 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">

        {/* Logo & About */}
        <div className="space-y-4">
          <div className="flex items-center gap-3">
            <img
              src="/logo.png"
              alt="StyleDecor"
              className="w-12 h-12 object-contain"
              onError={(e) => { e.target.style.display = "none"; }}
            />
            <div>
              <h2 className="text-2xl font-bold">
                <span className="text-primary">Style</span>
                <span className="text-secondary">Decor</span>
              </h2>
              <p className="text-xs opacity-70">
                Home & Ceremony Decoration
              </p>
            </div>
          </div>
          <p className="text-sm leading-relaxed opacity-80">
            We provide premium home and ceremony decoration
            services with modern designs, experienced decorators,
            and seamless booking solutions.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-lg font-bold mb-5 text-primary">
            Quick Links
          </h3>
          <ul className="space-y-3 text-sm">
            <li>
              <Link to="/" className="hover:text-primary transition-colors opacity-80 hover:opacity-100">Home</Link>
            </li>
            <li>
              <Link to="/services" className="hover:text-primary transition-colors opacity-80 hover:opacity-100">Explore Services</Link>
            </li>
            <li>
              <Link to="/decorators" className="hover:text-primary transition-colors opacity-80 hover:opacity-100">Meet Decorators</Link>
            </li>
            <li>
              <Link to="/about" className="hover:text-primary transition-colors opacity-80 hover:opacity-100">About Us</Link>
            </li>
            <li>
              <Link to="/contact" className="hover:text-primary transition-colors opacity-80 hover:opacity-100">Contact Support</Link>
            </li>
            <li>
              <Link to="/help" className="hover:text-primary transition-colors opacity-80 hover:opacity-100">Help & Support</Link>
            </li>
          </ul>
        </div>

        {/* Contact Details */}
        <div>
          <h3 className="text-lg font-bold mb-5 text-secondary">
            Contact Details
          </h3>
          <div className="space-y-4 text-sm opacity-80">
            <div className="flex items-start gap-3">
              <MapPin size={18} className="text-primary mt-0.5 shrink-0" />
              <p>Kaliganj, Gazipur, Bangladesh</p>
            </div>
            <div className="flex items-center gap-3">
              <Phone size={18} className="text-primary shrink-0" />
              <p>+880 1234-567890</p>
            </div>
            <div className="flex items-center gap-3">
              <Mail size={18} className="text-primary shrink-0" />
              <p>support@styledecor.com</p>
            </div>
          </div>
        </div>

        {/* Social Media */}
        <div>
          <h3 className="text-lg font-bold mb-5 text-accent">
            Follow Us
          </h3>
          <p className="text-sm opacity-70 mb-4">
            Connect with us on social media for daily tips, reviews, and styling trends.
          </p>
          <div className="flex gap-3">
            <a
              href="https://facebook.com"
              target="_blank"
              rel="noopener noreferrer"
              className="w-10 h-10 rounded-full bg-base-100 text-primary flex items-center justify-center hover:scale-110 duration-200 shadow-md"
              aria-label="Facebook"
            >
              <FaFacebookF size={16} />
            </a>

            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              className="w-10 h-10 rounded-full bg-base-100 text-primary flex items-center justify-center hover:scale-110 duration-200 shadow-md"
              aria-label="Instagram"
            >
              <FaInstagram size={16} />
            </a>

            <a
              href="https://twitter.com"
              target="_blank"
              rel="noopener noreferrer"
              className="w-10 h-10 rounded-full bg-base-100 text-primary flex items-center justify-center hover:scale-110 duration-200 shadow-md"
              aria-label="Twitter"
            >
              <FaTwitter size={16} />
            </a>

            <a
              href="https://youtube.com"
              target="_blank"
              rel="noopener noreferrer"
              className="w-10 h-10 rounded-full bg-base-100 text-primary flex items-center justify-center hover:scale-110 duration-200 shadow-md"
              aria-label="Youtube"
            >
              <FaYoutube size={16} />
            </a>
          </div>
        </div>

      </div>

      {/* Bottom Footer */}
      <div className="border-t border-white/10">
        <div className="max-w-7xl mx-auto px-6 py-5 flex flex-col md:flex-row items-center justify-between gap-3 text-xs opacity-75">
          <p>© 2026 StyleDecor. All Rights Reserved.</p>
          <p>Designed & Developed by Muhammad Jashim</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;