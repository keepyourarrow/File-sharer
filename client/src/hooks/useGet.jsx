import { useEffect, useRef } from "react";
import useFetch from "./useFetch";

const useGet = (action, callback) => {
    const updateRef = useRef(true);
    const firstRender = useRef(true);

    const { error, isLoading, isSuccess, refetch } = useFetch(action, callback);


    return { error, isLoading, isSuccess, refetch };
};

export default useGet;
