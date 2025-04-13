// src/layouts/DashboardLayout.tsx
import React, { useEffect, useRef, useState } from "react";
import {
  Outlet,
  useLocation,
  UIMatch,
  useMatches,
  useNavigate,
} from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import { useAuth0 } from "@auth0/auth0-react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Toaster } from "react-hot-toast";
import { faArrowLeft, faSignOut } from "@fortawesome/free-solid-svg-icons";

import { dashboardMenuItems } from "../constants/textContent";
import { useUserStore } from "../stores/userStore";
import { IMAGE_PLACEHOLDER } from "../constants/constants";
import DashboardMenu from "../components/layout/DashboardMenu";
import { startDashboardTour } from "../utils/tutorial/dashboardTour";
import AnalyticsTracker from "../components/common/GATracker";
import { HelmetProvider } from "react-helmet-async";
import SEO from "../components/common/SEO";

interface HandleType {
  seo?: {
    title: string;
    description: string;
    image?: string;
  };
}

const DashboardLayout: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { userData, isNewUser, setIsNewUser, token, setToken } = useUserStore();
  const { getAccessTokenSilently, logout } = useAuth0();
  const [loading, setLoading] = useState(true);

  //for make sure token not expired
  useEffect(() => {
    const verifyToken = async () => {
      if (!token) {
        setLoading(false);
        return;
      }

      try {
        const decoded: any = jwtDecode(token);
        const isTokenExpired = decoded.exp * 1000 < Date.now();

        if (isTokenExpired) {
          // Attempt silent token refresh
          const newToken = await getAccessTokenSilently();
          setToken(newToken);
        }
      } catch (error) {
        console.error("Token verification failed:", error);
        logout({ logoutParams: { returnTo: "https://www.fundmywish.ca/" } });
      } finally {
        setLoading(false);
      }
    };
    verifyToken();
  }, [token, getAccessTokenSilently, logout, setToken]);
  //for tour
  const menuRefs = useRef<Record<string, HTMLButtonElement | null>>({});

  useEffect(() => {
    if (isNewUser && menuRefs.current) {
      startDashboardTour({
        sidebarRef: menuRefs.current, // Pass sidebar refs
        onComplete: () => setIsNewUser(false),
      });
    }
  }, [isNewUser]);

  //for seo
  const matches = useMatches() as Array<UIMatch<unknown, HandleType>>;
  const currentRoute = matches.find((match) => !!match.handle?.seo);
  const seoData = currentRoute?.handle?.seo;

  return (
    <HelmetProvider>
      <div className="flex h-screen">
        {seoData && <SEO {...seoData} />}
        {/* Sidebar */}
        <aside className="hidden md:block lg:w-64 md:w-40 p-4 bg-secondary text-primary min-h-screen">
          <div className="flex flex-col h-full w-full justify-between">
            <div className="w-full justify-start">
              <button
                onClick={() => (window.location.href = "https://www.fundmywish.ca")}
                className="btn-ghost text-primary mb-6 p-3 hover:underline cursor-pointer"
              >
                <FontAwesomeIcon icon={faArrowLeft} /> To Home Page
              </button>
            </div>

            <div className="flex flex-col w-full items-center gap-2 p-5 mb-10">
              <div className="w-10 h-10 rounded-full overflow-hidden">
                <img
                  src={userData?.picture ?? IMAGE_PLACEHOLDER}
                  alt="User Avatar"
                  className="w-full h-full object-cover"
                />
              </div>

              <div className="text-center font-semibold">{userData?.name}</div>
            </div>

            <nav className="flex-1 px-4 space-y-4 ">
              {dashboardMenuItems.map((item) => (
                <button
                  key={item.name}
                  ref={(el) => {
                    menuRefs.current[item.name.toLowerCase()] = el;
                  }}
                  onClick={() => navigate(item.href)}
                  className={`w-full flex items-center p-2 rounded-md hover:seccondary ${
                    location.pathname === item.href ? "bg-base-200" : ""
                  }`}
                >
                  <FontAwesomeIcon icon={item.icon} className="mr-2" />
                  <p className="font-semibold">{item.name}</p>
                </button>
              ))}
            </nav>
            <div
              onClick={() => {
                logout({ logoutParams: { returnTo: "https://www.fundmywish.ca/" } });
              }}
              className="btn btn-link cursor-pointer mt-2 mb-2 text-gray-600 items-end"
            >
              LogOut
              <FontAwesomeIcon icon={faSignOut} className="mr-2" />
            </div>
          </div>
        </aside>

        {/* Main content area */}
        <main className="flex flex-col flex-1 bg-gray-100 p-4 min-h-screen overflow-y-auto">
          {/* Hidden dashboard menu for mobile */}
          <div className="dropdown dropdown-bottom md:hidden mb-4">
            <DashboardMenu />
          </div>

          {/* Main Content Area */}
          <div className="flex justify-center items-center">
            {loading && (
              <span className="loading loading-spinner loading-md"></span>
            )}
            <Toaster />
            <AnalyticsTracker />
            <Outlet />
          </div>
        </main>
      </div>
    </HelmetProvider>
  );
};

export default DashboardLayout;
