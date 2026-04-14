import React, { useState, useEffect } from "react";
import { fetchData } from "../../../api/apiService";
import "./MyUrls.css";

const MyUrls = () => {
  const [urls, setUrls] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const BASE_URL = `${import.meta.env.VITE_REACT_APP_BASE_URL}/`;

  useEffect(() => {
    const getUrls = async () => {
      try {
        setLoading(true);

        const response = await fetchData("/myurls");

        if (response?.responseCode === 200) {
          setUrls(response.data);
        }
      } catch (error) {
        setError(error?.message || "Something went wrong");
      } finally {
        setLoading(false);
      }
    };

    getUrls();
  }, []);

  const localStorageUrls =
    JSON.parse(localStorage.getItem("shortUrls")) || [];

  const displayUrls = urls.length > 0 ? urls : localStorageUrls;

  return (
    <div className="myurls-container">
      <h3 className="myurls-title">My URLs</h3>

      {loading && <p className="loading">Loading...</p>}
      {error && <p className="error">{error}</p>}

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