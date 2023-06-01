'use client';

import { useEffect } from "react";
import EmptyState from "./components/EmptyState";

interface ErrorStateProps {
    error : Error
}

const ErrorPage = ({
    error
} : ErrorStateProps) => {
    useEffect(() => {
     console.error(error);
    }, [error])

return (
    <EmptyState title="Oops!" subtitle="Something went wrong!" />

)

}

export default ErrorPage;