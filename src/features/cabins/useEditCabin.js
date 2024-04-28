import { useQueryClient, useMutation } from "@tanstack/react-query";
import { toast } from "react-hot-toast";
import { createEditCabin } from "../../services/apiCabins";

function useEditCabin() {
    const queryClient = useQueryClient();
    const { mutate: editCabin, isPending: isEditing } = useMutation({
        mutationFn: ({ newCabinData, id }) => createEditCabin(newCabinData, id),
        onSuccess: () => {
            toast.success("Edit cabin successfully");
            queryClient.invalidateQueries({
                queryKey: ["cabin"],
            });
            // reset();
        },
        onError: (errors) => {
            toast.error("Edit cabin failed");
        },
    });
    return { editCabin, isEditing };
}

export default useEditCabin;
