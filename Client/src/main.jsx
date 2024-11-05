import React from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import App from "./App.jsx";
import "./index.css";
import AuthProvider from "./AuthContex/AuthProvider.jsx";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Signin from "./Shared/Signin.jsx";
import SignUp from "./Shared/SignUp.jsx";
import Daily_Balance_Entry from "./Balance Entry/Daily_Balance_Entry.jsx";
import BalanceReport from "./Report/BalanceReport";
import AdminRoute from "./Routes/AdminRoute.jsx";
import PrivateRoute from "./Routes/PrivateRoute.jsx";
import Account from "./Account/Account.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Signin />,
  },
  {
    path: "/signup",
    element: <SignUp />,
  },

  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/balanceEntry",
        element: (
          <AdminRoute>
            <PrivateRoute>
              <Daily_Balance_Entry />
            </PrivateRoute>
          </AdminRoute>
        ),
      },
      {
        path: "/account",
        element: (
          <PrivateRoute>
            <Account />
          </PrivateRoute>
        ),
      },
      {
        path: "/balanceReport",
        element: (
          <PrivateRoute>
            <BalanceReport></BalanceReport>
          </PrivateRoute>
        ),
      },
    ],
  },
]);

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <AuthProvider>
      <QueryClientProvider client={queryClient}>
        <RouterProvider router={router} />
      </QueryClientProvider>
    </AuthProvider>
  </React.StrictMode>
);
