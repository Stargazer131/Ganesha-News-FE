import { useParams, Link } from "react-router-dom";
import icon500 from "../assets/images/500.png";
import icon404 from "../assets/images/404.png";
import defaultIcon from "../assets/images/error.png";

const ErrorPage = () => {
  const { errorCode } = useParams();
  const code = errorCode || 404;

  const errorDetails = {
    500: {
      image: icon500,
      text: "Lỗi máy chủ nội bộ",
    },
    404: {
      image: icon404,
      text: "Trang không tồn tại",
    },
  };

  const { image, text } = errorDetails[code] || {
    image: defaultIcon,
    text: "Đã xảy ra lỗi",
  };

  return (
    <section className="flex flex-col items-center justify-center mt-32 text-center h-96">
      <img
        className="w-auto h-64 mb-4"
        src={image}
        alt={`error-${errorCode}`}
      />
      <h1 className="mb-5 text-xl">{text}</h1>
      <Link
        to="/"
        className="px-3 py-2 mt-4 text-white rounded-md bg-violet-700 hover:bg-violet-900"
      >
        Quay lại trang chủ
      </Link>
    </section>
  );
};

export default ErrorPage;
