import React from "react";
import { Helmet } from "react-helmet-async";
import { IMAGE_PREVIEW_DEFAULT } from "../../constants/constants";

interface SEOProps {
  title: string;
  description: string;
  keywords?: string;
  url?: string;
  image?: string;
}

const SEO: React.FC<SEOProps> = ({
  title,
  description,
  keywords = "fundraising, wishlist, gift registry, wedding registry, baby shower, crowdfunding",
  url = "https://www.fundmywish.ca",
  image = IMAGE_PREVIEW_DEFAULT,
}) => {
  return (
    <Helmet>
      {/* Basic SEO */}
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
      <meta name="author" content="FundmyWish" />

      {/* Open Graph (Facebook, LinkedIn) */}
      <meta property="og:type" content="website" />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={url} />
      <meta property="og:image" content={image} />

      {/* Twitter Card */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />

      {/* Canonical URL (SEO Best Practice) */}
      <link rel="canonical" href={url} />
    </Helmet>
  );
};

export default SEO;
