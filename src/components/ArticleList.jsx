import { useState, useEffect } from "react";
import ArticleCard from "./ArticleCard";
import Spinner from "./Spinner";
import axios from "axios";

const ArticleList = ({
  category,
  page,
  header,
  articleList,
  hideDescription = false,
}) => {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchArticles = async () => {
      const url = "/api/articles/";
      const params = { category, page };

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

    if (articleList == undefined) {
      fetchArticles();
    } else {
      setLoading(false);
    }
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
            {articleList != undefined
              ? articleList.map((article) => (
                  <ArticleCard
                    key={article._id}
                    article={article}
                    hideDescription={hideDescription}
                  />
                ))
              : articles.map((article) => (
                  <ArticleCard
                    key={article._id}
                    article={article}
                    hideDescription={hideDescription}
                  />
                ))}
          </div>
        )}
      </div>
    </section>
  );
};
export default ArticleList;
