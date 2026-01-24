import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import AddWeight from "./pages/AddWeight";
import WeightHistory from "./pages/WeightHistory";
import WeightDifference from "./pages/WeightDifference";
import Navbar from "./components/Navbar";

const PrivateRoute = ({ children }) => {
  const user = JSON.parse(localStorage.getItem("user"));
  return user ? children : <Navigate to="/login" />;
};
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />

        <Route
          path="/*"
          element={
            <PrivateRoute>
              <Navbar />
              <Routes>
                <Route path="add-weight" element={<AddWeight />} />
                <Route path="history" element={<WeightHistory />} />
                <Route path="difference" element={<WeightDifference />} />
                <Route path="*" element={<Navigate to="/add-weight" />} />
              </Routes>
            </PrivateRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
