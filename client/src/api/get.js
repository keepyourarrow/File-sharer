import fetch from "../lib/fetch";
import { b64toBlob } from "../utils";

export const getFiles = (onSuccess, ...args) => {
    const handleSuccess = (files) => {
        const newHashes = {}; // to easier access ids (for deletion)
        const newFiles = files.map(({src,id}, index) => {
            newHashes[index] = id;
            return URL.createObjectURL(b64toBlob(src))
        })

        onSuccess({newFiles, newHashes});
    }

    fetch("files", "GET", handleSuccess, ...args);
}