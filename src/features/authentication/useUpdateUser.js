import { useQueryClient, useMutation } from "@tanstack/react-query";
import { toast } from "react-hot-toast";
import { updateUser as updateUserApi } from "../../services/apiAuth";

function useUpdateUser() {
    const queryClient = useQueryClient();
    const { mutate: updateUser, isPending: isUpdating } = useMutation({
        mutationFn: updateUserApi,
        onSuccess: () => {
            toast.success("Update user successfully");
            queryClient.invalidateQueries({
                queryKey: ["user"],
            });
            // reset();
        },
        onError: (errors) => {
            toast.error("Update user failed");
        },
    });
    return { updateUser, isUpdating };
}

export default useUpdateUser;
