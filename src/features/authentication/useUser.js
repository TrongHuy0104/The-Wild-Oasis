import { useQuery } from "@tanstack/react-query";
import { getCurrentUser } from "../../services/apiAuth";

function useUser() {
    const { isLoading, data: user } = useQuery({
        queryKey: ["user"],
        queryFn: getCurrentUser,
    });

    // console.log(user.role);

    return { isLoading, user, isAuthenticated: user?.role === "authenticated" };
}

export default useUser;
