import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../layouts/MainLayout";
import Home from "../pages/home/Home";
import Contact from "../pages/contact/Contact";
import News from "../pages/news/News";
import About from "../pages/about/About";
import Pricing from "../pages/pricing/Pricing";
import Login from "../pages/login/Login";
import Register from "../pages/register/Register";
import Blog from "../pages/blog/Blog";
import Help from "../pages/help/Help";
import Opportunities from "../pages/Opportunities/Opportunities";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/about",
        element: <About />,
      },
      {
        path: "/opportunities",
        element: <Opportunities />,
      },
      {
        path: "/contact",
        element: <Contact />,
      },
      {
        path: "/blog",
        element: <Blog />,
      },
      {
        path: "/news",
        element: <News />,
      },
      {
        path: "/help",
        element: <Help />,
      },
      {
        path: "/pricing",
        element: <Pricing />,
      },
    ],
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/register",
    element: <Register />,
  },
]);
