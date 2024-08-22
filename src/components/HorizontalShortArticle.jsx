import { Link } from "react-router-dom";

const HorizontalShortArticle = ({ article }) => {
  return (
    <article className="relative flex bg-white shadow-md rounded-xl">
      <Link to={`/article/${article._id}`} className="flex w-full">
        <img src={article.thumbnail} className="w-1/3 my-2 ml-2" />
        <div className="flex flex-col w-2/3 p-4">
          <h1 className="text-xl font-bold text-left">{article.title}</h1>
          <p className="mt-2 text-left">{article.description}</p>
        </div>
      </Link>
    </article>
  );
};

export default HorizontalShortArticle;
