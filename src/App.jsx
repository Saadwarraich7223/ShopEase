import { Outlet } from "react-router-dom";
import Navbar from "./components/Navbar";
import ProductList from "./components/ProductList";
import Footer from "./components/Footer";

function App() {
  return (
    <>
      <Navbar />
      <div className="pt-15">
        <Outlet />
      </div>
      <Footer />
    </>
  );
}

export default App;
