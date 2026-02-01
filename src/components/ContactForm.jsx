import { useState } from "react";

export default function ContactForm() {
  const [status, setStatus] = useState("idle");

  async function handleSubmit(e) {
    e.preventDefault();
    setStatus("loading");

    const form = e.target;
    const data = new FormData(form);

    const res = await fetch("https://formspree.io/f/mqebqyyy", {
      method: "POST",
      body: data,
      headers: {
        Accept: "application/json"
      }
    });

    if (res.ok) {
      form.reset();
      setStatus("success");
    } else {
      setStatus("error");
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <input
        name="name"
        required
        placeholder="Your name"
        className="w-full p-2 border rounded"
      />

      <input
        type="email"
        name="email"
        required
        placeholder="Your email"
        className="w-full p-2 border rounded"
      />

      <textarea
        name="message"
        required
        placeholder="Your message"
        className="w-full p-2 border rounded"
        rows="5"
      />

      <button
        disabled={status === "loading"}
        className="bg-black text-white px-4 py-2 rounded"
      >
        {status === "loading" ? "Sending..." : "Send Message"}
      </button>

      {status === "success" && (
        <p className="text-green-600">Message sent successfully!</p>
      )}

      {status === "error" && (
        <p className="text-red-600">Something went wrong. Try again.</p>
      )}
    </form>
  );
}
