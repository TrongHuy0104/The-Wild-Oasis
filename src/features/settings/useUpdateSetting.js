import { useQueryClient, useMutation } from "@tanstack/react-query";
import { toast } from "react-hot-toast";
import { updateSetting as updateSettingApi } from "../../services/apiSettings";

function useUpdateSetting() {
    const queryClient = useQueryClient();
    const { mutate: updateSetting, isPending: isUpdating } = useMutation({
        mutationFn: updateSettingApi,
        onSuccess: () => {
            toast.success("Update setting successfully");
            queryClient.invalidateQueries({
                queryKey: ["settings"],
            });
        },
        onError: (errors) => {
            toast.error("Update setting failed");
        },
    });
    return { updateSetting, isUpdating };
}

export default useUpdateSetting;
