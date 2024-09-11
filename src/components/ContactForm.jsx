import { useState } from "react";
import { InputField } from "./InputFields";

export default function ContactForm() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [responseMessage, setResponseMessage] = useState("");
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError("");
    setResponseMessage("");

    try {
      const res = await fetch("http://localhost:5000/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form),
      });

      if (res.ok) {
        setResponseMessage("Your message has been sent successfully!");
        setForm({
          name: "",
          email: "",
          subject: "",
          message: "",
        });
      } else {
        const data = await res.json();
        setError(data.error || "Something went wrong.");
      }
    } catch (err) {
      setError("Something went wrong. Please try again later.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="w-[372px] flex flex-col justify-center mx-auto mt-10 text-white p-6 bg-slate-800 bg-opacity-90 rounded-md shadow-md">
      {responseMessage && (
        <div className="p-3 mb-4 text-green-800 bg-green-100 rounded">
{responseMessage}
        </div>
      )}
   {error && (
     <div className="p-3 mb-4 text-red-800 bg-red-100 rounded">{error}</div>
   )}

      <h2>Contact us</h2>
      <form
        onSubmit={handleSubmit}
      >
        <InputField
          type="text"
          name="name"
          placeholder="ditt navn"
          value={form.name}
          onChange={handleChange}
        >
          Navn
        </InputField>

        <InputField
          type="email"
          name="email"
          placeholder="din epost"
          value={form.email}
          onChange={handleChange}
        >
          Email
        </InputField>

        <InputField
          type="text"
          name="subject"
          placeholder="f.eks medlemskap"
          value={form.subject}
          onChange={handleChange}
        >
          Subject
        </InputField>

        <InputField
          type="textarea"
          name="message"
          placeholder="ditt melding"
          value={form.message}
          onChange={handleChange}
        >
          Melding
        </InputField>

        <button
            type="submit"
          disabled={isSubmitting}
          className="w-full p-2 text-white bg-slate-500 hover:bg-red-500"
        >
          {isSubmitting ? "Sending..." : "Send Message"}
        </button>
      </form>
   
    </div>
  );
}
