import { Link } from "react-router-dom";
import icon from "../assets/images/500.png";

const ServerErrorPage = () => {
  return (
    <section className="flex flex-col items-center justify-center mt-32 text-center h-96">
      <img className="w-auto h-64 mb-4" src={icon} alt="500-error" />
      <h1 className="mb-5 text-xl">Lỗi máy chủ nội bộ</h1>
      <Link
        to="/"
        className="px-3 py-2 mt-4 text-white bg-indigo-700 rounded-md hover:bg-indigo-900"
      >
        Quay lại trang chủ
      </Link>
    </section>
  );
};

export default ServerErrorPage;
