import fetch from "../lib/fetch";

export const deleteFiles = (onSuccess, onError, signal, images=[]) => {
    if ( images.length == 0 ) {
        return;
    }

    fetch("delete", "DELETE", onSuccess, onError, signal, {images});
}
