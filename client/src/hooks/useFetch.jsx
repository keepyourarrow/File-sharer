import { useEffect, useState } from "react";

const useFetch = (action = null, onSuccess = null, onError, skip = false, ...args) => {
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);
    const [refetchIndex, setRefetchIndex] = useState(0);

    const refetch = () => {
        setRefetchIndex(prev => prev + 1);
    }

    const handleError = (err) => {
        setError(err.message);
        setIsLoading(false);
        setIsSuccess(false);

        if (onError) {
            onError(err);
        }
    };

    const handleSuccess = (newData) => {
        setIsLoading(false);
        setIsSuccess(true);
        // reset success
        setTimeout(() => {
            setIsSuccess(false);
        }, 1500)
        if (onSuccess) {
            onSuccess(newData);
        }
    };

    useEffect(() => {
        if (skip) {
            return;
        }

        setError(null);
        setIsLoading(true);
        setIsSuccess(false);

        let abortController = new AbortController();

        // args is body
        action(handleSuccess, handleError, abortController.signal, ...args);

        return () => {
            console.log("abort");
            abortController.abort();
        };
    }, [action, skip, refetchIndex]);

    return {
        error,
        isLoading,
        isSuccess,
        refetch
    };
};

export default useFetch;
