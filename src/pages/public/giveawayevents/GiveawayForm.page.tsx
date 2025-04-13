import React from "react";
import { OFFICIAL_INSTA_URL } from "../../../constants/constants";

const GiveawayPage: React.FC = () => {
    return (
        <div className="flex justify-center items-center min-h-screen bg-gray-50 p-6">
            <div className="bg-white p-6 rounded-lg shadow-lg max-w-3xl w-full text-center">
                {/* Giveaway Details */}
                <h1 className="text-4xl font-bold text-gray-800 mb-4">FundmyWish Lunar New Year Giveaway</h1>
                <p className="text-lg text-gray-600 mb-4">Win a <strong>20-inch Carry-On Luggage</strong></p>
                <p className="text-lg font-semibold text-gray-700">1 Winner | Open to Canada Residents Only</p>
            

                {/* How to Enter Section */}
                <div className=" p-4 rounded-md my-6 text-left">
                    <h2 className="text-xl font-bold text-black text-center">How to Enter</h2>
                    <ul className="list-decimal pl-6 text-gray-700 mt-2 space-y-2">
                        <li>Follow <a href={OFFICIAL_INSTA_URL} target="_blank" rel="noopener noreferrer" className="text-blue-600 font-bold">@fundmywish</a> on Instagram.</li>
                        <li>Like <a href="https://www.instagram.com/p/DFgsqw0yucm/" target="_blank" rel="noopener noreferrer" className="text-blue-600 ">giveaway post</a> + 3 other posts that you haven’t liked yet.</li>
                        <li>Tag 3 friends in the comments.</li>
                        <li>Fill out the registration form below.</li>
                    </ul>
                    <p className="text-red-600 mt-3 font-bold text-2xl">Make sure you complete all steps to qualify!</p>
                </div>

                {/* Terms & Conditions Section */}
                <div className=" p-4 rounded-md text-left">
                    <h2 className="text-xl font-bold text-black text-center">Giveaway Terms & Conditions</h2>
                    <ul className="list-disc pl-6 text-gray-700 mt-2 space-y-2">
                        <li>Open to <strong>Canada residents only</strong>.</li>
                        <li>The winner will receive a <strong>DM notification</strong> and must reply within <strong>24 hours</strong> (no extensions).</li>
                        <li><strong>We will NEVER ask for credit card information</strong> or contact you from another account.</li>
                        <li>Once shipped, we are <strong>not responsible for any product damage</strong>.</li>
                        <li><strong>FundMyWish reserves the right</strong> to modify event details at any time.</li>
                    </ul>
                </div>

                {/* Google Form Embed */}
                <div className="mt-6">
                    <iframe
                        src="https://docs.google.com/forms/d/e/1FAIpQLSfyasEg-V4meJOdNN4K53wcyNy4h7cHK5Cwn_PAXgYqXCXVYQ/viewform?usp=header"
                        width="100%"
                        height="800"
                        frameBorder="0"
                        marginHeight={0}
                        marginWidth={0}
                        className="rounded-lg border border-gray-300"
                    >
                        Loading…
                    </iframe>
                </div>
            </div>
        </div>
    );
};

export default GiveawayPage;

