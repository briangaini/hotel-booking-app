import { createBrowserRouter } from "react-router-dom";
import App from "../App.jsx";
import Home from "../pages/home/Home.jsx";
import About from "../pages/miniPage/About.jsx";
import ContactUs from "../pages/miniPage/ContactUs.jsx";
import PrivacyPolicy from "../pages/miniPage/PrivacyPolicy.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,   // <--- MUST BE JSX LIKE THIS
    children: [
      {
        path: "/",
        element: <Home/>,
      },
      {
        path: "/about-us",
        element: <About/>
      },
      {
        path: "/privacy-policy",
        element: <PrivacyPolicy/>
      },
      {
        path: "/contact-us",
        element: <ContactUs/>
      }
    ]
  },
]);

export default router;
