import ArticleList from "../components/ArticleList";
import { useNavigate, useParams } from "react-router-dom";
import Pagination from "../components/Pagination";
import { useState, useEffect } from "react";
import Spinner from "../components/Spinner";
import axios from "axios";

const ArticleCategoryPage = () => {
  const { category, pageNumber = "1" } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [articles, setArticles] = useState([]);

  useEffect(() => {
    const fetchArticles = async () => {
      const url = "/api/articles/";
      const params = { category, "page": pageNumber };

      axios
        .get(url, { params })
        .then((res) => {
          const data = res.data;
          setArticles(data);
        })
        .catch((error) => {
          console.log("Error fetching data", error);
        })
        .finally(() => {
          setLoading(false);
        });
    };

    fetchArticles();
  }, [category, pageNumber]);

  const handlePageClick = (event) => {
    navigate(`/articles/${category}/${event.selected + 1}`);
    window.scrollTo({ top: 0, behavior: "instant" });
  };

  return (
    <>
      {loading ? (
        <Spinner loading={loading} />
      ) : (
        <ArticleList articles={articles} key={`${category}-${pageNumber}`} />
      )}
      <Pagination
        key={String(category)}
        handlePageClick={handlePageClick}
        maxitem={20}
      />
    </>
  );
};

export default ArticleCategoryPage;
