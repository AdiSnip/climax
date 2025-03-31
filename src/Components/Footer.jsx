import { FaFacebook, FaInstagram, FaLinkedin } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { Link } from "react-router-dom";

const Footer = () => {
  const quickLinks = ["Home", "About", "Daily", "Hourly", "Contact"];
  const socialLinks = [
    { icon: <FaFacebook />, label: "Facebook" , link:"https://www.facebook.com/profile.php?id=100070248054802" },
    { icon: <FaXTwitter />, label: "Twitter", link:"https://x.com/Aditya122005" },
    { icon: <FaInstagram />, label: "Instagram", link:"https://www.instagram.com/darkegox/" },
    { icon: <FaLinkedin />, label: "LinkedIn", link:"https://www.linkedin.com/in/adityasingh1412/" },
  ];

  return (
    <footer className="bg-gray-900 text-white py-8">
      <div className="container mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-8 text-center md:text-left">
        
        {/* Logo & Description */}
        <div>
          <h2 className="text-2xl font-bold text-yellow-400">Climax</h2>
          <p className="mt-2 text-gray-300">Your reliable weather forecast partner.</p>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-lg font-semibold text-gray-200">Quick Links</h3>
          <ul className="mt-2 space-y-2">
            {quickLinks.map((link) => (
              <li key={link}>
                <Link to={(link === 'Home')?'/':`/${link}`} className="hover:text-yellow-400">{link}</Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Social Media */}
        <div>
          <h3 className="text-lg font-semibold text-gray-200">Follow Us</h3>
          <div className="flex justify-center md:justify-start space-x-4 mt-2">
            {socialLinks.map(({ icon, label, link }) => (
              <a key={label} href={link} aria-label={label} target="_blank" className="text-gray-400 hover:text-yellow-400 text-2xl">
                {icon}
              </a>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom Section */}
      <div className="mt-8 border-t border-gray-700 pt-4 text-center text-gray-400">
        &copy; {new Date().getFullYear()} Climax. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
