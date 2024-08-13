import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";
import Spinner from "../components/Spinner";
import { categoryMap } from "../components/Navbar";
import ArticleList from "../components/ArticleList";
import axios from "axios";

const ArticlePage = () => {
  const { articleid } = useParams();
  const [article, setArticle] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchArticles = async () => {
      setLoading(true);
      const apiUrl = `/api/articles/${articleid}`;
      axios
        .get(apiUrl)
        .then((res) => {
          const data = res.data;
          setArticle(data);
        })
        .catch((error) => {
          console.log("Error fetching data", error);
        })
        .finally(() => {
          setLoading(false);
        });
    };

    fetchArticles();
  }, [articleid]);

  const formatDate = (dateString) => {
    const convert = (dayIndex) => {
      switch (dayIndex) {
        case 0:
          return "Chủ Nhật";
        case 1:
          return "Thứ Hai";
        case 2:
          return "Thứ Ba";
        case 3:
          return "Thứ Tư";
        case 4:
          return "Thứ Năm";
        case 5:
          return "Thứ Sáu";
        case 6:
          return "Thứ Bảy";
        default:
          return "Ngày không hợp lệ";
      }
    };

    const date = new Date(dateString);
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0"); // Months are zero-based
    const year = date.getFullYear();
    const hours = String(date.getHours()).padStart(2, "0");
    const minutes = String(date.getMinutes()).padStart(2, "0");
    const dayInWeek = convert(date.getDay());

    return `${dayInWeek}, ${day}/${month}/${year}, ${hours}:${minutes}`;
  };

  const formatContent = (item = "") => {
    const prefix = "IMAGECONTENT:";

    // image content
    if (item.startsWith(prefix)) {
      const [imgUrl, caption] = item.slice(prefix.length).split(";;");
      return (
        <div className="flex flex-col items-center mb-4">
          <img
            src={imgUrl}
            alt={caption || "Image"}
            className="h-auto max-w-full mb-2"
          />
          {caption && (
            <p className="text-sm text-center text-gray-600">{caption}</p>
          )}
        </div>
      );
    } else {
      return <p className="mb-4 text-lg">{item}</p>;
    }
  };

  return (
    <article className="bg-indigo-50">
      <div className="container max-w-6xl m-auto">
        {loading ? (
          <Spinner loading={loading} />
        ) : (
          <>
            <div className="px-6 py-8 m-4 mb-4 bg-white border rounded-md shadow-md md:m-0">
              <div className="flex justify-between mb-3">
                <Link
                  className="text-blue-600"
                  to={`/articles/${article.category}`}
                >
                  {categoryMap[article.category]}
                </Link>
                <p className="text-gray-500">
                  {formatDate(article.published_date)}
                </p>
              </div>
              <h1 className="mb-6 text-4xl font-semibold text-center">
                {article.title}
              </h1>
              <p className="mb-4 text-lg italic text-gray-500">
                {article.description}
              </p>
              {article.content.map((item, index) => (
                <p key={index}>{formatContent(item)}</p>
              ))}
            </div>

            <ArticleList
              apiUrl={"/api/articles"}
              header={"Tin liên quan"}
              hideDescription={true}
            />
          </>
        )}
      </div>
    </article>
  );
};
export default ArticlePage;
