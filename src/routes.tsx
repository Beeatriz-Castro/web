import React from "react";
import { createBrowserRouter, Navigate } from "react-router-dom";
import { ProtectedRoute } from "./components/protected-route";
import { CustomerModelsPage } from "./pages/customer/models-page";
import { CustomerGraphicsPage } from "./pages/customer/graphics-page";
import { LoginPage } from "./pages/auth/login-page";
import { StudioPage } from "./pages/studio/studio-page";
import { AdminModelsPage } from "./pages/admin/models-page";

export const router = createBrowserRouter([
  { path: "/", element: <Navigate to="/customer/models" replace /> },
  { path: "/auth/login", element: <LoginPage /> },
  { path: "/customer/models", element: <CustomerModelsPage /> },
  { path: "/customer/graphics", element: <CustomerGraphicsPage /> },
  {
    element: <ProtectedRoute />,
    children: [
      { path: "/studio", element: <StudioPage /> },
      {
        element: <ProtectedRoute allowedRoles={["ADMIN"]} />,
        path: "/admin",
        children: [{ path: "models", element: <AdminModelsPage /> }],
      },
    ],
  },
]);