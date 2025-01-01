import { useState, useRef, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { FaSearch, FaInfoCircle, FaTimes } from "react-icons/fa";
import ArticleList from "../components/ArticleList";
import Spinner from "../components/Spinner";
import axios from "axios";
import { toast } from "react-toastify";
import Pagination from "../components/Pagination";
import { backendURL } from "../App";

const SearchPage = () => {
  const [articles, setArticles] = useState([]);
  const [showInfoPanel, setShowInfoPanel] = useState(false);
  const [loading, setLoading] = useState(false);
  const buttonRef = useRef(null);
  const [isSmallScreen, setIsSmallScreen] = useState(false);

  const [totalArticlesSearched, setTotalArticlesSearched] = useState(0);
  const [totalPage, setTotalPage] = useState(20);
  const numPerPage = 20;

  const location = useLocation();
  const navigate = useNavigate();
  const queryParams = new URLSearchParams(location.search);
  const keyword = queryParams.get("keyword") || "";
  const currentPage = Number(queryParams.get("page")) || 1;

  const handleKeywordChange = (value) => {
    queryParams.set("keyword", value);
    queryParams.set("page", 1);
    navigate({ search: queryParams.toString() });
  };

  const handlePageClick = (event) => {
    queryParams.set("page", event.selected + 1);
    navigate({ search: queryParams.toString() });
    handleSearch(event.selected + 1);
  };

  const handleInfoClick = () => {
    setShowInfoPanel(true);
  };

  const closeInfoPanel = () => {
    setShowInfoPanel(false);
  };

  useEffect(() => {
    const handleResize = () => {
      setIsSmallScreen(window.innerWidth < 768);
    };

    handleResize();
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const handleSearch = (pageNum = 0) => {
    if (keyword == null || keyword.trim() == "") {
      return;
    }

    setLoading(true);
    if (pageNum == 0) {
      pageNum = currentPage;
    }

    const url = `${backendURL}/search/`;
    const params = {
      "keyword": keyword.trim(),
      "limit": numPerPage,
      "page": pageNum,
    };

    axios
      .get(url, { params })
      .then((res) => {
        const data = res.data;
        if (data["total"] == 0) {
          toast.success("Không tìm thấy kết quả nào!");
        }

        setArticles(data["articles"]);
        setTotalArticlesSearched(data["total"]);
        setTotalPage(Math.ceil(data["total"] / numPerPage));
      })
      .catch((error) => {
        console.log("Error fetching data", error);
        navigate("/error500");
      })
      .finally(() => {
        setLoading(false);
      });
  };

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key == "Enter" && buttonRef.current) {
        buttonRef.current.click();
      }
    };

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  useEffect(() => {
    handleSearch();
  }, []);

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
          onChange={(e) => handleKeywordChange(e.target.value)}
          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-violet-500"
          placeholder="Từ khóa ..."
        />
        <button
          ref={buttonRef}
          onClick={() => handleSearch()}
          className="absolute inset-y-0 right-0 flex items-center px-4 text-white bg-violet-500 rounded-r-md hover:bg-violet-600 focus:outline-none focus:ring-1 focus:ring-violet-500"
        >
          <FaSearch className="w-5 h-5" />
        </button>
      </div>

      {loading ? (
        <Spinner loading={loading} />
      ) : (
        totalArticlesSearched > 0 && (
          <ArticleList
            articles={articles}
            header={`Tìm thấy ${totalArticlesSearched} kết quả`}
            verticalElement={isSmallScreen}
            hideDescription={!isSmallScreen}
          />
        )
      )}

      {totalArticlesSearched > 0 && (
        <Pagination
          handlePageClick={handlePageClick}
          maxitem={totalPage}
          forcePage={currentPage - 1}
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
            <br />
            <p className="text-lg text-left">
              Kết quả được sắp xếp theo ngày đăng.
            </p>
          </div>
        </div>
      )}
    </section>
  );
};

export default SearchPage;
