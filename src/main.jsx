import { lazy, StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { Provider } from "react-redux";
import { store } from "./store/store.js";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Protected from "./components/Protected.jsx";

const Home = lazy(() => import("./components/Home.jsx"));
const ProductList = lazy(() => import("./components/ProductList.jsx"));
const Cart = lazy(() => import("./components/Cart.jsx"));
const WishList = lazy(() => import("./components/WishList.jsx"));
const ProductDetails = lazy(() => import("./components/ProductDetails.jsx"));
const UserProfile = lazy(() => import("./components/UserProfile.jsx"));
const Signup = lazy(() => import("./components/Signup.jsx"));
const Signin = lazy(() => import("./components/Signin.jsx"));

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <Provider store={store}>
        <App />
      </Provider>
    ),
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/products",
        element: (
          <Protected>
            <ProductList />
          </Protected>
        ),
      },
      {
        path: "/product/:id",
        element: (
          <Protected>
            <ProductDetails />
          </Protected>
        ),
      },
      {
        path: "/cart",
        element: (
          <Protected>
            <Cart />
          </Protected>
        ),
      },
      {
        path: "/wishlist",
        element: (
          <Protected>
            <WishList />
          </Protected>
        ),
      },
      {
        path: "/userprofile",
        element: (
          <Protected>
            <UserProfile />
          </Protected>
        ),
      },
      {
        path: "/signup",
        element: (
          <Protected authentication={false}>
            <Signup />
          </Protected>
        ),
      },
      {
        path: "/signin",
        element: (
          <Protected authentication={false}>
            <Signin />
          </Protected>
        ),
      },
    ],
  },
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <RouterProvider router={router}></RouterProvider>
  </StrictMode>
);
