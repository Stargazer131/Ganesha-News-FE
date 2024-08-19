import { Link } from "react-router-dom";

const HorizontalShortArticle = ({ article }) => {
  return (
    <article className="relative flex bg-white shadow-md rounded-xl">
      <Link to={`/article/${article._id}`} className="flex w-full">
        <img src={article.thumbnail} className="w-1/3 my-2 mb-4" />
        <div className="flex flex-col justify-between w-2/3 p-4">
          <h3 className="text-xl font-bold">{article.title}</h3>
          <p className="mt-2">{article.description}</p>
        </div>
      </Link>
    </article>
  );
};

export default HorizontalShortArticle;
