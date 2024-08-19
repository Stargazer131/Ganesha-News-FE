import { Link } from "react-router-dom";

const VerticalShortArticle = ({ article, hideDescription = false }) => {
  return (
    <article className="relative bg-white shadow-md rounded-xl">
      <Link to={`/article/${article._id}`}>
        <img src={article.thumbnail} className="w-full" />
        <div className="p-3">
          <h3 className="text-xl font-bold">{article.title}</h3>
          {!hideDescription && <p className="mb-5">{article.description}</p>}
        </div>
      </Link>
    </article>
  );
};

export default VerticalShortArticle;
