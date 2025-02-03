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
      const url = `/articles/`;
      const params = { limit: 40 };

      axios
        .get(url, { params })
        .then((res) => {
          const data = res.data;
          setArticles(data);
        })
        .catch((error) => {
          console.log("Error fetching data", error);
          navigate("/error/500");
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
