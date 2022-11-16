import { Outlet, useLocation, useNavigate } from "react-router-dom";
import "./index.css";

const Layout = () => {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <div className="layout">
      <div className="nav-bar">
        <span
          className={"btn " + (location.pathname === "/search" ? "active" : "")}
          onClick={() => navigate("/search")}
        >
          Search
        </span>
        <span
          className={
            "btn " + (location.pathname === "/bookings" ? "active" : "")
          }
          onClick={() => navigate("/bookings")}
        >
          My Bookings
        </span>
      </div>
      <Outlet />
    </div>
  );
};

export default Layout;
