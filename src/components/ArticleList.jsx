import { useState, useEffect } from "react";
import ArticleCard from "./ArticleCard";
import Spinner from "./Spinner";
import axios from "axios";

const ArticleList = ({ apiUrl, header, articleList }) => {
  const [arricles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchArticles = async () => {
      axios
        .get(apiUrl)
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
  }, []);

  return (
    <section className="px-4 py-10 bg-blue-50">
      <div className="m-auto container-xl lg:container">
        <h2 className="mb-6 text-3xl font-bold text-center text-indigo-500">
          {header}
        </h2>
        {loading ? (
          <Spinner loading={loading} />
        ) : (
          <div className={`grid grid-cols-1 gap-10 md:grid-cols-4`}>
            {arricles.map((article) => (
              <ArticleCard key={article.id} article={article} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
};
export default ArticleList;
