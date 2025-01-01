import VerticalShortArticle from "./VerticalShortArticle";
import HorizontalShortArticle from "./HorizontalShortArticle";

const ArticleList = ({
  header,
  articles,
  colNumber = 1,
  verticalElement = true,
  hideDescription = true,
}) => {
  const gridColsClass = `md:grid-cols-${colNumber}`;

  return (
    <section className="px-4 py-10 bg-blue-50">
      <div className="m-auto container-xl lg:container">
        {header && (
          <h1 className="mb-6 text-3xl font-bold text-center text-indigo-500">
            {header}
          </h1>
        )}
        <div className={`grid gap-10 ${gridColsClass}`}>
          {verticalElement
            ? articles.map((article) => (
                <VerticalShortArticle
                  key={article._id}
                  article={article}
                  hideDescription={hideDescription}
                />
              ))
            : articles.map((article) => (
                <HorizontalShortArticle key={article._id} article={article} />
              ))}
        </div>
      </div>
    </section>
  );
};
export default ArticleList;
