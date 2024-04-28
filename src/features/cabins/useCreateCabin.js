import { useQueryClient, useMutation } from "@tanstack/react-query";
import { toast } from "react-hot-toast";
import { createEditCabin } from "../../services/apiCabins";

function useCreateCabin() {
    const queryClient = useQueryClient();
    const { mutate: createCabin, isPending: isCreating } = useMutation({
        mutationFn: createEditCabin,
        onSuccess: () => {
            toast.success("Create cabin successfully");
            queryClient.invalidateQueries({
                queryKey: ["cabin"],
            });
        },
        onError: () => {
            toast.error("Create cabin failed");
        },
    });
    return { createCabin, isCreating };
}

export default useCreateCabin;
