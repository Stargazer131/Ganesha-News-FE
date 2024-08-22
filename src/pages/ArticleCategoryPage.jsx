import ArticleList from "../components/ArticleList";
import { useNavigate, useParams } from "react-router-dom";
import Pagination from "../components/Pagination";
import { useState, useEffect } from "react";
import Spinner from "../components/Spinner";
import axios from "axios";
import { categoryMap } from "../components/Navbar";

const ArticleCategoryPage = () => {
  const navigate = useNavigate();
  const { category, pageNumber = "1" } = useParams();
  const [loading, setLoading] = useState(true);
  const [articles, setArticles] = useState([]);

  useEffect(() => {
    const fetchArticles = async () => {
      if (!(category in categoryMap) || Number.isNaN(parseInt(pageNumber))) {
        navigate("/error404");
      }

      const url = "/api/articles/";
      const params = { category, "page": pageNumber };

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
  }, [category, pageNumber]);

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
          verticalElement={false}
          articles={articles}
          colNumber={2}
        />
      )}
      <Pagination
        key={String(category)}
        handlePageClick={handlePageClick}
        maxitem={20}
        forcePage={parseInt(pageNumber - 1)}
      />
    </>
  );
};

export default ArticleCategoryPage;
