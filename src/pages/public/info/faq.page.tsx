import React from "react";
import faqData from "../../../data/json/faq.json"; // Adjust the path based on your project structure

const FAQPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-base-100 py-10 px-4">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-4xl font-bold text-center mb-8">Frequently Asked Questions</h1>

        {faqData.map((category) => (
          <div key={category.category} className="mb-12">
            <h2 className="text-2xl font-semibold mb-4">{category.category}</h2>
            {category.questions.map((faq, index) => (
              <div
                key={index}
                className="collapse collapse-arrow border border-base-300 bg-base-200 rounded-box mb-4"
              >
                <input type="checkbox" />
                <div className="collapse-title text-lg font-medium">{faq.question}</div>
                <div className="collapse-content">
                  <p>{faq.answer}</p>
                </div>
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

export default FAQPage;
