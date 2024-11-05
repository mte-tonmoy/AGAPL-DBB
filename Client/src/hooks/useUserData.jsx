import { useQuery } from "@tanstack/react-query";
import useAuth from "./useAuth";
import useAxiosSecure from "./useAxiosSecure";

const useUserData = () => {
  const { user, loading } = useAuth();
  const [axiosSecure] = useAxiosSecure();
  const { refetch, data: userData = [] } = useQuery({
    queryKey: ["userData", user?.email],
    enabled: !loading,
    queryFn: async () => {
      const res = await axiosSecure(`/userData?email=${user?.email}`);
      console.log("res from axios", res);
      return res.data;
    },
  });

  return [userData, refetch];
};
export default useUserData;
