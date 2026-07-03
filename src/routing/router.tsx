import { createBrowserRouter } from "react-router-dom";
import MainPage from "../pages/MainPage/MainPage.tsx";
import NotFoundPage from "../pages/NotFoundPage/NotFoundPage.tsx";
import { AppRoutes } from "./routes.ts";
import MainLayout from "../pages/MainLayout/MainLayout.tsx";
import AdminDishesPage from "../pages/AdminDishesPage/AdminDishesPage.tsx";
import AdminOrdersPage from "../pages/AdminOrdersPage/AdminOrdersPage.tsx";
import CreateDishPage from "../pages/CreateDishPage/CreateDishPage.tsx";

export const router = createBrowserRouter([
  {
    element: <MainLayout />,
    children: [
      {
        path: AppRoutes.main,
        element: <MainPage />,
      },
      {
        path: AppRoutes.adminDishes,
        element: <AdminDishesPage />,
      },
      {
        path: AppRoutes.adminOrders,
        element: <AdminOrdersPage />,
      },
      {
        path: AppRoutes.createDish,
        element: <CreateDishPage />,
      },
      {
        path: AppRoutes.notFound,
        element: <NotFoundPage />,
      },
    ],
  },
]);
