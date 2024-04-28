import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateBooking } from "../../services/apiBookings";
import { toast } from "react-hot-toast";

function useCheckout() {
    const queryClient = useQueryClient();
    const { mutate: checkOut, isPending: isCheckingOut } = useMutation({
        mutationFn: (bookingId) =>
            updateBooking(bookingId, {
                status: "checked-out",
            }),
        onSuccess: (data) => {
            toast.success(`Booking #${data.id} successfully checked out`);
            queryClient.invalidateQueries({ active: true });
        },
        onError: (err) => toast.error(err.message),
    });
    return { checkOut, isCheckingOut };
}

export default useCheckout;
