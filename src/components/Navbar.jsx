import { useState, useEffect } from "react";
import { Link, NavLink } from "react-router-dom";
import {
  RiMenuLine,
  RiCloseLine,
  RiPhoneLine,
  RiMailLine,
  RiMapPinLine,
} from "react-icons/ri";

const navLinks = [
  { name: "Home", path: "/" },
  { name: "About", path: "/about" },
  { name: "Properties", path: "/properties" },
  { name: "Projects", path: "/projects" },
  { name: "Gallery", path: "/gallery" },
  { name: "Contact", path: "/contact" },
];

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      {/* Top Info Bar */}
      <div className="bg-[#0f2645] text-white text-xs hidden md:flex items-center justify-between px-8 py-2 border-b border-[#af7323]/30">
        <div className="flex items-center gap-6">
          <span className="flex items-center gap-1.5 text-[#af7323]">
            <RiPhoneLine />
            <span className="text-white">+91 7004397655</span>
          </span>
          <span className="flex items-center gap-1.5 text-[#af7323]">
            <RiMailLine />
            <span className="text-white">info@avyayadeveloper.com</span>
          </span>
        </div>
        <div className="flex items-center gap-1.5 text-[#af7323]">
          <RiMapPinLine />
          <span className="text-white">Ghaziabad, Uttar Pradesh</span>
        </div>
      </div>

      {/* Main Navbar */}
      <nav
        className={`sticky top-0 z-50 transition-all duration-300 ${
          scrolled
            ? "bg-white shadow-lg shadow-[#0f2645]/10"
            : "bg-white border-b border-gray-100"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            {/* Logo */}
            <Link to="/" className="flex items-center gap-3 shrink-0">
              <img
                src="/logo.png"
                alt="Avyaya Developer"
                className="h-20 w-auto object-contain"
              />
            </Link>

            {/* Desktop Nav Links */}
            <div className="hidden lg:flex items-center gap-1">
              {navLinks.map((link) => (
                <NavLink
                  key={link.name}
                  to={link.path}
                  className={({ isActive }) =>
                    `px-4 py-2 text-sm font-semibold tracking-wide rounded transition-all duration-200 relative group ${
                      isActive
                        ? "text-[#af7323]"
                        : "text-[#0f2645] hover:text-[#af7323]"
                    }`
                  }
                >
                  {({ isActive }) => (
                    <>
                      {link.name}
                      <span
                        className={`absolute bottom-0 left-1/2 -translate-x-1/2 h-0.5 bg-[#af7323] transition-all duration-300 ${
                          isActive ? "w-4/5" : "w-0 group-hover:w-4/5"
                        }`}
                      />
                    </>
                  )}
                </NavLink>
              ))}
            </div>

            {/* CTA Button */}
            <div className="hidden lg:flex items-center gap-3">
              <Link
                to="/contact"
                className="bg-[#0f2645] hover:bg-[#af7323] text-white text-sm font-semibold px-6 py-2.5 rounded transition-all duration-300 tracking-wide shadow-md"
              >
                Book a Site Visit
              </Link>
            </div>

            {/* Mobile Menu Toggle */}
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="lg:hidden text-[#0f2645] text-2xl p-2 rounded hover:bg-gray-100 transition"
            >
              {menuOpen ? <RiCloseLine /> : <RiMenuLine />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        <div
          className={`lg:hidden bg-white border-t border-gray-100 transition-all duration-300 overflow-hidden ${
            menuOpen ? "max-h-screen py-4" : "max-h-0"
          }`}
        >
          <div className="px-6 flex flex-col gap-1">
            {navLinks.map((link) => (
              <NavLink
                key={link.name}
                to={link.path}
                onClick={() => setMenuOpen(false)}
                className={({ isActive }) =>
                  `px-4 py-3 text-sm font-semibold rounded-lg transition ${
                    isActive
                      ? "bg-[#0f2645]/5 text-[#af7323]"
                      : "text-[#0f2645] hover:bg-gray-50"
                  }`
                }
              >
                {link.name}
              </NavLink>
            ))}
            <Link
              to="/contact"
              onClick={() => setMenuOpen(false)}
              className="mt-3 bg-[#0f2645] text-white text-sm font-semibold px-5 py-3 rounded-lg text-center tracking-wide"
            >
              Book a Site Visit
            </Link>
          </div>
        </div>
      </nav>
    </>
  );
}