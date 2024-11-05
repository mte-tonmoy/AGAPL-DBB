import { Navigate, useLocation } from "react-router";
import useAuth from "./../hooks/useAuth";
import useAdmin from "./../hooks/useAdmin";

const AdminRoute = ({ children }) => {
  const { user, loading } = useAuth();
  const [isAdmin, isAdminLoading] = useAdmin();

  if (loading || isAdminLoading) {
    return <progress className="progress w-56"></progress>;
  }

  if (user && isAdmin) {
    return children;
  }
  return <Navigate to="/balanceEntry"></Navigate>;
};

export default AdminRoute;
