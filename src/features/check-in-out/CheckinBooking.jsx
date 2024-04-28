import styled from "styled-components";
import BookingDataBox from "../../features/bookings/BookingDataBox";

import Row from "../../ui/Row";
import Heading from "../../ui/Heading";
import ButtonGroup from "../../ui/ButtonGroup";
import Button from "../../ui/Button";
import ButtonText from "../../ui/ButtonText";

import { useMoveBack } from "../../hooks/useMoveBack";
import useBooking from "../bookings/useBooking";
import Spinner from "../../ui/Spinner";
import Checkbox from "../../ui/Checkbox";
import { useEffect, useState } from "react";
import useCheckin from "./useCheckin";
import { formatCurrency } from "../../utils/helpers";
import useSettings from "../settings/useSettings";

const Box = styled.div`
    /* Box */
    background-color: var(--color-grey-0);
    border: 1px solid var(--color-grey-100);
    border-radius: var(--border-radius-md);
    padding: 2.4rem 4rem;
`;

function CheckinBooking() {
    const moveBack = useMoveBack();
    const { isLoading: isLoadingBooking, booking } = useBooking();
    const { checkIn, isCheckingIn } = useCheckin();
    const { settings, isLoading: isLoadingSettings } = useSettings();

    const [confirmPaid, setConfirmPaid] = useState(false);
    const [addBreakfast, setAddBreakfast] = useState(false);
    useEffect(() => {
        if (booking) setConfirmPaid(booking.isPaid);
    }, [booking]);

    if (isLoadingBooking || isLoadingSettings) return <Spinner />;

    const {
        id: bookingId,
        guests,
        totalPrice,
        numGuests,
        hasBreakfast,
        numNights,
    } = booking;

    const { breakfastPrice } = settings;
    const optionalBreakfastPrice = breakfastPrice * numGuests * numNights;

    function handleCheckin() {
        if (!confirmPaid) return;

        if (addBreakfast) {
            checkIn({
                bookingId,
                breakfast: {
                    hasBreakfast: true,
                    extrasPrice: optionalBreakfastPrice,
                    totalPrice: totalPrice + optionalBreakfastPrice,
                },
            });
        } else {
            checkIn({ bookingId });
        }
    }

    return (
        <>
            <Row type="horizontal">
                <Heading as="h1">Check in booking #{bookingId}</Heading>
                <ButtonText onClick={moveBack}>&larr; Back</ButtonText>
            </Row>

            <BookingDataBox booking={booking} />

            {!hasBreakfast && (
                <Box>
                    <Checkbox
                        checked={addBreakfast}
                        onChange={() => {
                            setAddBreakfast(!addBreakfast);
                            setConfirmPaid(false);
                        }}
                        id="add-breakfast"
                    >{`Do you want to add breakfast for ${formatCurrency(
                        breakfastPrice
                    )}`}</Checkbox>
                </Box>
            )}

            <Box>
                <Checkbox
                    checked={confirmPaid || isCheckingIn}
                    onChange={() => setConfirmPaid(!confirmPaid)}
                    id="confirm-paid"
                    disabled={confirmPaid}
                >{`I confirm that ${
                    guests.fullName
                } has paid the total amount with ${
                    !addBreakfast
                        ? formatCurrency(totalPrice)
                        : `${formatCurrency(
                              totalPrice + optionalBreakfastPrice
                          )} (${formatCurrency(totalPrice)} + ${formatCurrency(
                              optionalBreakfastPrice
                          )})`
                }`}</Checkbox>
            </Box>

            <ButtonGroup>
                <Button
                    onClick={handleCheckin}
                    disabled={!confirmPaid || isCheckingIn}
                >
                    Check in booking #{bookingId}
                </Button>
                <Button variation="secondary" onClick={moveBack}>
                    Back
                </Button>
            </ButtonGroup>
        </>
    );
}

export default CheckinBooking;
