import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { dashboardMenuItems } from "../../constants/textContent";
import { useUserStore } from "../../stores/userStore";
import { useAuth0 } from "@auth0/auth0-react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const DashboardMenu: React.FC = () => {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const { userData } = useUserStore();
  const { logout } = useAuth0();

  const toggleMenu = () => setIsOpen(!isOpen);
  const closeMenu = () => setIsOpen(false);

  return (
    <div className="relative mr-4">
      {/* Toggle Button */}
      <button
        onClick={toggleMenu}
        className="btn btn-sm btn-accent flex items-center swap swap-rotate"
        aria-label="Toggle Dashboard Menu"
      >
        {!isOpen ? (
          <svg
            className="swap-off fill-current"
            xmlns="http://www.w3.org/2000/svg"
            width="32"
            height="32"
            color="#FFFFFF"
            viewBox="0 0 512 512"
          >
            <path d="M64,384H448V341.33H64Zm0-106.67H448V234.67H64ZM64,128v42.67H448V128Z" />
          </svg>
        ) : (
          <svg
          className="swap-off fill-current"
          xmlns="http://www.w3.org/2000/svg"
          width="32"
          height="32"
          color="#FFFFFF"
          viewBox="0 0 512 512"
        >
          <path d="M289.94,256l126.9-126.9a22.63,22.63,0,0,0-32-32L256,223.94,129.1,97.03a22.63,22.63,0,0,0-32,32L223.94,256,97.03,382.9a22.63,22.63,0,1,0,32,32L256,289.94l126.9,126.9a22.63,22.63,0,0,0,32-32Z" />
        </svg>
        
        )}
        <span className="ml-2 text-base-100">Dashboard Menu</span>
      </button>

      {/* Dropdown Menu */}
      {isOpen && (
        <div
          className="absolute bg-accent text-secondary top-full left-0 w-screen mt-2 rounded-lg shadow-lg z-50 animate-fade-in"
          style={{ maxWidth: "90vw", width: "300px" }}
        >
          <div className="p-4 border-b border-secondary">
            <div className="text-center font-semibold">
              Hi, {userData?.name}
            </div>
          </div>

          {/* Navigation Items */}
          <nav className="flex flex-col px-6 py-4 space-y-3">
            {dashboardMenuItems.map((item) => (
              <button
                key={item.name}
                onClick={() => navigate(item.href)}
                className={`w-full flex items-center p-2 rounded-md hover:seccondary ${
                  location.pathname === item.href ? "bg-secondary" : ""
                }`}
              >
                <FontAwesomeIcon icon={item.icon} className="mr-2" />
                <p className="text-primary font-semibold">{item.name}</p>
              </button>
            ))}
          </nav>

          {/* Logout Button */}
          <div className="border-t border-secondary p-4">
            <button
              onClick={() => {
                closeMenu();
                logout({ logoutParams: { returnTo: "https://www.fundmywish.ca/" } });
              }}
              className="w-full btn btn-outline btn-neutral"
            >
              Log Out
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default DashboardMenu;
