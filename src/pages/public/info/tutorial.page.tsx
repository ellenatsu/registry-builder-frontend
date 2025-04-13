import FundRightNowLogo from "../../../components/common/FWlogo";

const TutorialPage = () => {
  return (
    <div className="text-gray-800 min-h-screen py-16 px-6 lg:px-20 bg-base-100">
      {/* Page Header */}
      <header className="text-center mb-12">
        <h1 className="text-4xl font-bold mb-4">Step-by-Step Guide</h1>
        <p className="text-lg text-gray-600">
          Start your journey with{" "}
          <span className="inline-block">
            <FundRightNowLogo className="text-xl" />
          </span>
          by following these simple steps.
        </p>
      </header>

      {/* Steps Section */}
      <section className="space-y-12">
        {/* Step 1 */}
        <div className="bg-white shadow-md rounded-lg p-8">
          <h2 className="text-2xl font-semibold mb-4">
            1. Sign Up and Create Your Profile
          </h2>
          <div>Start by creating an account with us—it’s quick and easy! Fill in your
          details, upload a profile picture, and let others know a little bit
          about you.</div>
        </div>

        {/* Step 2 */}
        <div className="bg-white shadow-md rounded-lg p-8">
          <h2 className="text-2xl font-semibold mb-4">
            2. Build Your Wishlist
          </h2>
          <div>Think about the items, goals, or support you need. Add them to your wishlist with a description and optional links for more details. You can also set goals for financial contributions if needed.
          </div>
        </div>

        {/* Step 3 */}
        <div className="bg-white shadow-md rounded-lg p-8">
          <h2 className="text-2xl font-semibold mb-4">3. Share Your Wishlist</h2>
          <div>Once your wishlist is ready, share it with your network! Use our built-in sharing tools to post on social media or send a personalized link to friends, family, or anyone who might want to contribute.
          </div>
        </div>

        {/* Step 4 */}
        <div className="bg-white shadow-md rounded-lg p-8">
          <h2 className="text-2xl font-semibold mb-4">4. Receive Support</h2>
          <div>As your network views your wishlist, they can choose how they want to support you—whether it’s donating, purchasing an item, or sharing your story to reach even more people.</div>
        </div>

        {/* Step 5 */}
        <div className="bg-white shadow-md rounded-lg p-8">
          <h2 className="text-2xl font-semibold mb-4">5. Make an Impact</h2>
          <div>Keep your supporters updated as you achieve your goals or receive items from your wishlist. Celebrate the joy of giving by sharing your gratitude and encouraging others to pay it forward.</div>
          </div>
      </section>
    </div>
  );
};

export default TutorialPage;
