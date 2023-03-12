import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Home } from "./home";
import { Users } from "./users";

export const router = createBrowserRouter([
    {
        path: "/",
        element: <Home></Home>,
    },
    {
        path: "/users",
        element: <Users></Users>,
    },
]);
