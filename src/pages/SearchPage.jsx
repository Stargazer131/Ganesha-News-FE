import { useState } from "react";
import { FaSearch, FaInfoCircle, FaTimes } from "react-icons/fa";
import ArticleList from "../components/ArticleList";
import axios from "axios";
import { toast } from "react-toastify";

const SearchPage = () => {
  const [keyword, setKeyword] = useState("");
  const [articles, setArticles] = useState([]);
  const [showInfoPanel, setShowInfoPanel] = useState(false);

  const handleInfoClick = () => {
    setShowInfoPanel(true);
  };

  const closeInfoPanel = () => {
    setShowInfoPanel(false);
  };

  const handleSearch = () => {
    if (keyword == "") {
      toast.error("Không được để trống");
      return;
    }

    const url = `/api/search/`;
    const params = { keyword };

    axios
      .get(url, { params })
      .then((res) => {
        const data = res.data;
        setArticles(data);
      })
      .catch((error) => {
        console.log("Error fetching data", error);
        navigate("/error500");
      })
      .finally(() => {});
  };

  return (
    <section className="flex flex-col items-center justify-center mt-16 text-center">
      <h1 className="flex items-center justify-between mb-6 text-3xl font-bold text-indigo-500">
        Tìm kiếm
        <FaInfoCircle
          className="w-4 h-auto ml-2 cursor-pointer"
          onClick={handleInfoClick}
          title="Tìm hiểu thêm về tìm kiếm"
        />
      </h1>
      <div className="relative w-full max-w-md mb-2">
        <input
          type="text"
          value={keyword}
          onChange={(e) => setKeyword(e.target.value.trim())}
          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-violet-500"
          placeholder="Từ khóa ..."
        />
        <button
          onClick={handleSearch}
          className="absolute inset-y-0 right-0 flex items-center px-4 text-white bg-violet-500 rounded-r-md hover:bg-violet-600 focus:outline-none focus:ring-1 focus:ring-violet-500"
        >
          <FaSearch className="w-5 h-5" />
        </button>
      </div>

      {articles.length > 0 && (
        <ArticleList
          articles={articles}
          header={`Tìm thấy ${articles.length} kết quả`}
          colNumber={1}
          verticalElement={false}
        />
      )}

      {showInfoPanel && (
        <div
          className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50"
          onClick={closeInfoPanel} // Close panel when clicking outside
        >
          <div
            className="relative p-6 bg-white rounded-md shadow-md w-100"
            onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inside
          >
            <FaTimes
              className="absolute w-5 h-5 cursor-pointer text-violet-700 top-2 right-2"
              onClick={closeInfoPanel}
            />
            <h1 className="mb-5 text-xl font-bold text-center">Hướng dẫn</h1>
            <p className="text-lg text-left">
              Sử dụng các từ khóa cho trong tiêu đề hoặc nội dung bài viết để
              tìm kiếm.
            </p>
            <br />
            <p className="text-lg text-left">
              Từ khóa tìm kiếm cần đúng chính tả, phải sử dụng từ tiếng Việt có
              dấu.
            </p>
          </div>
        </div>
      )}
    </section>
  );
};

export default SearchPage;