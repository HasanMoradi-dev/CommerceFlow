import { useState } from "react";

function Contact() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [status, setStatus] = useState("idle"); // idle | sending | sent | error

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.message) return;

    setStatus("sending");
    try {
      // Replace Your API Call here
      await new Promise((resolve) => setTimeout(resolve, 1200));
      setStatus("sent");
      setForm({ name: "", email: "", message: "" });
    } catch {
      setStatus("error");
    }
  };

  return (
    <div className="relative min-h-screen bg-gray-900 overflow-hidden px-6 py-16">

      <span
        className="pointer-events-none select-none absolute -top-6 left-1/2 -translate-x-1/2
        text-[18vw] sm:text-[12vw] font-black text-white/3 tracking-tighter whitespace-nowrap"
      >
        SAY HELLO
      </span>

      <div className="relative max-w-5xl mx-auto grid md:grid-cols-2 gap-12 md:gap-0">

        <div className="md:pr-12 md:border-r border-gray-800 flex flex-col justify-between">
          <div>
            <p className="text-amber-700 font-bold tracking-[0.3em] text-xs uppercase mb-4">
              Contact
            </p>
            <h1 className="text-white text-4xl sm:text-5xl font-extrabold leading-tight mb-6">
              Let's talk
              <br />
              about your order.
            </h1>
            <p className="text-gray-400 max-w-sm">
                        Have a question about an order, product, or collaboration?
                        Fill out the form or send us a direct message — we usually respond in less than one business day.
            </p>
          </div>

          <div className="mt-12 space-y-4">
            <a
              href="mailto:support@yourstore.com"
              className="flex items-center gap-3 text-white hover:text-amber-700 transition group"
            >
              <span className="w-9 h-9 rounded-full border border-gray-700 flex items-center
              justify-center group-hover:border-amber-700 transition text-sm">
                ✉
              </span>
              support@yourstore.com
            </a>
            <a
              href="tel:+123456789"
              className="flex items-center gap-3 text-white hover:text-amber-700 transition group"
            >
              <span className="w-9 h-9 rounded-full border border-gray-700 flex items-center
              justify-center group-hover:border-amber-700 transition text-sm">
                ☎
              </span>
              012-3456-6789
            </a>
            <div className="flex items-center gap-3 text-gray-400">
              <span className="w-9 h-9 rounded-full border border-gray-700 flex items-center
              justify-center text-sm">
                ⚲
              </span>
              Earth
            </div>
          </div>
        </div>


        <form onSubmit={handleSubmit} className="md:pl-12 flex flex-col gap-8">
          <FloatingField
            label="Name"
            name="name"
            value={form.name}
            onChange={handleChange}
          />
          <FloatingField
            label="Email"
            name="email"
            type="email"
            value={form.email}
            onChange={handleChange}
          />
          <FloatingField
            label="Message"
            name="message"
            value={form.message}
            onChange={handleChange}
            textarea
          />

          <button
            type="submit"
            disabled={status === "sending"}
            className="self-start relative overflow-hidden bg-amber-700 text-black font-bold
            px-8 py-3 rounded-full hover:bg-amber-600 transition disabled:opacity-50
            disabled:cursor-not-allowed"
          >
            {status === "sending" ? "Sending..." : "Send Message"}
          </button>

          {status === "sent" && (
            <p className="text-green-500 text-sm">We got you message! Will respond soon.</p>
          )}
          {status === "error" && (
            <p className="text-red-500 text-sm">Something went wrong. Try again.</p>
          )}
        </form>
      </div>
    </div>
  );
}

function FloatingField({ label, name, value, onChange, type = "text", textarea = false }) {
  const [focused, setFocused] = useState(false);
  const hasValue = value.length > 0;

  const sharedClasses =
    "w-full bg-transparent text-white placeholder-transparent focus:outline-none pb-2 pt-6";

  return (
    <div className="relative">
      {textarea ? (
        <textarea
          name={name}
          rows={3}
          value={value}
          onChange={onChange}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          placeholder={label}
          className={sharedClasses + " resize-none"}
        />
      ) : (
        <input
          type={type}
          name={name}
          value={value}
          onChange={onChange}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          placeholder={label}
          className={sharedClasses}
        />
      )}

      <span
        className={`absolute right-0 top-0 text-xs uppercase tracking-widest transition-all
        ${focused || hasValue ? "text-amber-700 translate-y-0" : "text-gray-500 translate-y-4"}`}
      >
        {label}
      </span>

      <span
        className={`absolute bottom-0 left-0 h-px bg-amber-700 transition-all duration-300
        ${focused ? "w-full" : "w-8"}`}
      />
      <span className="absolute bottom-0 left-0 w-full h-px bg-gray-800" />
    </div>
  );
}

export default Contact;