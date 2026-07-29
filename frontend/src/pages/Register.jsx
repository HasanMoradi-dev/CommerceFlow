import { useState, useContext } from "react";
import { useNavigate, Link } from "react-router-dom";
import { AuthContext } from "../context/AuthContext.jsx";
import { Eye, EyeOff } from "lucide-react";

function Register() {
  const { register, loading, error } = useContext(AuthContext);
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [localError, setLocalError] = useState("");
  const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();
    setLocalError("");

    if (password !== confirmPassword) {
      setLocalError("Passwords don't match.");
      return;
    }

    const success = await register({username, password,confirmPassword,email});

    if (success) {
      navigate("/products");
    }
  }

  return (
    <div className="min-h-screen bg-gray-900 flex items-center justify-center px-6">
      <div className="w-full max-w-sm">
        <div className="text-center mb-10">
          <p className="text-amber-700 font-bold tracking-[0.3em] text-xs uppercase mb-2">
            Join us
          </p>
          <h1 className="text-white text-3xl font-extrabold">Create account</h1>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col gap-8">
          <FloatingInput label="Username" value={username} onChange={(e) => setUsername(e.target.value)} />
           <FloatingInput label="Email" value={email} onChange={(e) => setEmail(e.target.value)} />


          <div className="relative">
            <FloatingInput
              label="Password"
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute left-0 top-6 text-gray-500 hover:text-amber-700 transition"
              tabIndex={-1}
            >
              {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          </div>

          <FloatingInput
            label="Confirm password"
            type={showPassword ? "text" : "password"}
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />

          <button
            type="submit"
            disabled={loading}
            className="bg-amber-700 text-black font-bold py-3 rounded-full
            hover:bg-amber-600 transition disabled:opacity-50 disabled:cursor-not-allowed
            mt-2"
          >
            {loading ? "Creating account…" : "Register"}
          </button>

          {(localError || error) && (
            <p className="text-red-500 text-sm text-center -mt-4">{localError || error}</p>
          )}

          <p className="text-gray-400 text-sm text-center -mt-2">
            Already have an account?{" "}
            <Link to="/login" className="text-amber-700 hover:underline">
              Log in
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
}

function FloatingInput({ label, value, onChange, type = "text" }) {
  const [focused, setFocused] = useState(false);
  const hasValue = value.length > 0;

  return (
    <div className="relative">
      <input
        type={type}
        value={value}
        onChange={onChange}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        placeholder={label}
        className="w-full bg-transparent text-white placeholder-transparent
        focus:outline-none pb-2 pt-6 pl-6"
      />
      <span
        className={`absolute left-6 top-0 text-xs uppercase tracking-widest transition-all
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

export default Register;