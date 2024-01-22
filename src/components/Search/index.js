import React, { useEffect, useState } from "react";
import Loader from "react-loaders";
import "./index.scss";
import AnimatedLetters from "../AnimatedLetters";

const Search = () => {
  const [letterClass, setLetterClass] = useState("text-animate");
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(false);
  const [examResults, setExamResults] = useState([]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLetterClass("text-animate-hover");
    }, 3000);

    return () => {
      clearTimeout(timer);
    };
  }, []);

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const handleGoButtonClick = () => {
    window.location.href = `/data?name=${encodeURIComponent(searchQuery)}`;
  };

  return (
    <div className="container search-page">
      <h1 className="page-title">
        <br />
        <br />
        <AnimatedLetters letterClass={letterClass} strArray={"Search".split("")} idx={15} />
      </h1>
      <h2>Find your exam by course code (i.e., ECSE 200)</h2>
      <div className="search-bar">
        <input
          type="text"
          placeholder="Search for exams"
          value={searchQuery}
          onChange={handleSearchChange}
        />
        <button onClick={handleGoButtonClick}>Go</button>
      </div>

      {loading && <Loader type="pacman" />}

      {examResults.length > 0 && (
        <div className="exam-results">
          <h3>Exam Results:</h3>
          <ul>
            {examResults.map((result) => (
              <li key={result.examId}>{/* Render your exam result data here */}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default Search;