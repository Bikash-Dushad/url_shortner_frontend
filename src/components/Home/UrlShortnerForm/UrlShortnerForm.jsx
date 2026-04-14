import { useState } from "react";
import { postData } from "../../../api/apiService";
import "./UrlShortnerForm.css";

const UrlShortnerForm = ({ isAuthenticated }) => {
  const [longUrl, setLongUrl] = useState("");
  const [customName, setCustomName] = useState("");
  const [shortUrl, setShortUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    setError("");
    setShortUrl("");

    if (!longUrl.trim()) {
      return setError("Long URL is required");
    }

    try {
      setLoading(true);
      const payload = {
        longUrl,
        customName: customName || "",
      };
      const response = await postData("/short-url", payload);
      console.log(response)
      if (response?.responseCode === 200) {
        setShortUrl(response.data.shortUrl);
        if (!isAuthenticated) {
          const existingUrls =
            JSON.parse(localStorage.getItem("shortUrls")) || [];
          const updatedUrls = [...existingUrls, response.data.shortUrl];
          localStorage.setItem("shortUrls", JSON.stringify(updatedUrls));
        }
        setLongUrl("");
        setCustomName("");
      }
    } catch (err) {
      console.log(err);
      setError(err.data);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="url-container">
      <h2 className="title">Shorten Your URL</h2>

      <form onSubmit={handleSubmit} className="url-form">
        <input
          type="text"
          placeholder="Enter long URL"
          value={longUrl}
          onChange={(e) => setLongUrl(e.target.value)}
          className="url-input"
        />

        <input
          type="text"
          placeholder="Custom short name (optional)"
          value={customName}
          onChange={(e) => setCustomName(e.target.value)}
          className="url-input"
        />

        {error && <p className="error-text">{error}</p>}

        <button type="submit" disabled={loading} className="submit-btn">
          {loading ? "Generating..." : "Shorten URL"}
        </button>
      </form>

      {shortUrl && (
        <div className="result-box">
          <p className="result-label">Short URL:</p>
          <a
            href={`${import.meta.env.VITE_REACT_APP_BASE_URL}/${shortUrl}`}
            target="_blank"
            rel="noreferrer"
            className="result-link"
          >
            {import.meta.env.VITE_REACT_APP_BASE_URL}/{shortUrl}
          </a>
        </div>
      )}
    </div>
  );
};

export default UrlShortnerForm;
