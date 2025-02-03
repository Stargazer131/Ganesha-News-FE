import { NavLink } from "react-router-dom";
import { FaHome, FaSearch } from "react-icons/fa";
import logo from "../assets/images/ganesha.png";
import axios from "axios";
import { useEffect, useState } from "react";
import { Switch } from "antd";

const categoryMap = {
  "thoi-su": "Thời sự",
  "the-gioi": "Thế giới",
  "kinh-doanh": "Kinh doanh",
  "giai-tri": "Giải trí",
  "the-thao": "Thể thao",
  "giao-duc": "Giáo dục",
  "khoa-hoc-cong-nghe": "Khoa học công nghệ",
  "xe": "Xe",
  "du-lich": "Du lịch",
  "suc-khoe": "Sức khỏe",
};

const Navbar = () => {
  const url1 = "https://recently-profound-crab.ngrok-free.app";
  const url2 = "https://ganesha-cloud.onrender.com";
  const [url, setUrl] = useState(url1);

  const toggleUrl = () => {
    setUrl((prevURL) => (prevURL === url1 ? url2 : url1));
  };

  axios.defaults.baseURL = url;
  axios.defaults.headers.common["ngrok-skip-browser-warning"] = true;

  useEffect(() => {
    axios.defaults.baseURL = url;
  }, [url]);

  const linkClassCategory = ({ isActive }) =>
    `text-white hover:bg-gray-900 hover:text-white rounded-md px-3 py-2 whitespace-nowrap text-sm ${
      isActive ? "bg-black" : ""
    }`;

  const linkClassIcon = ({ isActive }) =>
    `text-white hover:bg-gray-900 hover:text-white rounded-md px-3 py-2 ${
      isActive ? "bg-black" : ""
    }`;

  return (
    <nav className="fixed top-0 left-0 right-0 z-10 overflow-x-auto border-b bg-violet-600 border-violet-400">
      <div className="px-2 mx-auto sm:px-6 lg:px-8">
        <div className="flex items-center justify-between py-1">
          <div className="flex items-center justify-center flex-1 md:items-stretch md:justify-start">
            <NavLink
              className="flex items-center flex-shrink-0 mr-4 min-w-12"
              to="/"
            >
              <img className="w-auto h-14" src={logo} alt="Ganesha News" />
              <span className="hidden ml-2 text-2xl font-bold text-white md:block">
                Ganesha News
              </span>
            </NavLink>
            <div className="flex items-center md:ml-auto">
              <div className="flex px-3 space-x-2">
                <NavLink to="/" className={linkClassIcon}>
                  <FaHome />
                </NavLink>
                {Object.entries(categoryMap).map(([key, value]) => (
                  <NavLink
                    key={key}
                    to={`/articles/${key}`}
                    className={linkClassCategory}
                  >
                    {value}
                  </NavLink>
                ))}
                <NavLink to="/search" className={linkClassIcon}>
                  <FaSearch />
                </NavLink>
                <Switch
                  onClick={toggleUrl}
                  checkedChildren="Full"
                  unCheckedChildren="Demo"
                  defaultChecked
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export { Navbar as default, categoryMap };
