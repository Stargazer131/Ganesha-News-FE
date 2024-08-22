import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const MainLayout = () => {
  return (
    <>
      <Navbar />
      <div className="py-14 bg-blue-50">
        <Outlet />
      </div>
      <ToastContainer />
    </>
  );
};

export default MainLayout;
