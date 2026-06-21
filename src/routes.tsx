import { createBrowserRouter, Navigate } from "react-router-dom";
import { ProtectedRoute } from "./components/protected-route";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Navigate to="/shop" replace />, //vai pra vitreine
  },
  {
    path: "/auth/login",
    element: <div>Página de Login (Vamos construir depois)</div>,
  },
  {
    path: "/shop",
    element: <div>Vitrine da Loja (Área Pública)</div>,
  },
  {
    element: <ProtectedRoute />,
    children: [
      {
        path: "/studio",
        element: <div>Estúdio de Personalização (Área Logada)</div>,
      },
      {
        element: <ProtectedRoute allowedRoles={["ADMIN"]} />,
        path: "/admin",
        children: [
          {
            path: "",
            element: <div>Dashboard Administrativo</div>,
          },
          {
            path: "customizables",
            element: <div>Gestão de Produtos Personalizáveis</div>,
          },
          {
            path: "graphics",
            element: <div>Gestão de Estampas</div>,
          }
        ]
      }
    ]
  }
]);