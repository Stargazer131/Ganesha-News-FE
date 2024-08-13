import ArticleList from "../components/ArticleList";
import { categoryMap } from "../components/Navbar";
import { useParams } from "react-router-dom";
import Pagination from "../components/Pagination";
import { useState, useEffect } from "react";

const ArticleCategoryPage = () => {
  const [pageNumber, setPageNumber] = useState(1);
  const { category } = useParams();

  let header = "Mới nhất";
  if (category != undefined) {
    if (category in categoryMap) {
      header = `${categoryMap[category]} - Page ${pageNumber}`;
    } else {
      // TODO: Invalid category
    }
  }

  useEffect(() => {
    setPageNumber(1);
  }, [category]);

  const handlePageClick = (event) => {
    setPageNumber(event.selected + 1);
  };

  return (
    <>
      <ArticleList
        key={`${category}-${pageNumber}`}
        apiUrl={"/api/articles"}
        header={header}
      />
      <Pagination
        key={category}
        handlePageClick={handlePageClick}
        maxitem={20}
      />
    </>
  );
};

export default ArticleCategoryPage;
