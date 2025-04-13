import React, { useEffect } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import * as Sentry from "@sentry/react";

import RootLayout from "./layouts/root.layout";
import DashboardLayout from "./layouts/dashboard.layout";
import ErrorPage from "./pages/error.page";

import WelcomePage from "./pages/public/info/welcome.page";
import TutorialPage from "./pages/public/info/tutorial.page";
import PricingPage from "./pages/public/info/pricing.page";
import ProfilePage from "./pages/dashboard/profile.page";
import DashboardHomePage from "./pages/dashboard/home.page";
import GiftListsPage from "./pages/dashboard/giftlists.page";
import AuthPage from "./pages/auth/auth.page";
import TransactionsPage from "./pages/dashboard/transactions.page";
import WalletPage from "./pages/dashboard/wallet.page";
import ListEditorPage from "./pages/giftlist/listEditor.page";
import LoadingPage from "./pages/dashboard/loading.page";
import DonationInputPage from "./pages/payment/donationInput.page";
import CheckouPage from "./pages/payment/checkout.page";
import StripeResultPage from "./pages/payment/stripeResult.page";
import StripeElementsWrapper from "./components/common/StripeElementWrapper";
import ListDetailPage from "./pages/giftlist/listDetailDisplay.page";
import DonationSuccessPage from "./pages/payment/donationResult.page";
import ListTransactionsPage from "./pages/giftlist/listTransactions.page";
import PayPalCallback from "./pages/dashboard/paypalCallback.page";
import BrowseListCategoryPage from "./pages/public/browse/categories.page";
import BlogsPage from "./pages/public/info/blogs.page";
import BlogDetailPage from "./pages/public/info/blogDetail.page";
import EventDetailPage from "./pages/public/info/eventDetail.page";
import FAQPage from "./pages/public/info/faq.page";
import UserStoriesPage from "./pages/public/info/userStories.page";
import EventsPage from "./pages/public/info/events.page";
import MarkdownPage from "./pages/public/info/markdown.page";
import ThemeColorsDemo from "./pages/utils/asset.page";
import ListCreatedResultPage from "./pages/giftlist/listCreatedResult.page";
import AdvertiseWithUsPage from "./pages/public/info/advertiseWithUs.page";
import FallbackUI from "./components/common/FallbackUI";
import GiveawayPage from "./pages/public/giveawayevents/GiveawayForm.page";
import { initGA } from "./utils/googleAnalytics";
import CreateWishlistInSteps from "./pages/giftlist/createList.page";
import HomePage from "./pages/public/home.page";
import ContactUsPage from "./pages/public/info/contactUs.page";
import { withAuthenticationRequired } from "@auth0/auth0-react";

const App: React.FC = () => {
  const sentryCreateBrowserRouter =
    Sentry.wrapCreateBrowserRouterV6(createBrowserRouter);

  // Initialize Google Analytics only once
  useEffect(() => {
    initGA();
  }, []);

  //protected routes for Auth0
  const ProtectedRoute = ({ component, ...args }: {component:any}) => {
    const Component = withAuthenticationRequired(component, args);
    return <Component />;
  };


  const router = sentryCreateBrowserRouter([
    {
      path: "/",
      element: <RootLayout />,
      errorElement: <ErrorPage />,
      children: [
        {
          path: "",
          element: <HomePage />,
          handle: {
            seo: {
              title: "FundmyWish | Your Trusted Wishlist Gift Funding Platform",
              description:
                "Create & share your wishlist gift funding with ease. Perfect for weddings, baby showers, and birthdays.",
            },
          },
        },

        { path: "loading", element: <LoadingPage /> },
        { path: "paypal-callback", element: <PayPalCallback /> }, //for paypal auth
        {
          path: "browse-category",
          element: <BrowseListCategoryPage />,
          handle: {
            seo: {
              title: "Browse Public Wishlists - FundmyWish",
              description:
                "Discover different categories for your wishlist funding needs.",
            },
          },
        },
        {
          path: "auth",
          element: <AuthPage />,
          handle: {
            seo: {
              title: "Login / Register - FundmyWish",
              description:
                "Log in or sign up to manage your funding wishlists and donations.",
            },
          },
        },

        {
          path: "checkout",
          element: <CheckouPage />,
          handle: {
            seo: {
              title: "Secure Checkout - FundmyWish",
              description:
                "Complete your donation securely with multiple payment options.",
            },
          },
        },
        {
          path: "stripe/loading",
          element: (
            <StripeElementsWrapper>
              <StripeResultPage />
            </StripeElementsWrapper>
          ),
        },
        {
          path: "donation-success",
          element: <DonationSuccessPage />,
          handle: {
            seo: {
              title: "Thank You for Your Donation - FundmyWish",
              description:
                "Your donation has been successfully submitted. Thank you for your support!",
            },
          },
        },
      ],
    },
    {
      path: "/wishlist", //for wishlist
      element: <RootLayout />,
      errorElement: <ErrorPage />,
      children: [
        {
          path: "create",
          element: <ProtectedRoute component={CreateWishlistInSteps} />,
          handle: {
            seo: {
              title: "Create a Wishlist - FundmyWish",
              description:
                "Set up a new wishlist for your special occasion in minutes.",
            },
          },
        },
        { path: "create-success/:id", element: <ListCreatedResultPage /> },
        {
          path: "edit/:id",
          element: <ProtectedRoute component={ListEditorPage} />,
          handle: {
            seo: {
              title: "Edit your Wishlist - FundmyWish",
              description: "Edit your wishlist...",
            },
          },
        },
        { path: ":id", element: <ListDetailPage /> }, //seo dynamically generated
        {
          path: "make-donation",
          element: <DonationInputPage />,
          handle: {
            seo: {
              title: "Make a Donation - Support a Fundraiser | FundmyWish",
              description:
                "Donate securely to support a wishlist. Your contribution makes a difference!",
            },
          },
        },
      ],
    },
    // Informational Pages
    {
      path: "/",
      element: <RootLayout />, // A new layout to manage informational pages, optional
      errorElement: <ErrorPage />,
      children: [
        {
          path: "about-us",
          element: <WelcomePage />,
          handle: {
            seo: {
              title:
                "Welcome to FundmyWish - Start Your Wishlist Funding Journey",
              description:
                "Learn how FundmyWish helps you create a wishlist for weddings, baby showers, and special occasions.",
            },
          },
        },
        {
          path: "guide/tutorial",
          element: <TutorialPage />,
          handle: {
            seo: {
              title: "FundmyWish Tutorial - Step-by-Step Guide",
              description:
                "Follow our easy guide to create and share your wishlist in just a few minutes.",
            },
          },
        },
        {
          path: "guide/pricing",
          element: <PricingPage />,
          handle: {
            seo: {
              title: "FundmyWish Pricing - Transparent & Affordable Price",
              description:
                "Explore our simple pricing plans with no hidden fees. Start your wishlist today!",
            },
          },
        },
        {
          path: "offer",
          element: <EventsPage />,
          handle: {
            seo: {
              title: "Special Offers & Promotions - FundmyWish",
              description:
                "Check out the latest deals and offers on FundmyWish!",
            },
          },
        },
        { path: "offer/:slug", element: <EventDetailPage /> }, //seo dynamically generated
        {
          path: "faqs",
          element: <FAQPage />,
          handle: {
            seo: {
              title: "Frequently Asked Questions - FundmyWish",
              description:
                "Find answers to the most common questions about wishlist funding.",
            },
          },
        },
        {
          path: "contact-us",
          element: <ContactUsPage />,
          handle: {
            seo: {
              title: "Frequently Asked Questions - FundmyWish",
              description:
                "Find answers to the most common questions about wishlist funding.",
            },
          },
        },
        {
          path: "user-story",
          element: <UserStoriesPage />,
          handle: {
            seo: {
              title: "User Success Stories - FundmyWish",
              description:
                "Read real-life stories from users who have successfully raised funds using FundmyWish.",
            },
          },
        },
        {
          path: "blog",
          element: <BlogsPage />,
          handle: {
            seo: {
              title: "FundmyWish Blog - Tips & Inspiration",
              description:
                "Read helpful guides and success stories on wishlist funding.",
            },
          },
        },
        { path: "blog/:id", element: <BlogDetailPage /> },
        {
          path: "partner-with-us",
          element: <AdvertiseWithUsPage />,
          handle: {
            seo: {
              title: "Advertise with FundmyWish - Reach Your Ideal Audience",
              description:
                "Partner with FundmyWish to showcase your brand to engaged users looking for gifting and fundraising solutions.",
            },
          },
        },
        {
          path: "terms-of-service",
          element: <MarkdownPage filePath="/data/doc/term.md" />,
          handle: {
            seo: {
              title: "Terms of Service - FundmyWish",
              description:
                "Read our Terms of Service to understand how FundmyWish operates and protects your data.",
            },
          },
        },
        {
          path: "privacy-policy",
          element: <MarkdownPage filePath="/data/doc/privacy.md" />,
          handle: {
            seo: {
              title: "Privacy Policy - FundmyWish",
              description:
                "Learn how we handle user data and ensure privacy at FundmyWish.",
            },
          },
        },
      ],
    },
    //give away
    {
      path: "/giveaway",
      element: <RootLayout />,
      errorElement: <ErrorPage />,
      children: [{ path: "win-luggage", element: <GiveawayPage /> }],
    },

    //dashboard 
    {
      path: "/dashboard",
      element: (
          <ProtectedRoute component={DashboardLayout} />
      ),
      errorElement: <ErrorPage />,
      children: [
        {
          path: "",
          element: <DashboardHomePage />,
          handle: {
            seo: {
              title: "Dashboard - FundmyWish",
              description:
                "Manage your fundraising lists, track donations, and update your account.",
            },
          },
        },
        {
          path: "profile",
          element: <ProfilePage />,
          handle: {
            seo: {
              title: "Profile Settings - FundmyWish",
              description:
                "View and update your profile, payment settings, and personal details.",
            },
          },
        },
        {
          path: "wishlist",
          element: <GiftListsPage />,
          handle: {
            seo: {
              title: "Manage Wishlist - FundmyWish",
              description: "Check all your wishlist.",
            },
          },
        },
        {
          path: "transaction",
          element: <TransactionsPage />,
          handle: {
            seo: {
              title: "Transaction - Manage Transaction - FundmyWish",
              description: "Check all your transaction.",
            },
          },
        },
        { path: "transaction/:id", element: <ListTransactionsPage /> },
        {
          path: "wallet",
          element: <WalletPage />,
          handle: {
            seo: {
              title: "Wallet - Manage Funds - FundmyWish",
              description: "Track your funds and withdraw donations.",
            },
          },
        },
      ],
    },
    {
      path: "/utils",
      children: [
        { path: "assets", element: <ThemeColorsDemo /> },
      ],
    },
  ]);

  return (
    <Sentry.ErrorBoundary fallback={<FallbackUI />}>
      <div data-theme="okTheme1" className="min-h-screen font-sans">
        <RouterProvider router={router} />
      </div>
    </Sentry.ErrorBoundary>
  );
};

export default App;
