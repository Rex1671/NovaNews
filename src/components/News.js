import React, { useEffect, useState } from "react";
import NewsItem from "./NewsItem";
import Spinner from "./Spinner";
import PropTypes from "prop-types";
import { useLocation } from "react-router-dom";

const News = (props) => {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [totalResults, setTotalResults] = useState(0);

  // Get query params for Search
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const searchQuery = queryParams.get('q');

  const updateNews = async () => {
    props.setProgress(10);
    setLoading(true);

    if (props.savedMode) {
      // Saved News Mode
      const saved = JSON.parse(localStorage.getItem('savedNews') || "[]");
      setArticles(saved);
      setLoading(false);
      setTotalResults(saved.length);
      props.setProgress(100);
      return;
    }

    let url = "";

    if (searchQuery) {
      // Search Mode
      url = `https://gnews.io/api/v4/search?q=${searchQuery}&lang=en&country=in&apikey=${process.env.REACT_APP_NEWS_API_KEY}`;
    } else {
      // Category Mode
      url = `https://gnews.io/api/v4/top-headlines?category=${props.category}&lang=en&country=${props.country}&page=${page}&max=${props.pageSize}&apikey=${process.env.REACT_APP_NEWS_API_KEY}`;
    }

    try {
      const data = await fetch(url);
      const parsedData = await data.json();

      if (parsedData.articles) {
        setArticles(parsedData.articles);
        setTotalResults(parsedData.totalArticles);
      } else {
        // Handle error or empty
        setArticles([]);
      }
    } catch (e) {
      console.error("Error fetching news", e);
    }

    setLoading(false);
    props.setProgress(100);
  };

  useEffect(() => {
    updateNews();
    // eslint-disable-next-line
  }, [page, props.category, searchQuery, props.savedMode]);

  const handleNext = () => {
    setPage((prev) => prev + 1);
  };

  const handlePrev = () => {
    setPage((prev) => prev - 1);
  };

  const capitalize = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

  const titleText = props.savedMode
    ? "Your Saved Articles"
    : searchQuery
      ? `Search Results for "${searchQuery}"`
      : `NovaNews - Top ${capitalize(props.category)} Headlines`;

  return (
    <div className="container my-4">
      <h2 className="text-center" style={{ marginTop: '30px', marginBottom: '30px' }}>
        {titleText}
      </h2>

      {loading && <Spinner />}

      <div className="row">
        {!loading && articles.length === 0 && <p className="text-center">No articles found.</p>}
        {!loading &&
          articles.map((elem, index) => (
            <div className="col-md-3 my-3" key={index}>
              <NewsItem
                title={elem.title ? elem.title.slice(0, 45) + "..." : ""}
                description={elem.description ? elem.description.slice(0, 88) + "..." : ""}
                imageUrl={elem.image}
                newsUrl={elem.url}
                author={elem.source?.name}
                date={elem.publishedAt}
                source={elem.source?.name}
              />
            </div>
          ))}
      </div>

      {!props.savedMode && !searchQuery && (
        <div className="container mx-4 d-flex justify-content-between">
          <button disabled={page <= 1} type="button" className="btn btn-dark" onClick={handlePrev}> &larr; Previous</button>
          <button disabled={page + 1 > Math.ceil(totalResults / props.pageSize)} type="button" className="btn btn-dark" onClick={handleNext}>Next &rarr;</button>
        </div>
      )}
    </div>
  );
};

News.defaultProps = {
  country: "in",
  pageSize: 8,
  category: "general",
  savedMode: false
};

News.propTypes = {
  country: PropTypes.string,
  pageSize: PropTypes.number,
  category: PropTypes.string,
  savedMode: PropTypes.bool
};

export default News;
