import VerticalShortArticle from "./VerticalShortArticle";
import HorizontalShortArticle from "./HorizontalShortArticle";

const ArticleList = ({
  header,
  articles,
  colNumber = 5,
  verticalElement = true,
}) => {
  const gridColsClass = {
    1: "md:grid-cols-1",
    2: "md:grid-cols-2",
    3: "md:grid-cols-3",
    4: "md:grid-cols-4",
    5: "md:grid-cols-5",
  }[colNumber];

  return (
    <section className="px-4 py-10 bg-blue-50">
      <div className="m-auto container-xl lg:container">
        {header && (
          <h2 className="mb-6 text-3xl font-bold text-center text-indigo-500">
            {header}
          </h2>
        )}
        <div className={`grid grid-cols-1 gap-10 ${gridColsClass}`}>
          {verticalElement
            ? articles.map((article) => (
                <VerticalShortArticle
                  key={article._id}
                  article={article}
                  hideDescription={true}
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
