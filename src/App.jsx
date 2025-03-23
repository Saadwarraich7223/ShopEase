import { Outlet } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import { useDispatch } from "react-redux";
import { Suspense, useEffect, useState } from "react";
import authService from "./auth/authentication";
import { login, logout } from "./store/authSlice";
import Loader from "./components/Loader";

function App() {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    authService
      .getCurrentUser()
      .then((userData) => {
        if (userData) {
          dispatch(login(userData));
        } else {
          dispatch(logout);
        }
      })
      .finally(() => setLoading(false));
  }, []);

  return loading ? (
    <Loader />
  ) : (
    <>
      <Navbar />
      <div className="pt-15">
        <Suspense fallback={<Loader />}>
          <Outlet />
        </Suspense>
      </div>
      <Footer />
    </>
  );
}

export default App;
