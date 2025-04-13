import { useNavigate } from "react-router-dom";


const Footer = () => {
  const navigate = useNavigate();
  return (
    <footer className="bg-primary ">
      {/* top section */}
      {/* <div className="container w-full flex justify-center m-10">
        <div className="w-[60%] text-center grid grid-cols-1 md:grid-cols-4 gap-0">
          <div>
            <h3 className="font-bold text-base mb-4">About Us</h3>
            <ul className="space-y-2 text-white">
              <li>
                <a href="/info/blog" className="link link-hover">
                  Blog
                </a>
              </li>
              <li>
                <a href="/info/advertise-with-us" className="link link-hover">
                  Advertise With Us
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-bold text-base mb-4">Tips & Resources</h3>
            <ul className="space-y-2 text-white">
              <li>
                <a href="/info/learn-more/faqs" className="link link-hover">
                  FAQs
                </a>
              </li>
              <li>
                <a href="/info/offer" className="link link-hover">
                  Offers
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-bold text-base mb-4">Follow Us</h3>
            <div className="flex space-x-4 justify-center text-base">
              <div
                onClick={() => {
                  window.open(OFFICIAL_FB_URL, "_blank");
                }}
                className="cursor-pointer"
              >
                <FontAwesomeIcon icon={faFacebookSquare} className="w-5 h-5" />
              </div>

              <div
                onClick={() => {
                  window.open(OFFICIAL_INSTA_URL, "_blank");
                }}
                className="cursor-pointer"
              >
                <FontAwesomeIcon icon={faInstagramSquare} className="w-5 h-5" />
              </div>
            </div>
          </div>

          <div>
            <h3 className="font-bold text-lg mb-4">Safe and Secure</h3>
            <ul className="space-y-3 flex flex-col items-center text-white">
              <li>
                <div
                  onClick={() => {
                    window.open("https://www.paypal.com/ca/home", "_blank");
                  }}
                  className="cursor-pointer"
                >
                  <img
                    src="/images/icons/paypal-icon.png"
                    className="w-auto h-6"
                  />
                </div>
              </li>
              <li>
                <div
                  onClick={() => {
                    window.open("https://stripe.com/en-ca", "_blank");
                  }}
                  className="cursor-pointer"
                >
                  <img
                    src="/images/icons/stripe-icon.svg"
                    className="w-auto h-6"
                  />
                </div>
              </li>
              <li>
                <div
                  onClick={() => {
                    window.open("https://auth0.com/", "_blank");
                  }}
                  className="cursor-pointer"
                >
                  <img
                    src="/images/icons/auth0-icon.png"
                    className="w-auto h-8"
                  />
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div> */}

      {/* Copyright Line */}
      <div className="flex flex-col bg-black text-white items-center text-sm p-6">
        <div className="md:text-2xl text-xl  font-custom font-bold p-2 mb-8">
          FundmyWish
        </div>
        <div>
          © 2024-2025 FundMyWish. Owned by OVKO Inc. All rights reserved.
        </div>
        <div>
          Use FundmyWish constitutes acceptance of
          <p
            className="btn btn-ghost btn-sm btn-link text-white"
            onClick={() => navigate("/terms-of-service")}
          >
            Term of Service
          </p>
          &
          <p
            className="btn btn-ghost btn-sm btn-link text-white"
            onClick={() => navigate("/privacy-policy")}
          >
            Privacy Policy
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
