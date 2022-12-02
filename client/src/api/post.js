import fetch from "../lib/fetch";

export const upload = (onSuccess, onError, signal, images=[]) => {
    if ( images.length == 0 ) {
        return;
    }

    const handleError = (err, reject) => {
        console.log('error uploading', err);
        onError(err);
        reject(err);
    }
    console.log('upload before promiseall');

    // loop with promises
    Promise.all(images.map((image, i) => {
        return new Promise(async (resolve, reject) => {
            await fetch("upload", "POST", () => resolve(), (err) => handleError(err, reject), signal, {image});
        })
    })).then(() => {
        console.log('uploaded');
        onSuccess()
    })
    .catch(err => {
        console.log('err',err);
    })

}