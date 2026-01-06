import { Routes, Route, Navigate } from "react-router";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

import { checkAuth } from "./authSlice";
import AdminRegister from "./components/AdminRegister";
import Layout from "./layouts/Layout";
import Landing from "./pages/Landing";
import Auth from "./pages/Auth";
import Homepage from "./pages/Homepage";
import ProblemPage from "./pages/ProblemPage";
import AdminPanel from "./pages/AdminPanel";
import AdminProblemCreate from "./components/AdminProblemCreate";
import ProblemDelete from "./components/ProblemDelete";
import UpdateProblem from "./components/UpdateProblem";
import AdminVideo from "./components/AdminVideo";
import AdminUpload from "./components/AdminUpload";

function App() {
  const { isAuthenticated, loading, user } = useSelector(
    (state) => state.auth
  );
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(checkAuth());
  }, [dispatch]);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <span className="loading loading-spinner loading-lg"></span>
      </div>
    );
  }

  return (
    <Routes>
      {/* Public Routes */}
      <Route
        path="/"
        element={
          isAuthenticated ? <Navigate to="/home" /> : <Landing />
        }
      />

      <Route
        path="/auth"
        element={
          isAuthenticated ? <Navigate to="/home" /> : <Auth />
        }
      />

      {/*Protected Routes*/}
      <Route
        element={
          isAuthenticated ? <Layout /> : <Navigate to="/auth" />
        }
      >
        <Route path="/home" element={<Homepage />} />

        <Route
          path="/problem/:problemId"
          element={<ProblemPage />}
        />

        {/*Admin Routes*/}
        <Route
          path="/admin"
          element={
            user?.role === "admin"
              ? <AdminPanel />
              : <Navigate to="/home" />
          }
        />

        <Route
          path="/admin/create"
          element={
            user?.role === "admin"
              ? <AdminProblemCreate />
              : <Navigate to="/home" />
          }
        />

        <Route
          path="/admin/delete"
          element={
            user?.role === "admin"
              ? <ProblemDelete />
              : <Navigate to="/home" />
          }
        />
        <Route
          path="/admin/register"
          element={
            user?.role === "admin"
              ? <AdminRegister />
              : <Navigate to="/home" />
          }
        />

        <Route
          path="/admin/update"
          element={
            user?.role === "admin"
              ? <UpdateProblem />
              : <Navigate to="/home" />
          }
        />

        <Route
          path="/admin/video"
          element={
            user?.role === "admin"
              ? <AdminVideo />
              : <Navigate to="/home" />
          }
        />

        <Route
          path="/admin/upload/:problemId"
          element={
            user?.role === "admin"
              ? <AdminUpload />
              : <Navigate to="/home" />
          }
        />
      </Route>

      {/*Fallback*/}
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
}

export default App;
