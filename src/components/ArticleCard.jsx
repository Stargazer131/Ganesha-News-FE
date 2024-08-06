import { Link } from "react-router-dom";

const ArticleCard = ({ article }) => {
  return (
    <div className="relative bg-white shadow-md rounded-xl">
      <div className="p-4">
        <Link to={`/article/${article.id}`}>
          <img src={article.thumbnail} className="my-2 mb-4" />
          <h3 className="text-xl font-bold">{article.title}</h3>
          <p className="mb-5">{article.description}</p>
        </Link>
      </div>
    </div>
  );
};

export default ArticleCard;
