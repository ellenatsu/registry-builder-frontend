// src/components/ContactForm.tsx
import React, { useState } from "react";
import { textContent } from "../../constants/textContent";
import { useMutation } from "@tanstack/react-query";
import { sendContactUsEmail } from "../../services/sendEmail.service";
import toast from "react-hot-toast";
import { handleError } from "../../utils/errorUtils";

const ContactForm: React.FC = () => {
  const [email, setEmail] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");

  const sendEmailMutation = useMutation({
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
      //invalide the query for list with all items.
      toast.success("Email sent successfully! We will contact you soon!");
      setEmail("");
      setSubject("");
      setMessage("");
    },
    onError: (error: any) => {
      handleError("Send Email", error);
    },
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const payload = { email, subject, message };
    sendEmailMutation.mutate(payload);
  };

  return (
    <div className="">
      <div className="container w-full p-6">
        <h2 className="text-3xl font-bold text-center mb-4">Contact Us</h2>
        <p className="text-center mb-6">{textContent.contact.description}</p>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="email"
            placeholder={textContent.contact.emailPlaceholder}
            className="input input-bordered w-full"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="text"
            placeholder={textContent.contact.subjectPlaceholder}
            className="input input-bordered w-full"
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
            required
          />
          <textarea
            placeholder={textContent.contact.messagePlaceholder}
            className="textarea textarea-bordered w-full"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            required
          />
          <button type="submit" className="btn btn-primary w-full">
            {textContent.contact.submitButton}
          </button>
        </form>
      </div>
    </div>
  );
};

export default ContactForm;
