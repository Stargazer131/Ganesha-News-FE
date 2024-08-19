import ArticleCard from "./ArticleCard";

const ArticleList = ({ header, articles, hideDescription = false }) => {
  return (
    <section className="px-4 py-10 bg-blue-50">
      <div className="m-auto container-xl lg:container">
        {header && (
          <h2 className="mb-6 text-3xl font-bold text-center text-indigo-500">
            {header}
          </h2>
        )}
        {articles.map((article) => (
          <ArticleCard
            key={article._id}
            article={article}
            hideDescription={hideDescription}
          />
        ))}
      </div>
    </section>
  );
};
export default ArticleList;
