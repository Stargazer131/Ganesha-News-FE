import ArticleList from "../components/ArticleList";
import { categoryMap } from "../components/Navbar";
import { useParams } from "react-router-dom";

const ArticleCategoryPage = () => {
  const { category, pagenumber } = useParams();
  let header = "Mới nhất";
  let pageNumber = 1;

  if (category != undefined) {
    if (category in categoryMap) {
      header = categoryMap[category];
    } else {
      // TODO: Invalid category
    }
  }

  if (pagenumber != undefined) {
    try {
      pageNumber = parseInt(pagenumber);
    } catch {
      // TODO: Invalid number
    }
  }

  return <ArticleList apiUrl={"/api/articles"} header={header} />;
};

export default ArticleCategoryPage;
