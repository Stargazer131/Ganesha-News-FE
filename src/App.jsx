import {
  Route,
  createBrowserRouter,
  createRoutesFromElements,
  RouterProvider,
} from "react-router-dom";

import ArticleCategoryPage from "./pages/ArticleCategoryPage";
import MainLayout from "./layouts/MainLayout";
import NotFoundPage from "./pages/NotFoundPage";
import ArticlePage from "./pages/ArticlePage";
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

        <Route path="*" element={<NotFoundPage />} />
      </Route>
    )
  );

  return <RouterProvider router={router} />;
};

export default App;
