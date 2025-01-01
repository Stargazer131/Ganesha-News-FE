import ArticleList from "../components/ArticleList";
import { useNavigate, useParams } from "react-router-dom";
import Pagination from "../components/Pagination";
import { useState, useEffect } from "react";
import Spinner from "../components/Spinner";
import axios from "axios";
import { categoryMap } from "../components/Navbar";
import { backendURL } from "../App";

const ArticleCategoryPage = () => {
  const navigate = useNavigate();
  const { category, pageNumber = "1" } = useParams();
  const [loading, setLoading] = useState(true);
  const [articles, setArticles] = useState([]);
  const [isSmallScreen, setIsSmallScreen] = useState(false);

  useEffect(() => {
    const fetchArticles = async () => {
      if (!(category in categoryMap) || Number.isNaN(parseInt(pageNumber))) {
        navigate("/error404");
        return;
      }

      setLoading(true);
      const url = `${backendURL}/articles/`;
      const params = { category, page: pageNumber };

      axios
        .get(url, { params })
        .then((res) => {
          const data = res.data;
          setArticles(data);
        })
        .catch((error) => {
          console.log("Error fetching data:", error);
          navigate("/error500");
        })
        .finally(() => {
          setLoading(false);
        });
    };

    fetchArticles();
    window.scrollTo({ top: 0, behavior: "instant" });
  }, [category, pageNumber, navigate]);

  useEffect(() => {
    const handleResize = () => {
      setIsSmallScreen(window.innerWidth < 768);
    };

    handleResize();
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const handlePageClick = (event) => {
    navigate(`/articles/${category}/${event.selected + 1}`);
  };

  return (
    <>
      {loading ? (
        <Spinner loading={loading} />
      ) : (
        <ArticleList
          key={`${category}-${pageNumber}`}
          verticalElement={isSmallScreen}
          hideDescription={!isSmallScreen}
          articles={articles}
          colNumber={isSmallScreen ? 1 : 2}
        />
      )}
      <Pagination
        key={String(category)}
        handlePageClick={handlePageClick}
        maxitem={20}
        forcePage={parseInt(pageNumber) - 1}
      />
    </>
  );
};

export default ArticleCategoryPage;
