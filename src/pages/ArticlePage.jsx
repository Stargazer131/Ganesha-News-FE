import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import Spinner from "../components/Spinner";
import { categoryMap } from "../components/Navbar";
import ArticleList from "../components/ArticleList";
import axios from "axios";
import ImageCaption from "../components/ImageCaption";
import ImageGrid from "../components/ImageGrid";

const ArticlePage = () => {
  const navigate = useNavigate();
  const { articleId } = useParams();
  const [article, setArticle] = useState(null);
  const [recommendations, setRecommendations] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchArticles = async () => {
      setLoading(true);
      const url = `/article/${articleId}`;

      axios
        .get(url)
        .then((res) => {
          const data = res.data;
          setArticle(data["article"]);
          setRecommendations(data["recommendations"]);
        })
        .catch((error) => {
          console.log("Error fetching data", error);
          if (error.response.status == 404) {
            navigate("/error/404");
          } else {
            navigate("/error/500");
          }
        })
        .finally(() => {
          setLoading(false);
        });
    };

    fetchArticles();
  }, [articleId]);

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
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = date.getFullYear();
    const hours = String(date.getHours()).padStart(2, "0");
    const minutes = String(date.getMinutes()).padStart(2, "0");
    const dayInWeek = convert(date.getDay());

    return `${dayInWeek}, ${day}/${month}/${year}, ${hours}:${minutes}`;
  };

  const formatContent = (item, index) => {
    const prefix = "IMAGECONTENT:";

    if (Array.isArray(item)) {
      return <ImageGrid imageList={item} />;
    }

    if (item.startsWith(prefix)) {
      const [imgUrl, caption] = item.slice(prefix.length).split(";;");
      return <ImageCaption imgUrl={imgUrl} caption={caption} />;
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
              <div className="flex justify-between mb-6">
                <Link
                  className="text-violet-600 hover:underline"
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
                <div key={index}>{formatContent(item)}</div>
              ))}
            </div>

            <ArticleList
              articles={recommendations}
              header={"Tin liên quan"}
              hideDescription={true}
              colNumber={5}
            />
          </>
        )}
      </div>
    </article>
  );
};
export default ArticlePage;
