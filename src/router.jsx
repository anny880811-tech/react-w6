import { createHashRouter } from "react-router-dom";
import FrontendLayout from "./layout/FrontendLayout";
import Home from "./views/front/Home";
import NotFound from "./views/front/NotFound";
import SingleProduct from "./views/front/SingleProduct";
import Cart from "./views/front/Cart";
import Products from "./views/front/Products";
import Login from "./views/front/Login";

export const router = createHashRouter([
    {
        path: '/',
        element: <FrontendLayout />,
        children: [
            {
                index: true,
                element: <Home />,
            },
            {
                path: 'product',
                element: <Products />,
            },
            {
                path: 'product/:id',
                element: <SingleProduct />,
            },
            {
                path: 'cart',
                element: <Cart />,
            },
            {
                path: 'login',
                element: <Login />,
            },
        ],
    },
    {
        path: '*',
        element: <NotFound />,
    },
]);
