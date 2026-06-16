import { Link } from "react-router-dom";
import {
  RiPhoneLine,
  RiMailLine,
  RiMapPinLine,
  RiFacebookFill,
  RiInstagramLine,
  RiYoutubeLine,
  RiTwitterXLine,
  RiWhatsappLine,
  RiArrowRightSLine,
  RiHome4Line,
  RiBuildingLine,
  RiShieldCheckLine,
} from "react-icons/ri";

const quickLinks = [
  { name: "Home", path: "/" },
  { name: "About Us", path: "/about" },
  { name: "Properties", path: "/properties" },
  { name: "Projects", path: "/projects" },
  { name: "Gallery", path: "/gallery" },
  { name: "Contact Us", path: "/contact" },
];

const propertyTypes = [
  "Luxury Apartments",
  "Premium Villas",
  "Commercial Spaces",
  "Plots & Land",
  "Affordable Housing",
  "Penthouses",
];

const socialLinks = [
  { icon: <RiFacebookFill />, href: "#", label: "Facebook" },
  { icon: <RiInstagramLine />, href: "#", label: "Instagram" },
  { icon: <RiYoutubeLine />, href: "#", label: "YouTube" },
  { icon: <RiTwitterXLine />, href: "#", label: "Twitter/X" },
  { icon: <RiWhatsappLine />, href: "#", label: "WhatsApp" },
];

const stats = [
  { icon: <RiHome4Line />, value: "500+", label: "Projects Delivered" },
  { icon: <RiBuildingLine />, value: "1200+", label: "Happy Families" },
  { icon: <RiShieldCheckLine />, value: "15+", label: "Years of Trust" },
];

export default function Footer() {
  return (
    <footer className="bg-[#0f2645] text-white">
      {/* Stats Strip */}
      <div className="border-b border-white/10">
        <div className="max-w-7xl mx-auto px-6 py-8 grid grid-cols-1 sm:grid-cols-3 gap-6 text-center">
          {stats.map((s, i) => (
            <div key={i} className="flex flex-col items-center gap-1">
              <span className="text-[#af7323] text-2xl">{s.icon}</span>
              <span className="text-3xl font-bold text-white">{s.value}</span>
              <span className="text-sm text-gray-400 tracking-wide">{s.label}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Main Footer Grid */}
      <div className="max-w-7xl mx-auto px-6 py-14 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
        {/* Brand Column */}
        <div className="lg:col-span-1">
          <Link to="/">
            <img
              src="/AVYAYA_logo.png"
              alt="Avyaya Developer"
              className="h-20 w-auto object-contain mb-5"
            />
          </Link>
          <p className="text-gray-400 text-sm leading-relaxed mb-6">
            Avyaya Developer — building landmark residences and commercial
            spaces across Ghaziabad and NCR with integrity, design excellence,
            and a commitment to every family's dream.
          </p>
          <div className="flex gap-3 flex-wrap">
            {socialLinks.map((s, i) => (
              <a
                key={i}
                href={s.href}
                aria-label={s.label}
                className="w-9 h-9 rounded-full border border-white/20 flex items-center justify-center text-gray-300 hover:bg-[#af7323] hover:border-[#af7323] hover:text-white transition-all duration-300 text-base"
              >
                {s.icon}
              </a>
            ))}
          </div>
        </div>

        {/* Quick Links */}
        <div>
          <h4 className="text-white font-bold text-base mb-6 flex items-center gap-2 after:flex-1 after:h-px after:bg-[#af7323]/40 after:ml-2">
            Quick Links
          </h4>
          <ul className="space-y-3">
            {quickLinks.map((link) => (
              <li key={link.name}>
                <Link
                  to={link.path}
                  className="flex items-center gap-2 text-gray-400 hover:text-[#af7323] text-sm transition-colors group"
                >
                  <RiArrowRightSLine className="text-[#af7323] group-hover:translate-x-1 transition-transform text-base" />
                  {link.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Property Types */}
        <div>
          <h4 className="text-white font-bold text-base mb-6 flex items-center gap-2 after:flex-1 after:h-px after:bg-[#af7323]/40 after:ml-2">
            Our Properties
          </h4>
          <ul className="space-y-3">
            {propertyTypes.map((type) => (
              <li key={type}>
                <Link
                  to="/properties"
                  className="flex items-center gap-2 text-gray-400 hover:text-[#af7323] text-sm transition-colors group"
                >
                  <RiArrowRightSLine className="text-[#af7323] group-hover:translate-x-1 transition-transform text-base" />
                  {type}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Contact Info */}
        <div>
          <h4 className="text-white font-bold text-base mb-6 flex items-center gap-2 after:flex-1 after:h-px after:bg-[#af7323]/40 after:ml-2">
            Contact Us
          </h4>
          <ul className="space-y-5">
            <li className="flex gap-3">
              <RiMapPinLine className="text-[#af7323] text-xl shrink-0 mt-0.5" />
              <span className="text-gray-400 text-sm leading-relaxed">
                Galaxy Diamond Plaza,Noida<br />Uttar Pradesh – 201301
              </span>
            </li>
            <li className="flex gap-3 items-center">
              <RiPhoneLine className="text-[#af7323] text-xl shrink-0" />
              <a
                href="tel:+919876543210"
                className="text-gray-400 text-sm hover:text-[#af7323] transition"
              >
                +91 7004397655
              </a>
            </li>
            <li className="flex gap-3 items-center">
              <RiMailLine className="text-[#af7323] text-xl shrink-0" />
              <a
                href="mailto:info@avyayadeveloper.com"
                className="text-gray-400 text-sm hover:text-[#af7323] transition"
              >
                info@avyayadeveloper.com
              </a>
            </li>
          </ul>

          {/* Newsletter */}
          <div className="mt-7">
            <p className="text-sm text-white font-semibold mb-3">Get Project Updates</p>
            <div className="flex gap-0 rounded-lg overflow-hidden border border-white/20">
              <input
                type="email"
                placeholder="Your email"
                className="bg-white/5 text-white text-sm px-4 py-2.5 flex-1 outline-none placeholder-gray-500"
              />
              <button className="bg-[#af7323] hover:bg-[#c98530] text-white text-sm px-4 font-semibold transition">
                Go
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-white/10">
        <div className="max-w-7xl mx-auto px-6 py-4 flex flex-col sm:flex-row items-center justify-between gap-2 text-xs text-gray-500">
          <p>© {new Date().getFullYear()} Avyaya Developer. All rights reserved.</p>
          <p>
            Designed with{" "}
            <span className="text-[#af7323]">♥</span> for dream homes
          </p>
        </div>
      </div>
    </footer>
  );
}