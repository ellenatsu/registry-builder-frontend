import React, { useState } from "react";
import { Link } from "react-router-dom";

const MobileNavMenu: React.FC = () => {
  // State for top-level submenus (about, guides, more, contest, etc.)
  const [openSubMenu, setOpenSubMenu] = useState<string | null>(null);
  // Separate state for nested submenu under "Contest"
  const [contestSubOpen, setContestSubOpen] = useState(false);
  const [legalSubOpen, setLegalSubOpen] = useState(false);

  // Toggle for top-level submenu
  const toggleSubMenu = (menuName: string) => {
    if (openSubMenu === menuName) {
      setOpenSubMenu(null);
    } else {
      setOpenSubMenu(menuName);
    }
  };

  const SUBMENUCSS = "block py-1 px-2 menuLink text-gray-300 hover:bg-gray-800";


  return (
    <ul className="flex flex-col space-y-1">
      {/* ABOUT Submenu */}
      <li>
        <button
          onClick={() => toggleSubMenu("about")}
          className="menuLink text-[#222] focus:outline-none"
        >
          About
        </button>
        {openSubMenu === "about" && (
          <ul className="mt-1 bg-black  p-2 min-w-[200px]">
            <li>
              <Link to="/about-us" className={SUBMENUCSS}>
                About Us
              </Link>
            </li>
            <li>
              <Link to="/faqs" className={SUBMENUCSS}>
                FAQ
              </Link>
            </li>
            <li>
              <Link to="/contact-us" className={SUBMENUCSS}>
                Contact Us
              </Link>
            </li>
          </ul>
        )}
      </li>

      {/* GUIDES Submenu */}
      <li>
        <button
          onClick={() => toggleSubMenu("guides")}
          className="menuLink text-[#222] focus:outline-none"
        >
          Guides
        </button>
        {openSubMenu === "guides" && (
          <ul className="mt-1 bg-black  p-2 min-w-[200px]">
            <li>
              <Link to="/guide/tutorial" className={SUBMENUCSS}>
                Tutorial
              </Link>
            </li>
            <li>
              <Link to="/guide/pricing" className={SUBMENUCSS}>
                Pricing
              </Link>
            </li>
          </ul>
        )}
      </li>

      {/* BLOG (no submenu) */}
      <li>
        <Link to="/blog" className="menuLink text-[#222] font-medium">
          Blog
        </Link>
      </li>

      {/* MORE Submenu */}
      <li>
        <button
          onClick={() => toggleSubMenu("more")}
          className="menuLink text-[#222] font-medium focus:outline-none"
        >
          More
        </button>
        {openSubMenu === "more" && (
          <ul className="bg-black min-w-[200px]">
            <li>
              <Link to="/partner-with-us" className={SUBMENUCSS}>
                Partnership With Us
              </Link>
            </li>
            {/* Nested "Legal" submenu */}
            <li>
            <div
                className={`flex items-center justify-between ${SUBMENUCSS} cursor-pointer p-2`}
                onClick={() => setLegalSubOpen(!legalSubOpen)}
              >
                <span>Legal</span>
                <span className="ml-2">•</span>
              </div>
              {legalSubOpen && (
                <ul className="bg-black p-2 min-w-[200px] ">
                  <li>
                    <Link to="/terms-of-service" className={SUBMENUCSS}>
                      Terms of Service
                    </Link>
                  </li>
                  <li>
                    <Link to="/privacy-policy" className={SUBMENUCSS}>
                      Privacy Policy
                    </Link>
                  </li>
                </ul>
              )}
            </li>
          </ul>
        )}
      </li>

      {/* CONTEST Submenu */}
      <li>
        <button
          onClick={() => toggleSubMenu("contest")}
          className="menuLink text-[#222] font-medium focus:outline-none"
        >
          Contest
        </button>
        {openSubMenu === "contest" && (
          <ul className="bg-black p-2 min-w-[200px]">
            <li>
              <div
                onClick={() => setContestSubOpen(!contestSubOpen)}
                className={`flex items-center justify-between ${SUBMENUCSS} cursor-pointer`}
              >
                <span>Giveaway</span>
                <span className="ml-2">•</span>
              </div>
              {contestSubOpen && (
                <ul className="bg-black p-2">
                  <li>
                    <Link to="/giveaway/win-luggage" className={SUBMENUCSS}>
                      Win Luggage
                    </Link>
                  </li>
                </ul>
              )}
            </li>
            <li>
              <a
                href="https://www.instagram.com/p/DHEyN_6SdHi/?utm_source=ig_web_copy_link&igsh=MzRlODBiNWFlZA=="
                className={SUBMENUCSS}
                target="_blank"
              >
                Luck Draw
              </a>
            </li>
          </ul>
        )}
      </li>
    </ul>
  );
};

export default MobileNavMenu;
