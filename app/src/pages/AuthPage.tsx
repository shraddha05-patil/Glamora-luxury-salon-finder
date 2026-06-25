import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Eye, EyeOff, Mail, Phone, User, Lock } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";
import { useToast } from "@/hooks/useToast";

export default function AuthPage() {
  const [mode, setMode] = useState<"login" | "register">("login");
  const [showPassword, setShowPassword] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [remember, setRemember] = useState(false);
  const [agree, setAgree] = useState(false);
  const [nameError, setNameError] = useState("");
  const [phoneError, setPhoneError] = useState("");
  const [passwordError, setPasswordError] = useState("");

  const { login, register } = useAuth();
  const { showToast } = useToast();
  const navigate = useNavigate();

  useEffect(() => {
    const hdr = document.querySelector("header");
    if (hdr) hdr.style.display = "none";
    return () => {
      if (hdr) hdr.style.display = "";
    };
  }, []);

  const validateName = (value: string) => {
    const valid = /^[A-Za-z\s]+$/.test(value.trim());
    if (!value.trim()) {
      setNameError("Full name is required.");
      return false;
    }
    if (!valid) {
      setNameError("Full name can contain letters only.");
      return false;
    }
    setNameError("");
    return true;
  };

  const validatePhone = (value: string) => {
    const digits = value.replace(/\D/g, "");
    if (!digits) {
      setPhoneError("Phone number is required.");
      return false;
    }
    if (digits.length !== 10) {
      setPhoneError("Phone number must be exactly 10 digits.");
      return false;
    }
    setPhoneError("");
    return true;
  };

  const validatePassword = (value: string) => {
    if (!value) {
      setPasswordError("Password is required.");
      return false;
    }
    if (value.length < 8) {
      setPasswordError("Password must be at least 8 characters long.");
      return false;
    }
    if (!/[A-Z]/.test(value)) {
      setPasswordError("Password must include at least one uppercase letter.");
      return false;
    }
    if (!/[0-9]/.test(value)) {
      setPasswordError("Password must include at least one number.");
      return false;
    }
    if (!/[!@#$%^&*(),.?":{}|<>]/.test(value)) {
      setPasswordError("Password must include at least one symbol.");
      return false;
    }
    setPasswordError("");
    return true;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (mode === "login") {
      const result = login(email, password);
      if (result === "success") {
        showToast("Welcome back!");
        navigate("/");
      } else if (result === "not_found") {
        showToast("Please register first to continue.", "error");
      } else {
        showToast("Email or password does not match. Please check and try again.", "error");
      }
    } else {
      const validName = validateName(name);
      const validPhone = validatePhone(phone);
      const validPassword = validatePassword(password);

      if (!agree) {
        showToast("Please agree to the terms", "error");
        return;
      }
      if (!validName || !validPhone || !validPassword) {
        showToast("Please correct the highlighted fields", "error");
        return;
      }
      const result = register(name, email, phone, password);
      if (result === "success") {
        showToast("Account created successfully. Please log in.");
        setMode("login");
        setEmail(email);
        setPassword(password);
        setName("");
        setPhone("");
        setAgree(false);
      } else if (result === "exists") {
        showToast("An account with this email already exists. Please log in.", "error");
        setMode("login");
        setEmail(email);
        setPassword("");
      } else {
        showToast("Please fill all fields", "error");
      }
    }
  };

  return (
    <main className="relative min-h-screen overflow-y-auto bg-[#f6efe8]">
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: "url(/assets/img-hero-salon.jpg)",
          backgroundPosition: "center",
        }}
      />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(255,255,255,0.3),transparent_40%),linear-gradient(135deg,rgba(43,43,43,0.78),rgba(43,43,43,0.48))]" />

      <div className="relative z-10 flex min-h-screen items-center justify-center px-3 py-2 sm:px-4 sm:py-3 lg:px-4 lg:py-3">
        <div className="mx-auto flex w-full max-w-[980px] flex-col overflow-hidden rounded-[20px] border border-white/20 bg-[#faf8f5] shadow-[0_25px_80px_rgba(0,0,0,0.25)] lg:min-h-[620px] lg:max-h-[720px] lg:flex-row">
          <div className="relative flex min-h-[200px] flex-1 overflow-hidden lg:min-h-[620px]">
            <div
              className="absolute inset-0 bg-cover bg-center"
              style={{ backgroundImage: "url(/assets/img-hero-salon.jpg)" }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/35 to-black/20" />
            <div className="relative flex flex-1 flex-col justify-end p-5 text-white sm:p-7 lg:p-8">
              <div className="max-w-md">
                <p className="text-sm font-semibold uppercase tracking-[0.3em] text-gold/90">Glamora</p>
                <p className="mt-3 text-base italic leading-relaxed text-white/90 sm:text-lg">
                  “Where every appointment feels like a private ritual.”
                </p>
              </div>
            </div>
          </div>

          <div className="flex flex-1 flex-col justify-center bg-[#faf8f5] px-6 py-6 sm:px-7 sm:py-7 lg:px-8 lg:py-8">
            <div className="mx-auto w-full max-w-[460px]">
              <div className="mb-3 flex items-center gap-3 sm:mb-4">
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[#f2e8d8] font-display text-sm text-[#b68a2b]">G</div>
                <div>
                  <p className="font-display text-[1.25rem] leading-none text-[#2d2a26]">Glamora</p>
                  <p className="text-sm text-[#7e7a72]">Luxury salon experience</p>
                </div>
              </div>

              <div className="mb-3 sm:mb-3.5">
                <h2 className="font-serif text-[1.45rem] text-[#2f2924] sm:text-[1.6rem]">{mode === "login" ? "Welcome back" : "Create account"}</h2>
                <p className="mt-1 text-sm leading-5 text-[#756f63]">
                  {mode === "login"
                    ? "Sign in to manage your bookings, favourites, and salon visits."
                    : "Join Glamora for a seamless salon experience and premium bookings."}
                </p>
              </div>

              <div className="mb-3 flex border-b border-[#e4dccf]">
                <button
                  type="button"
                  onClick={() => setMode("login")}
                  className={`flex-1 pb-2 text-sm font-medium transition-colors relative ${
                    mode === "login" ? "text-[#2f2924]" : "text-[#8f887d] hover:text-[#2f2924]"
                  }`}
                >
                  Login
                  {mode === "login" && <span className="absolute bottom-0 left-0 right-0 h-0.5 rounded-full bg-gold" />}
                </button>

                <button
                  type="button"
                  onClick={() => setMode("register")}
                  className={`flex-1 pb-2 text-sm font-medium transition-colors relative ${
                    mode === "register" ? "text-[#2f2924]" : "text-[#8f887d] hover:text-[#2f2924]"
                  }`}
                >
                  Register
                  {mode === "register" && <span className="absolute bottom-0 left-0 right-0 h-0.5 rounded-full bg-gold" />}
                </button>
              </div>

              <form onSubmit={handleSubmit} className="space-y-2.5 sm:space-y-3">
                {mode === "register" && (
                  <div>
                    <label className="mb-1.5 block text-sm font-medium text-[#7a7268]">Full Name</label>
                    <div className="relative">
                      <User className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[#8f887d]" />
                      <input
                        type="text"
                        value={name}
                        onChange={(e) => {
                          setName(e.target.value);
                          if (nameError) validateName(e.target.value);
                        }}
                        placeholder="Your full name"
                        className="w-full rounded-[14px] border border-[#e3d9c8] bg-[#fcfaf7] py-2.5 pl-10 pr-4 text-sm text-[#2f2924] placeholder:text-[#9e958a] focus:border-gold focus:outline-none focus:ring-2 focus:ring-gold/15"
                      />
                    </div>
                    {nameError && <p className="mt-1 text-xs text-red-500">{nameError}</p>}
                  </div>
                )}

                <div>
                  <label className="mb-1.5 block text-sm font-medium text-[#7a7268]">Email</label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[#8f887d]" />
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="your@email.com"
                      className="w-full rounded-[14px] border border-[#e3d9c8] bg-[#fcfaf7] py-2 pl-10 pr-4 text-sm text-[#2f2924] placeholder:text-[#9e958a] focus:border-gold focus:outline-none focus:ring-2 focus:ring-gold/15"
                    />
                  </div>
                </div>

                {mode === "register" && (
                  <div>
                    <label className="mb-1.5 block text-sm font-medium text-[#7a7268]">Phone Number</label>
                    <div className="relative">
                      <Phone className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[#8f887d]" />
                      <input
                        type="tel"
                        value={phone}
                        onChange={(e) => {
                          const digitsOnly = e.target.value.replace(/\D/g, "").slice(0, 10);
                          setPhone(digitsOnly);
                          if (phoneError) validatePhone(digitsOnly);
                        }}
                        placeholder="9876543210"
                        className="w-full rounded-[14px] border border-[#e3d9c8] bg-[#fcfaf7] py-2.5 pl-10 pr-4 text-sm text-[#2f2924] placeholder:text-[#9e958a] focus:border-gold focus:outline-none focus:ring-2 focus:ring-gold/15"
                      />
                    </div>
                    {phoneError && <p className="mt-1 text-xs text-red-500">{phoneError}</p>}
                  </div>
                )}

                <div>
                  <label className="mb-2 block text-sm font-medium text-[#7a7268]">Password</label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[#8f887d]" />
                    <input
                      type={showPassword ? "text" : "password"}
                      value={password}
                      onChange={(e) => {
                        setPassword(e.target.value);
                        if (passwordError) validatePassword(e.target.value);
                      }}
                      placeholder="Enter your password"
                      className="w-full rounded-[14px] border border-[#e3d9c8] bg-[#fcfaf7] py-2.5 pl-10 pr-12 text-sm text-[#2f2924] placeholder:text-[#9e958a] focus:border-gold focus:outline-none focus:ring-2 focus:ring-gold/15"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-[#8f887d] transition-colors hover:text-[#2f2924]"
                    >
                      {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                    </button>
                  </div>
                  {passwordError && <p className="mt-1 text-xs text-red-500">{passwordError}</p>}
                </div>

                {mode === "login" && (
                  <div className="flex items-center justify-between">
                    <label className="flex cursor-pointer items-center gap-2">
                      <input
                        type="checkbox"
                        checked={remember}
                        onChange={(e) => setRemember(e.target.checked)}
                        className="h-4 w-4 rounded border-[#e3d9c8] text-gold focus:ring-gold"
                      />
                      <span className="text-sm text-[#7a7268]">Remember me</span>
                    </label>
                    <button type="button" className="text-sm text-gold hover:underline">Forgot password?</button>
                  </div>
                )}

                {mode === "register" && (
                  <label className="flex items-start gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={agree}
                      onChange={(e) => setAgree(e.target.checked)}
                      className="mt-0.5 h-4 w-4 rounded border-[#e3d9c8] text-gold focus:ring-gold"
                    />
                    <span className="text-sm text-[#7a7268]">
                      I agree to the <button type="button" className="text-gold hover:underline">Terms of Service</button> and <button type="button" className="text-gold hover:underline">Privacy Policy</button>
                    </span>
                  </label>
                )}

                <button type="submit" className="w-full rounded-full bg-gold py-3 text-sm font-semibold text-white transition-all hover:bg-gold/90 hover:scale-[1.01]">
                  {mode === "login" ? "Login" : "Create Account"}
                </button>
              </form>

              {mode === "login" && (
                <>
                  <div className="my-4 flex items-center gap-4">
                    <div className="h-px flex-1 bg-[#e4dccf]" />
                    <span className="text-[10px] uppercase tracking-[0.25em] text-[#8f887d]">or continue with</span>
                    <div className="h-px flex-1 bg-[#e4dccf]" />
                  </div>

                  <div className="grid grid-cols-2 gap-2.5">
                    <button
                      type="button"
                      onClick={() => {
                        showToast("Google sign-in coming soon");
                        navigate("/");
                      }}
                      className="flex items-center justify-center gap-2 rounded-[14px] border border-[#e3d9c8] bg-white py-2.5 text-sm text-[#2f2924] transition-colors hover:bg-[#f6efe8]"
                    >
                      <svg className="h-4 w-4" viewBox="0 0 24 24"><path fill="currentColor" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 01-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z" /><path fill="currentColor" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" /><path fill="currentColor" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" /><path fill="currentColor" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" /></svg>
                      Google
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        showToast("Phone sign-in coming soon");
                        navigate("/");
                      }}
                      className="flex items-center justify-center gap-2 rounded-[14px] border border-[#e3d9c8] bg-white py-2.5 text-sm text-[#2f2924] transition-colors hover:bg-[#f6efe8]"
                    >
                      <Phone className="h-4 w-4" />
                      Phone
                    </button>
                  </div>
                </>
              )}

              <div className="mt-3 text-center">
                <button
                  type="button"
                  onClick={() => navigate("/")}
                  className="text-sm font-medium text-gold transition-colors hover:text-gold/80 hover:underline"
                >
                  Go to Home Page
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
