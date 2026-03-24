import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import AddWeight from "./pages/AddWeight";
import WeightHistory from "./pages/WeightHistory";
import WeightDifference from "./pages/WeightDifference";
import Navbar from "./components/Navbar";

const PrivateRoute = ({ children }) => {
  const user = JSON.parse(localStorage.getItem("user"));
  return user ? children : <Navigate to="/login" replace />;
};

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/login" />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />

        {/* Protected routes */}
        <Route
          path="/add-weight"
          element={
            <PrivateRoute>
              <>
                <Navbar />
                <AddWeight />
              </>
            </PrivateRoute>
          }
        />

        <Route
          path="/history"
          element={
            <PrivateRoute>
              <>
                <Navbar />
                <WeightHistory />
              </>
            </PrivateRoute>
          }
        />

        <Route
          path="/difference"
          element={
            <PrivateRoute>
              <>
                <Navbar />
                <WeightDifference />
              </>
            </PrivateRoute>
          }
        />

        <Route path="*" element={<Navigate to="/login" />} />

      </Routes>
    </BrowserRouter>
  );
}

export default App;