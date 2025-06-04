import { Navigate, Route, Routes, useLocation } from "react-router-dom";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Home from "./pages/Home";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useContext } from "react";
import { AuthContext } from "./context/AuthContext";
import Navbar from "./components/Navbar";
import ProductDetails from "./pages/ProductDetails";
import PrivateRoute from "./components/PrivateRoute";
import AddProductModal from "./components/AddProductModal";

function App() {
  const { authUser } = useContext(AuthContext);
  const location = useLocation();

  const hideNavbarRoutes = ["/login", "/signup"];
  const shouldHideNavbar = hideNavbarRoutes.includes(location.pathname);
  return (
    <>
      {!shouldHideNavbar && <Navbar />}
      <ToastContainer />
      <Routes>
        <Route path="/signup" element={<Signup />} />
        <Route
          path="/login"
          element={!authUser ? <Login /> : <Navigate to="/" />}
        />
        <Route
          path="/"
          element={
            <PrivateRoute>
              {" "}
              <Home />{" "}
            </PrivateRoute>
          }
        />

        <Route
          path="/productDetail/:id"
          element={
            <PrivateRoute>
              <ProductDetails />{" "}
            </PrivateRoute>
          }
        />
      </Routes>
    </>
  );
}

export default App;
