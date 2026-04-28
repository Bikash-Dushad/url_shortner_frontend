import React, { useState, useEffect, useContext } from "react";
import { fetchData } from "../../../api/apiService";
import "./Myurls.css";
import { AuthContext } from "../../../context/Authcontext";
const MyUrls = () => {
  const [urls, setUrls] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const { isAuthenticated } = useContext(AuthContext);
  const BASE_URL = `${import.meta.env.VITE_REACT_APP_BASE_URL}/`;

  useEffect(() => {
    const getUrls = async () => {
      try {
        setLoading(true);
        setError("");

        const response = await fetchData("/myurls");
        if (response?.responseCode === 200) {
          setUrls(response.data);
        }
      } catch (error) {
        setError(error?.message || "Something went wrong");
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

    if (isAuthenticated) {
      console.log("Authenticated, fetching URLs");
      getUrls();
    } else {
      console.log("Not authenticated, clearing URLs");
      setUrls([]);
      setLoading(false);
      setError("");
    }
  }, [isAuthenticated]);

  const localStorageUrls = !isAuthenticated
    ? JSON.parse(localStorage.getItem("shortUrls")) || []
    : [];
  const displayUrls = isAuthenticated ? urls : localStorageUrls;

  return (
    <div className="myurls-container">
      <h3 className="myurls-title">My URLs</h3>

      {loading && <p className="loading">Loading...</p>}
      {error && <p className="error">{error}</p>}

      {!loading && !error && displayUrls.length === 0 && (
        <p className="no-urls-message">
          No URLs to show. Create your first short URL!
        </p>
      )}
      <ul className="url-list">
        {displayUrls.map((url, index) => {
          const short = url.shortUrl || url;

          return (
            <li key={index} className="url-item">
              <a
                href={BASE_URL + short}
                target="_blank"
                rel="noreferrer"
                className="url-link"
              >
                {BASE_URL + short}
              </a>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default MyUrls;
