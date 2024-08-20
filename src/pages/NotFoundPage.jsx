import { Link } from "react-router-dom";
import icon from "../assets/images/404.png";

const NotFoundPage = () => {
  return (
    <section className="flex flex-col items-center justify-center mt-32 text-center h-96">
      <img className="w-auto h-64 mb-4" src={icon} alt="404-error" />
      <h1 className="mb-5 text-xl">Không tìm thấy đường dẫn này</h1>
      <Link
        to="/"
        className="px-3 py-2 mt-4 text-white rounded-md bg-violet-700 hover:bg-violet-900"
      >
        Quay lại trang chủ
      </Link>
    </section>
  );
};
export default NotFoundPage;
