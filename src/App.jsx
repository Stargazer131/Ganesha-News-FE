import {
  Route,
  createBrowserRouter,
  createRoutesFromElements,
  RouterProvider,
} from "react-router-dom";

import ArticleCategoryPage from "./pages/ArticleCategoryPage";
import MainLayout from "./layouts/MainLayout";
import NotFoundPage from "./pages/NotFoundPage";
import ServerErrorPage from "./pages/ServerErrorPage";
import ArticlePage from "./pages/ArticlePage";
import SearchPage from "./pages/SearchPage";
import HomePage from "./pages/HomePage";

const App = () => {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" element={<MainLayout />}>
        <Route index element={<HomePage />} />
        <Route
          path="/articles/:category/:pageNumber?"
          element={<ArticleCategoryPage />}
        />
        <Route path="/article/:articleId" element={<ArticlePage />} />
        <Route path="/search" element={<SearchPage />} />
        <Route path="/error404" element={<NotFoundPage />} />
        <Route path="/error500" element={<ServerErrorPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Route>
    )
  );

  return <RouterProvider router={router} />;
};

export default App;
