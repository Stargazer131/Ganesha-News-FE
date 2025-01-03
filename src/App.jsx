import {
  Route,
  createBrowserRouter,
  createRoutesFromElements,
  RouterProvider,
} from "react-router-dom";

import ArticleCategoryPage from "./pages/ArticleCategoryPage";
import MainLayout from "./layouts/MainLayout";
import ErrorPage from "./pages/ErrorPage";
import ArticlePage from "./pages/ArticlePage";
import SearchPage from "./pages/SearchPage";
import HomePage from "./pages/HomePage";
import axios from "axios";

const backendURL = "https://recently-profound-crab.ngrok-free.app";
axios.defaults.headers.common["ngrok-skip-browser-warning"] = true;

// const backendURL = "http://localhost:8000";

const App = () => {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" element={<MainLayout />}>
        <Route index element={<HomePage />} />
        <Route
          path="articles/:category/:pageNumber?"
          element={<ArticleCategoryPage />}
        />
        <Route path="article/:articleId" element={<ArticlePage />} />
        <Route path="search" element={<SearchPage />} />
        <Route path="error/:errorCode" element={<ErrorPage />} />
        <Route path="*" element={<ErrorPage />} />
      </Route>
    ),
    { basename: "/Ganesha-News-FE" }
  );

  return <RouterProvider router={router} />;
};

export { App as default, backendURL };
