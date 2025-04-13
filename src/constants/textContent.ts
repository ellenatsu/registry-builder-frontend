import {
  faCreditCard,
  faGift,
  faHome,
  faUser,
  faWallet,
} from "@fortawesome/free-solid-svg-icons";
import { TabContentItem } from "../pages/public/home.page";
import collaborations from "../data/json/collaborations.json";

const textContent = {
  contact: {
    title: "Contact Us",
    description:
      "Have any questions or feedback? We will get back to you within 2 business days.",
    emailPlaceholder: "Your email",
    subjectPlaceholder: "Subject",
    messagePlaceholder: "Write your message...",
    submitButton: "Send Message",
  },
};

const dashboardMenuItems = [
  { name: "Home", href: "/dashboard", icon: faHome },
  { name: "Wishlist", href: "/dashboard/wishlist", icon: faGift },
  { name: "Transaction", href: "/dashboard/transaction", icon: faCreditCard },
  { name: "Wallet", href: "/dashboard/wallet", icon: faWallet },
  { name: "Profile", href: "/dashboard/profile", icon: faUser },
];

const homeTabs = [
  {
    id: "guide",
    title: "Guide",
    icon: "/images/tabs/howitworks.png",
  },
  {
    id: "offer",
    title: "Offers",
    icon: "/images/tabs/event.png",
  },
  {
    id: "learnMore",
    title: "Learn More",
    icon: "/images/tabs/learnmore.png",
  },
  {
    id: "support",
    title: "Support",
    icon: "/images/tabs/support.png",
  },
];

// Dynamically generate the "offer" section based on collaborations.json
const offerTabContent: TabContentItem[] = collaborations
  .slice(0, 3) // Use only the first 3 collaborations 
  .map((collab) => ({
    id: collab.id,
    title: collab.title,
    image: collab.logo, 
    link: `/offer/${collab.slug}`, 
  }));

const homeTabContent: Record<string, TabContentItem[]> = {
  guide: [
    {
      id: 1,
      title: "Welcome to FundmyWish",
      image: "/images/howitwork/welcome.png",
      link: "/about-us",
    },
    {
      id: 2,
      title: "Step-by-Step Guide",
      image: "/images/howitwork/guide.png",
      link: "/guide/tutorial",
    },
    {
      id: 3,
      title: "Features and Pricing",
      image: "/images/howitwork/feature.png",
      link: "/guide/pricing",
    },
  ],
  offer: offerTabContent,
  learnMore: [
    {
      id: 1,
      title: "Blog",
      image: "/images/learnmore/blog.png",
      link: "/blog",
    },

    {
      id: 2,
      title: "FAQs",
      image: "/images/learnmore/faqs.png",
      link: "/faqs",
    },
    // {  user story hide for now
    //   id: 2,
    //   title: "User Story",
    //   image: "/images/learnmore/user-story.png",
    //   link: "/info/learn-more/user-story",
    // },
  ],
};

export { textContent, dashboardMenuItems, homeTabs, homeTabContent };
