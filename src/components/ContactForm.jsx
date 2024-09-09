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

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(form);
  };

  const laterHandleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        header: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form),
      });

      // reset the form:
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
    } catch (error) {
      setError("Something went wrong. Please try again later.");
    } finally {
        setIsSubmitting(false)
    }
  };

  return (
    <div className="">
      <h2>Contact us</h2>
      <form
        onSubmit={laterHandleSubmit}
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
        //   onClick={handleSubmit}
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
