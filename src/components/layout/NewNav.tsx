import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenToSquare } from "@fortawesome/free-solid-svg-icons";
import NewNavMenu from "./NewNavMenu";
import MobileNavMenu from "./MobileNavMenu";

const NewNav: React.FC = () => {
  const { isAuthenticated } = useAuth0();
  const navigate = useNavigate();

  const handleCreateList = () => {
      navigate("/wishlist/create");
  };

  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <>
      {/* Fixed Navbar */}
      <nav
        className="
        fixed top-0 left-0 w-full z-50
        bg-white text-black 
        flex items-center 
        h-14
        px-6
        py-4 
        shadow
      "
      >
        {/* Logo */}
        <div className="flex items-center ml-6">
        <a href="https://www.fundmywish.ca/">
        <div className="flex flex-row gap-1 align-baseline">
        <img
              src="/favicon_io/favicon.ico"
              alt="FundmyWish Logo"
              className="h-6"
            />
            <img
              src="/images/logo-dark.png"
              alt="FundmyWish Logo"
              className="h-6"
            />
            </div>
          </a>
        </div>

        {/* Main Menu (Desktop) */}
        <div className="hidden md:flex items-center ml-10 space-x-6 font-sans">
          <a
            href="https://wedding.fundmywish.ca/"
            className="nav-special-wedding menuLink"
            target="_blank"
          >
            WEDDING
          </a>
          <a href="https://baby.fundmywish.ca/" className="nav-special-baby menuLink" target="_blank">
            BABY
          </a>
          <Link to="#" className="disbaled"></Link>
          <NewNavMenu />
        </div>

        {/* Right side: Login (Desktop) */}
        <div className="ml-auto hidden md:block font-sans">
          {isAuthenticated && (
            <div className="flex flex-between gap-2">
              <button
                onClick={handleCreateList}
                className="menuLink"
              >
                <FontAwesomeIcon icon={faPenToSquare} />
                Create
              </button>
              <button
                onClick={() => navigate("/dashboard")}
                className="menuLink"
              >
                Dashboard
              </button>
            </div>
          )}
          {!isAuthenticated && (
            <div
              onClick={() =>
                navigate('/auth')
              }
              className="menuLink"
            >
              LOGIN
            </div>
          )}
        </div>

        {/* Mobile Toggle Button */}
        <button
          className="ml-auto md:hidden text-xl focus:outline-none"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          ☰
        </button>
      </nav>

      {/* Mobile Menu (slide down) */}
      {menuOpen && (
        <div
          className="
          md:hidden 
          fixed top-16 left-0 w-full
          bg-white text-black 
          shadow
          px-6 py-4
          z-50
        "
        >
          <div className="flex flex-col space-y-4 font-sans">
            <MobileNavMenu />
            <a
              href="https://app.fundmywish.ca/auth"
              className="menuLink hover:no-underline"
            >
              Login
            </a>
          </div>
        </div>
      )}

      {/* Extra spacing so content doesn't hide behind nav */}
      <div className="h-16 md:h-16"></div>
    </>
  );
};

export default NewNav;
