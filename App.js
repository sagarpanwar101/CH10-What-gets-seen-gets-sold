import React, { lazy, Suspense } from "react"; // suspense and lazy loading import  
import ReactDOM from "react-dom/client";
import Header from "./src/components/Header";
import Body from "./src/components/Body";
import Footer from "./src/components/Footer";
import About from "./src/components/About";
import Contact from "./src/components/Contact";
import Error from "./src/components/Error";
import RestuarantMenu from "./src/components/RestuarantMenu";
import { createBrowserRouter, RouterProvider, Outlet } from "react-router-dom";

const Grocery = lazy(() => import("./src/components/Grocery.js")); 

const AppLayout = () => {
  return (
    <>
      <Header/>  
      <Outlet/> 
      <Footer/>
    </>
  );
};

const appRouter = createBrowserRouter([
  { 
    path: "/",
    element:<AppLayout/>,
    errorElement : <Error />,

    children: [
      {
        index: true,
        element: <Body />,
      },
      {
        path: "about",
        element: <About />,
      },
      {
        path: "contact",
        element: <Contact />,
      },
      {
        path: "/restaurantmenu/:id",
        element: <RestuarantMenu />,
      },
      {
        path: "/grocery",
        element: <Suspense fallback={
        <p>Loading .................</p>}>
           <Grocery /> 
           </Suspense>
      },
    ]
  },
  {
    path: "*",
    element: <Error />
  }
]);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<RouterProvider router={appRouter} />);
