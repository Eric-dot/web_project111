import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Booking from "./pages/Booking";
import Layout from "./pages/Layout";
import Search from "./pages/Search";

const App = () => {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Navigate to="/search" />} />
          <Route element={<Layout />}>
            <Route path="/search" element={<Search />} />
            <Route path="/bookings" element={<Booking />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;
