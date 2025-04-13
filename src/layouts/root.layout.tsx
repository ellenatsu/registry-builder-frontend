// src/layouts/RootLayout.tsx
import React, { useMemo } from "react";
import { Outlet, UIMatch, useMatches } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import Footer from "../components/layout/Footer";
import AnalyticsTracker from "../components/common/GATracker";
import { HelmetProvider } from "react-helmet-async";
import SEO from "../components/common/SEO";
import NewNav from "../components/layout/NewNav";

interface HandleType {
  seo?: {
    title: string;
    description: string;
    image?: string;
  };
}
const RootLayout: React.FC = () => {
  const matches = useMatches() as Array<UIMatch<unknown, HandleType>>;
  const currentRoute = matches.find((match) => !!match.handle?.seo);
  const seoData = currentRoute?.handle?.seo;
  const memoizedSEO = useMemo(() => {
    return seoData ? <SEO {...seoData} /> : null;
  }, [seoData]);
  
  return (
    <HelmetProvider>
    <div className="w-full flex flex-col min-h-screen overflow-hidden">
      {/* Navbar */}
      <header>
        <NewNav />
      </header>
      <Toaster
        toastOptions={{
          // Define default options
          className: "max-w-full",
        }}
      />
     
      <AnalyticsTracker />
      {/* Main Content */}
      <main className="flex-grow">
        {memoizedSEO}
        <Outlet />
      </main>

      {/* Footer Always at Bottom */}
      <Footer />
    </div>
    </HelmetProvider>
  );
};

export default RootLayout;
