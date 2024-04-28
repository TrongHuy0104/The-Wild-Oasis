import {
    HiOutlineBriefcase,
    HiOutlineCalendar,
    HiOutlineChartBar,
} from "react-icons/hi";
import Stat from "./Stat";
import { HiOutlineBanknotes } from "react-icons/hi2";
import { formatCurrency } from "../../utils/helpers";

function Stats({ bookings, confirmedStays, numDays, cabinLength }) {
    console.log(numDays, cabinLength);
    const numBookings = bookings.length;
    const sales = bookings.reduce((acc, cur) => acc + cur.totalPrice, 0);
    const checkIns = confirmedStays.length;
    // Occupation : number of checked in nights devide to number of available nights (days * cabin count)
    const occupation =
        confirmedStays.reduce((acc, cur) => acc + cur.numNights, 0) /
        (numDays * cabinLength);
    return (
        <>
            <Stat
                icon={<HiOutlineBriefcase />}
                title="Bookings"
                color="blue"
                value={numBookings}
            />
            <Stat
                icon={<HiOutlineBanknotes />}
                title="Sales"
                color="green"
                value={formatCurrency(sales)}
            />
            <Stat
                icon={<HiOutlineCalendar />}
                title="Check Ins"
                color="indigo"
                value={checkIns}
            />
            <Stat
                icon={<HiOutlineChartBar />}
                title="Occupancy Rate"
                color="yellow"
                value={Math.round(occupation * 100) + "%"}
            />
        </>
    );
}

export default Stats;
