import Spinner from "../components/Spinner";
import ArticleList from "../components/ArticleList";
import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const HomePage = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [articles, setArticles] = useState([]);
  const [isSmallScreen, setIsSmallScreen] = useState(false);

  useEffect(() => {
    const fetchArticles = async () => {
      setLoading(true);
      const url = "/api/articles/";
      const params = { limit: 40 };
      const headers = {
        "ngrok-skip-browser-warning": true,
      };

      axios
        .get(url, { params, headers })
        .then((res) => {
          const data = res.data;
          setArticles(data);
        })
        .catch((error) => {
          console.log("Error fetching data", error);
          navigate("/error500");
        })
        .finally(() => {
          setLoading(false);
        });
    };

    fetchArticles();
  }, []);

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

  return (
    <>
      {loading ? (
        <Spinner loading={loading} />
      ) : (
        <ArticleList
          verticalElement={isSmallScreen}
          hideDescription={!isSmallScreen}
          articles={articles}
          header={"Tin mới nhất"}
          colNumber={isSmallScreen ? 1 : 2}
        />
      )}
    </>
  );
};

export default HomePage;
