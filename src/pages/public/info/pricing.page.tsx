const PricingPage = () => {
  return (
    <div className=" text-gray-800 min-h-screen py-16 px-6 lg:px-20">
      <header className="text-center mb-16">
        <h1 className="text-4xl font-bold mb-4">Our Pricing</h1>
        <p className="text-lg text-gray-600">
          Simple, transparent pricing with no hidden fees.
        </p>
      </header>

      <section className="space-y-16">
        <div className="bg-base-100 shadow-md rounded-lg p-8">
          <h2 className="text-2xl font-semibold mb-4">
            Payment Processing Fees
          </h2>
          <p className="text-gray-700 leading-relaxed">
            Payment processing fees are automatically deducted from each
            donation. These fees are standard across all major payment
            providers.
          </p>
          <div className="text-3xl font-bold text-primary mt-4">
            2.9% + $0.30 per transaction
          </div>
        </div>

        <div className="bg-base-100 shadow-md rounded-lg p-8 border border-gray-200">
          <h2 className="text-3xl font-bold text-primary mb-6">
            Platform Fees
          </h2>

          <p className="text-gray-700 leading-relaxed text-lg">
            We charge a small platform fee to keep our service running and
            maintain top-notch features. This fee covers processing payments and
            providing support.
          </p>

          {/* Donation Platform Fee */}
          <div className="bg-gray-100 p-4 rounded-lg mt-6">
            <h3 className="text-2xl font-semibold text-primary">
              For Donations 1.6% per donation 
            </h3>
          </div>

          {/* Withdrawal Fees Section */}
          <div className="mt-6 space-y-4">
            {/* Early Withdrawal */}
            <div className="bg-yellow-50 p-4 border-l-4 border-yellow-400 rounded-lg">
              <h3 className="text-xl font-semibold text-yellow-700">
                Early Withdrawal
              </h3>
              <p className="text-gray-700">
                You can withdraw funds from your account at any time, even if
                your wishlist isn't fully funded. A{" "}
                <span className="font-bold text-yellow-700">1.5%</span>{" "}
               platform fee will apply for each withdrawal.
              </p>
            </div>

            {/* Fully Funded Withdrawal */}
            <div className="bg-green-50 p-4 border-l-4 border-green-500 rounded-lg">
              <h3 className="text-xl font-semibold text-green-700">
                Fully Funded Withdrawal
              </h3>
              <p className="text-gray-700">
                If your wishlist reaches its goal (e.g.,{" "}
                <span className="font-bold"> $799/$799 iPad</span>), you can
                withdraw the full amount without any platform fees.
              </p>
            </div>
          </div>
        </div>


        <div className="bg-base-100 shadow-md rounded-lg p-8">
          <h2 className="text-2xl font-semibold mb-4">What You Get</h2>
          <ul className="list-disc pl-6 space-y-2 text-gray-700">
            <li>Secure payment processing</li>
            <li>Personalized fundraising pages</li>
            <li>Customer support and platform maintenance</li>
            <li>Easy fund transfer to your bank</li>
          </ul>
        </div>
      </section>
    </div>
  );
};

export default PricingPage;
