import { useEffect } from "react";
import useFetch from "./useFetch";

const usePost = (action, body, setBody, onSuccess, onError) => {
    const { error, isLoading, isSuccess } = useFetch(action, onSuccess, onError, !body, body);

    useEffect(() => {
        if ( error || isSuccess ) {
            setBody(null);
        }
    }, [error, isSuccess])


    return { error, isLoading, isSuccess };
};

export default usePost;
