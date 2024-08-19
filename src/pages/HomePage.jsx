import Spinner from "../components/Spinner";
import ArticleList from "../components/ArticleList";
import { useState, useEffect } from "react";
import axios from "axios";

const HomePage = () => {
  const [loading, setLoading] = useState(true);
  const [articles, setArticles] = useState([]);

  useEffect(() => {
    const fetchArticles = async () => {
      const url = "/api/articles/";
      const params = { "limit": 30 };

      axios
        .get(url, { params })
        .then((res) => {
          const data = res.data;
          setArticles(data);
          console.log(res);
        })
        .catch((error) => {
          console.log("Error fetching data", error);
        })
        .finally(() => {
          setLoading(false);
        });
    };

    fetchArticles();
  }, []);

  return (
    <>
      {loading ? (
        <Spinner loading={loading} />
      ) : (
        <ArticleList
          verticalElement={false}
          articles={articles}
          header={"Tin mới nhất"}
          colNumber={2}
        />
      )}
    </>
  );
};

export default HomePage;
