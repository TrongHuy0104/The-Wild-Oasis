import useUser from "../features/authentication/useUser";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import Spinner from "./Spinner";
import { useEffect } from "react";

const FullPage = styled.div`
    height: 100vh;
    background-color: var(--color-grey-50);
    display: flex;
    align-items: center;
    justify-content: center;
`;

function ProtectedRoutes({ children }) {
    // 1. Load the authenticated user
    const { isLoading, isAuthenticated } = useUser();
    const navigate = useNavigate();
    // 3. If NO user, redirect to the login
    useEffect(() => {
        if (!isAuthenticated && !isLoading) {
            navigate("/login");
        }
    }, [isAuthenticated, isLoading, navigate]);

    // 2. While loading show s spinner
    if (isLoading)
        return (
            <FullPage>
                <Spinner />
            </FullPage>
        );

    // If there is a user, render the app
    if (isAuthenticated) return children;
}

export default ProtectedRoutes;
