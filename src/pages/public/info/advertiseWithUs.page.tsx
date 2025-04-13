import React, { useState } from "react";
import toast from "react-hot-toast";
import { useMutation } from "@tanstack/react-query";
import { sendContactUsEmail } from "../../../services/sendEmail.service";

const AdvertiseWithUsPage: React.FC = () => {
  const [formData, setFormData] = useState({
    businessName: "",
    contactName: "",
    email: "",
    website: "",
    collaborationType: "",
    message: "",
  });
  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // useMutation Hook
  //sendContactUsEmail = async (email: string, subject: string, message: string )
  const sendInquiryMutation = useMutation({
    mutationFn: ({
      email,
      subject,
      message,
    }: {
      email: string;
      subject: string;
      message: string;
    }) => sendContactUsEmail(email, subject, message),
    onSuccess: () => {
      toast.success("Inquiry sent successfully! We will contact you soon!");
      setFormData({
        businessName: "",
        contactName: "",
        email: "",
        website: "",
        collaborationType: "",
        message: "",
      });
    },
    onError: (error: any) => {
      toast.error("Failed to send inquiry. Please try again.");
      console.error("Send Inquiry Error:", error);
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Generate subject and message
    const email = formData.email;
    const subject = `Collaboration Inquiry from ${
      formData.businessName || "Unknown Business"
    }`;
    const message = `
    Business Name: ${formData.businessName || "N/A"}
    Contact Name: ${formData.contactName || "N/A"}
    Email: ${formData.email}
    Website/Social: ${formData.website || "N/A"}
    Collaboration Type: ${formData.collaborationType || "N/A"}
    Message: ${formData.message || "No additional message provided."}
  `;

    sendInquiryMutation.mutate({ email, subject, message });
  };

  return (
    <div className="w-full bg-base-100 py-12 px-6 md:px-12">
      {/* Page Header */}
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold text-primary">Advertise with Us</h1>
        <p className="text-lg text-gray-600 mt-2">
          Partner with FundmyWish and reach an engaged audience!
        </p>
      </div>

      {/* Why Advertise Section */}
      <div className="bg-white shadow-md rounded-lg p-6 mb-8">
        <h2 className="text-2xl font-semibold text-primary mb-4">
          Why Advertise with FundmyWish?
        </h2>
        <ul className="space-y-3 text-gray-700">
          <li>
            ✅ <strong>Targeted Audience</strong> – Connect with active
            gift-givers and fundraisers.
          </li>
          <li>
            ✅ <strong>Authentic Engagement</strong> – Align with a platform
            that values real connections.
          </li>
          <li>
            ✅ <strong>Flexible Partnership Options</strong> – Sponsored posts,
            giveaways, and more!
          </li>
        </ul>
      </div>

      {/* Collaboration Opportunities */}
      <div className="bg-white shadow-md rounded-lg p-6 mb-8">
        <h2 className="text-2xl font-semibold text-primary mb-4">
          Collaboration Opportunities
        </h2>
        <ul className="space-y-3 text-gray-700">
          <li>
            📌 <strong>Sponsored Posts</strong> – Get featured in our content.
          </li>
          <li>
            🎁 <strong>Giveaways & Promotions</strong> – Increase brand
            awareness.
          </li>
          <li>
            🤝 <strong>Custom Partnerships</strong> – Let’s create something
            unique together!
          </li>
        </ul>
      </div>

      {/* Inquiry Form Section */}
      <div className="bg-base-200 shadow-md rounded-lg p-6">
        <h2 className="text-2xl font-semibold text-primary mb-4">
          Collaboration Inquiry Form
        </h2>
        <p className="text-gray-600 mb-6">
          Interested in working with us? Fill out the form below, and our team
          will get back to you!
        </p>
        <form
          className="bg-white shadow-md rounded-lg p-6 space-y-4"
          onSubmit={handleSubmit}
        >
          {/* Business Name */}
          <div>
            <label className="block text-gray-700 font-semibold">
              Business Name
            </label>
            <input
              type="text"
              name="businessName"
              value={formData.businessName}
              onChange={handleChange}
              className="input input-bordered w-full"
              required
            />
          </div>

          {/* Contact Name */}
          <div>
            <label className="block text-gray-700 font-semibold">
              Contact Name
            </label>
            <input
              type="text"
              name="contactName"
              value={formData.contactName}
              onChange={handleChange}
              className="input input-bordered w-full"
              required
            />
          </div>

          {/* Email */}
          <div>
            <label className="block text-gray-700 font-semibold">
              Email Address
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="input input-bordered w-full"
              required
            />
          </div>

          {/* Website/Social Media Links */}
          <div>
            <label className="block text-gray-700 font-semibold">
              Website/Social Media Links
            </label>
            <input
              type="url"
              name="website"
              value={formData.website}
              onChange={handleChange}
              className="input input-bordered w-full"
            />
          </div>

          {/* Type of Collaboration Interested In */}
          <div>
            <label className="block text-gray-700 font-semibold">
              Type of Collaboration
            </label>
            <select
              name="collaborationType"
              value={formData.collaborationType}
              onChange={handleChange}
              className="select select-bordered w-full"
              required
            >
              <option value="">Select an option</option>
              <option value="Sponsored Post">Sponsored Post</option>
              <option value="Giveaways & Promotions">
                Giveaways & Promotions
              </option>
              <option value="Custom Partnership">Custom Partnership</option>
            </select>
          </div>

          {/* Message */}
          <div>
            <label className="block text-gray-700 font-semibold">
              Message/Proposal
            </label>
            <textarea
              name="message"
              value={formData.message}
              onChange={handleChange}
              className="textarea textarea-bordered w-full"
              rows={4}
              required
            />
          </div>

          {/* Submit Button */}
          <div className="text-center">
            <button type="submit" className="btn btn-primary w-full">
              Submit Inquiry
            </button>
          </div>
        </form>
      </div>

      {/* Contact Info */}
      <div className="text-center mt-8 text-gray-700">
        📩 Have questions? Email us at{" "}
        <a
          href="mailto:yourcontact@email.com"
          className="text-blue-500 underline"
        >
          support@fundmywish.ca
        </a>
      </div>
    </div>
  );
};

export default AdvertiseWithUsPage;
