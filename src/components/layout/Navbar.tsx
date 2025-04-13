import { useAuth0 } from "@auth0/auth0-react";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenToSquare } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
import FundRightNowLogo from "../common/FWlogo";
import { homeTabContent } from "../../constants/textContent";

const Navbar = () => {
  const {  isAuthenticated,  loginWithRedirect } =
    useAuth0();
  const navigate = useNavigate();
  

  //control drawer
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  // Function to handle navigation and close the drawer
  const handleNavigation = (path: string) => {
    navigate(path); // Navigate to the new page
    setIsDrawerOpen(false); // Close the drawer
  };


  const handleCreateList = () => {
    if (!isAuthenticated) {
      loginWithRedirect({ appState: { returnTo: "/loading" } });
    } else {
      navigate("/wishlist/create");
    }
  };

  return (
    <div className="bg-[#F4F1ED] pt-1 pb-0">
      {/* Navbar for Mobile */}
      <div className="w-full md:hidden">
        <div className="drawer z-50">
          <input
            id="my-drawer"
            type="checkbox"
            className="drawer-toggle"
            checked={isDrawerOpen}
            onChange={(e) => setIsDrawerOpen(e.target.checked)}
          />
          <div className="drawer-content flex flex-row justify-between items-center">
            {/* Navbar */}
            <label
              htmlFor="my-drawer"
              aria-label="open sidebar"
              className="btn btn-square btn-ghost"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                className="inline-block h-6 w-6 stroke-current"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16M4 18h16"
                ></path>
              </svg>
            </label>
            <div className="flex flex-row space-x-0">
              <img src="/favicon_io/nobg-icon.png" className="w-8 h-8" />
              <a href="/" className="cursor-pointer">
                <FundRightNowLogo className="text-lg -ml-1" />
              </a>
            </div>
            <div className="mr-4">
              {!isAuthenticated ? (
                <button
                  onClick={() =>
                    loginWithRedirect({
                      appState: { returnTo: "/loading" },
                    })
                  }
                  className="btn btn-xs btn-primary btn-outline"
                >
                  Log In
                </button>
              ) : (
                <button
                  onClick={() => navigate("/dashboard")}
                  className="btn btn-xs btn-primary btn-outline"
                >
                  Dashboard
                </button>
              )}
            </div>
          </div>

          <div className="drawer-side z-10">
            <label
              htmlFor="my-drawer"
              aria-label="close sidebar"
              className="drawer-overlay"
            ></label>
            <div className="min-h-full w-[60%] bg-[#EFEFEF] p-4 items-center">
              <ul className="menu">
                <li
                  className="hover:underline cursor-pointer mb-2 mt-5"
                  onClick={() => handleNavigation("/")}
                >
                  Home
                </li>
                <li
                  className="hover:underline cursor-pointer mb-2"
                  onClick={() => handleNavigation("/browse-category")}
                >
                  Browse
                </li>
                {Object.entries(homeTabContent).map(
                  ([parentKey, submenuItems]) => (
                    <li key={parentKey} className="mb-2">
                      {parentKey.charAt(0).toUpperCase() + parentKey.slice(1)}

                      {submenuItems.length > 0 && (
                        <ul>
                          {submenuItems.map((item) => (
                            <li key={item.id}>
                              <a onClick={() => handleNavigation(item.link)}>
                                {item.title}
                              </a>
                            </li>
                          ))}
                        </ul>
                      )}
                    </li>
                  )
                )}
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Navbar for Desktop */}
      <div className="hidden md:flex md:navbar flex-row w-full justify-between">
        <div className="justify-self-start">
          {/* Logo */}
          <div className="flex items-center gap-0 p-0 m-0">
            <img src="/favicon_io/nobg-icon.png" className="w-14 h-14" />
            <a href="/" className="cursor-pointer">
              <FundRightNowLogo className="text-lg mt-2 -ml-1" />
            </a>
          </div>
        </div>

        {/* Navbar Center */}
        <div className="justify-self-center">
          <ul className="flex flex-row gap-8 justify-start">
            <li
              className="hover:underline cursor-pointer"
              onClick={() => navigate("/browse-category")}
            >
              Browse
            </li>
            {/* <li className="hover:underline cursor-pointer" onClick={() => navigate("/info/event")}>Offer</li> */}
            <li
              className="hover:underline cursor-pointer"
              onClick={() => navigate("/info/blog")}
            >
              Blog
            </li>
            <li
              className="hover:underline cursor-pointer"
              onClick={() => navigate("/info/guide/pricing")}
            >
              Pricing
            </li>
          </ul>
        </div>

        {/* Navbar End */}
        <div className="justify-self-end">
          <ul className="menu menu-horizontal px-1 gap-2">
            {isAuthenticated && (
              <li>
                <button
                  onClick={handleCreateList}
                  className="btn lg:btn-sm btn-xs btn-outline btn-accent"
                >
                  <FontAwesomeIcon icon={faPenToSquare} />
                  Create
                </button>
              </li>
            )}
            <li>
              {!isAuthenticated ? (
                <button
                  onClick={() =>
                    loginWithRedirect({ appState: { returnTo: "/loading" } })
                  }
                  className="btn lg:btn-sm btn-xs btn-primary btn-outline"
                >
                  Log In
                </button>
              ) : (
                <button
                  onClick={() => navigate("/dashboard")}
                  className="btn lg:btn-sm btn-xs btn-primary btn-outline"
                >
                  Dashboard
                </button>
              )}
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
