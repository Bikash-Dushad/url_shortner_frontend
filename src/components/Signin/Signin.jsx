import { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { postData } from "../../api/apiService";
import { AuthContext } from "../../context/Authcontext";
import "./Signin.css";

const INITIAL_FORM = {
  email: "",
  password: "",
};

const Signin = () => {
  const navigate = useNavigate();
  const { setToken } = useContext(AuthContext);

  const [form, setForm] = useState(INITIAL_FORM);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [showPw, setShowPw] = useState(false);

  const handleChange = (e) => {
    setError("");
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const validate = () => {
    if (!form.email.trim()) return "Email is required";
    if (!form.password.trim()) return "Password is required";
    return null;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    const validationError = validate();
    if (validationError) return setError(validationError);

    try {
      setLoading(true);
      const shortUrls = JSON.parse(localStorage.getItem("shortUrls")) || [];
      const payload = {
        ...form,
        shortUrls,
      };
      const response = await postData("/signin", payload);

      if (response?.responseCode === 200) {
        localStorage.setItem("Urlshortnertoken", response.data);
        setToken(response.data);
        localStorage.removeItem("shortUrls");
        navigate("/");
      } else {
        setError(response?.error || "Signin failed");
      }
    } catch (err) {
      setError(err?.error || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="si-page">
      <div className="si-card">
        {/* Brand */}
        <div className="si-brand">
          <Link to="/" className="si-brand__logo">
            Short<span>URL</span>
          </Link>
        </div>

        <h1 className="si-title">Welcome back</h1>
        <p className="si-subtitle">Login to continue</p>

        <form onSubmit={handleSubmit} className="si-form">
          {/* Email */}
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={form.email}
            onChange={handleChange}
            className="si-input"
          />

          {/* Password */}
          <div className="si-password">
            <input
              type={showPw ? "text" : "password"}
              name="password"
              placeholder="Password"
              value={form.password}
              onChange={handleChange}
              className="si-input"
            />
            <button
              type="button"
              onClick={() => setShowPw(!showPw)}
              className="si-toggle"
            >
              {showPw ? "Hide" : "Show"}
            </button>
          </div>

          {error && <p className="si-error">{error}</p>}

          <button type="submit" disabled={loading} className="si-btn">
            {loading ? "Signing in..." : "Sign In"}
          </button>
        </form>

        <p className="si-footer">
          Don't have an account? <Link to="/signup">Signup</Link>
        </p>
      </div>
    </div>
  );
};

export default Signin;
