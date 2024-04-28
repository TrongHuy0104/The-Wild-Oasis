import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import { signIn as signInApi } from "../../services/apiAuth";

function useSignIn() {
    const queryClient = useQueryClient();
    const navigate = useNavigate();
    const { isPending: isLoadingSignIn, mutate: signIn } = useMutation({
        mutationFn: ({ email, password }) => signInApi({ email, password }),
        onSuccess: (user) => {
            queryClient.setQueryData(["user"], user.user);
            navigate("/dashboard", { replace: true });
        },
        onError: (err) => {
            console.error(err);
            toast.error("Provider password or email is incorrect");
        },
    });

    return { isLoadingSignIn, signIn };
}

export default useSignIn;
