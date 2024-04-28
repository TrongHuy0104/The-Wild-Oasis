import { subDays } from "date-fns";
import { useSearchParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { getStaysAfterDate } from "../../services/apiBookings";

function useRecentStays() {
    const [searchParams] = useSearchParams();
    const numDays = !searchParams.get("last")
        ? 7
        : Number(searchParams.get("last"));
    const queryDate = subDays(new Date(), numDays).toISOString();

    const { isLoading: isLoadingStays, data: recentStays } = useQuery({
        queryKey: ["stays", numDays],
        queryFn: () => getStaysAfterDate(queryDate),
    });

    const confirmedStays = recentStays?.filter(
        (stay) => stay.status === "checked-in" || "checked-out"
    );

    return { isLoadingStays, recentStays, confirmedStays, numDays };
}

export default useRecentStays;
