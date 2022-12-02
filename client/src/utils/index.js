import JSZip from "jszip";
import { saveAs } from 'file-saver';

export const b64toBlob = (b64Data, contentType = "image/jpg", sliceSize = 512) => {
    const byteCharacters = atob(b64Data);
    const byteArrays = [];

    for (let offset = 0; offset < byteCharacters.length; offset += sliceSize) {
        const slice = byteCharacters.slice(offset, offset + sliceSize);

        const byteNumbers = new Array(slice.length);
        for (let i = 0; i < slice.length; i++) {
            byteNumbers[i] = slice.charCodeAt(i);
        }

        const byteArray = new Uint8Array(byteNumbers);
        byteArrays.push(byteArray);
    }

    const blob = new Blob(byteArrays, { type: contentType });
    return blob;
};

export const saveZip = (urls) => {
    if (!urls) return;

    const zip = new JSZip();
    const folder = zip.folder("file-transfer"); // folder name where all files will be placed in

    urls.forEach((url, index) => {
        const blobPromise = fetch(url).then((r) => {
            if (r.status === 200) return r.blob();
            return Promise.reject(new Error(r.statusText));
        });
        folder.file(`${index}-image.jpeg`, blobPromise);
    });


    zip.generateAsync({ type: "blob" }).then((blob) => saveAs(blob, "file-transfer"));
};
