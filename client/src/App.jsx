import { Navigate, Route, Routes } from "react-router-dom";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Home from "./pages/Home";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useContext } from "react";
import { AuthContext } from "./context/AuthContext";

function App() {
  const { authUser } = useContext(AuthContext);
  return (
    <>
      <ToastContainer />
      <Routes>
        <Route path="/signup" element={<Signup />} />
        <Route
          path="/login"
          element={!authUser ? <Login /> : <Navigate to="/" />}
        />
        <Route
          path="/"
          element={authUser ? <Home /> : <Navigate to="/login" />}
        />
      </Routes>
    </>
  );
}

export default App;
