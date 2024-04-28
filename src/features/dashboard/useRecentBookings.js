import { subDays } from "date-fns";
import { useSearchParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { getBookingsAfterDate } from "../../services/apiBookings";

function useRecentBookings() {
    const [searchParams] = useSearchParams();
    const numDays = !searchParams.get("last")
        ? 7
        : Number(searchParams.get("last"));
    const queryDate = subDays(new Date(), numDays).toISOString();

    const { isLoading: isLoadingBookings, data: recentBookings } = useQuery({
        queryKey: ["bookings", numDays],
        queryFn: () => getBookingsAfterDate(queryDate),
    });

    return { isLoadingBookings, recentBookings };
}

export default useRecentBookings;
