import React, { useState } from "react";
import { Link } from "react-router-dom";

const NavDropdown: React.FC = () => {
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);

  const handleMouseEnter = (menu: string) => {
    setOpenDropdown(menu);
  };

  const handleMouseLeave = () => {
    setOpenDropdown(null);
  };

  const SUBMENUCSS = "block py-1 px-2 menuLink text-gray-300 hover:bg-gray-800";

  return (
    <ul className="flex space-x-4 items-center">
      <li className="relative">
        <button
          onClick={() => handleMouseEnter("about")}
          className="menuLink focus:outline-none"
        >
          About
        </button>
        {openDropdown === "about" && (
          <ul
            className="absolute left-0 top-full mt-1 bg-black  p-2 min-w-[200px] z-50"
            onMouseLeave={handleMouseLeave}
          >
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
                Contact US
              </Link>
            </li>
          </ul>
        )}
      </li>

      {/* Guides (click -> black block), no sub-sub here */}
      <li className="relative">
        <button
          onClick={() => handleMouseEnter("guides")}
          className="menuLink text-[#222] focus:outline-none"
        >
          Guides
        </button>
        {openDropdown === "guides" && (
          <ul
            className="absolute left-0 top-full mt-1 bg-black  p-2 min-w-[200px] z-50"
            onMouseLeave={handleMouseLeave}
          >
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

      {/* Blog */}
      <li>
        <Link to="/blog" className="menuLink text-[#222] font-medium">
          Blog
        </Link>
      </li>

      <li className="relative">
        <button
          onClick={() => handleMouseEnter("partnership")}
          className="menuLink text-[#222] focus:outline-none"
        >
          Partnership
        </button>
        {openDropdown === "partnership" && (
          <ul
            className="absolute left-0 top-full mt-1 bg-black p-2 min-w-[200px] z-50"
            onMouseLeave={handleMouseLeave}
          >
            <li>
              <Link to="/offer/neko-village-store" className={SUBMENUCSS}>
                Neko village store
              </Link>
            </li>
            <li>
              <Link to="/offer/somethink-studio" className={SUBMENUCSS}>
                Somethink studio
              </Link>
            </li>
          </ul>
        )}
      </li>

      <li className="relative">
        <button
          onClick={() => handleMouseEnter("contest")}
          className="menuLink text-[#222] font-medium focus:outline-none"
        >
          Contest
        </button>
        {openDropdown === "contest" && (
          <ul
            className="absolute left-0 top-full bg-black p-2 min-w-[200px] z-50"
            onMouseLeave={handleMouseLeave}
          >
            {/* Sub-sub for "Legal" */}
            <li className="relative group">
              <div
                className={`flex items-center justify-between ${SUBMENUCSS} cursor-pointer`}
              >
                <span>Giveaway</span>
                <span className="ml-2">•</span>
              </div>
              <ul
                className="
                absolute left-full top-0 
                w-48 bg-black text-white p-2
                invisible opacity-0 
                group-hover:visible group-hover:opacity-100 
                transition duration-200
                z-50
              "
              >
                <li>
                  <Link to="/giveaway/win-luggage" className={SUBMENUCSS}>
                    Win luggage
                  </Link>
                </li>
              </ul>
            </li>
            <li>
              <a
                href="https://www.instagram.com/p/DHEyN_6SdHi/?utm_source=ig_web_copy_link&igsh=MzRlODBiNWFlZA==" 
                target="_blank"
                className={SUBMENUCSS}
              >
                Luck Draw
              </a>
            </li>
          </ul>
        )}
      </li>

      {/* More (click -> black block), sub-sub on hover */}
      <li className="relative">
        <button
          onClick={() => handleMouseEnter("more")}
          className="menuLink text-[#222] font-medium focus:outline-none"
        >
          More
        </button>
        {openDropdown === "more" && (
          <ul
            className="absolute left-0 top-full bg-black p-2 min-w-[200px] z-50"
            onMouseLeave={handleMouseLeave}
          >
            <li>
              <Link to="/partner-with-us" className={SUBMENUCSS}>
                Partnership With Us
              </Link>
            </li>
            {/* Sub-sub for "Legal" */}
            <li className="relative group">
              <div
                className={`flex items-center justify-between ${SUBMENUCSS} cursor-pointer`}
              >
                <span>Legal</span>
                <span className="ml-2">•</span>
              </div>
              <ul
                className="
                absolute left-full top-0 
                w-48 bg-black text-white p-2
                invisible opacity-0 
                group-hover:visible group-hover:opacity-100 
                transition duration-200
                z-50
              "
              >
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
            </li>
          </ul>
        )}
      </li>
    </ul>
  );
};

export default NavDropdown;
