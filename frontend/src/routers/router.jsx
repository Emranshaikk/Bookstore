import {
    createBrowserRouter,
    RouterProvider,
  } from "react-router-dom";
  import App from "../App";
  import Home from "../home/Homes"
  import Shop from "../shop/Shops"
import About from "../components/About";
import Blog from "../components/Blog";
import SingleBookData from "../shop/SingleBookData";
  

  const router = createBrowserRouter([
    {
      path: "/",
      element: <App/>,
      children: [

        {
            path: '/',
            element:<Home/>
        },
        {
            path: '/shop',
            element:<Shop/>
        },
        {
            path: '/about',
            element:<About/>
        },
        {
            path: '/blog',
            element:<Blog/>
        },
        {
          path: '/book/:id',
          element: <SingleBookData/>,
          loader:({params}) => fetch (`http://localhost:3000/book/${params.id}`)
        }
        
      ]
    },
  ]);

  export default router;