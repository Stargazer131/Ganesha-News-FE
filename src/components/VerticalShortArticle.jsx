import { Link } from "react-router-dom";

const VerticalShortArticle = ({ article, hideDescription = false }) => {
  return (
    <article className="relative p-2 bg-white shadow-md rounded-xl">
      <Link to={`/article/${article._id}`}>
        <img src={article.thumbnail} className="w-full mb-3" />
        <h1 className="text-xl font-semibold">{article.title}</h1>
        {!hideDescription && <p className="mb-5">{article.description}</p>}
      </Link>
    </article>
  );
};

export default VerticalShortArticle;
