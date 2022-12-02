import { useState } from "react";
import usePost from "@hooks/usePost";

import Error from "../Error";

import { upload } from "@api/post";
import Btn from "@components/Btn";

import CheckmarkIcon from '@assets/icons/CheckmarkIcon';

const Uploader = ({ setFiles }) => {
    const [filesAsBase64, setFilesAsBase64] = useState([]);
    const [submitData, setSubmitData] = useState(null);

    const { error, isLoading, isSuccess } = usePost(upload, submitData, () => {
        setSubmitData(null);
        setFilesAsBase64([]);
    });

    const getBase64 = (file) => {
        const reader = new FileReader();
        reader.readAsBinaryString(file);
        reader.onload = (e) => setFilesAsBase64((prev) => [...prev, btoa(reader.result)]);
        reader.onerror = function (error) {
            console.log("Error: ", error);
        };
    };

    const handleChange = (e) => {
        const uploadedFiles = Array.from(e.target.files);
        const imagesToDisplay = [];
        setFilesAsBase64([]);

        for (let i in uploadedFiles) {
            const file = uploadedFiles[i];
            if (!["image/png", "image/jpeg"].includes(file.type)) {
                return console.log(`not png or jpg. Got ${file.type} instead`);
            }
            getBase64(file);

            imagesToDisplay.push(URL.createObjectURL(file));
        }
        setFiles(imagesToDisplay);
    };

    const handleUpload = () => {
        if (filesAsBase64.length > 0) {
            setSubmitData(filesAsBase64);
        }
    };

    return (
        <>
            <div className="upload">
                <div className="upload-btn-wrapper">
                    <button className="upload-btn" style={{ color: error ? "red" : "gray" }}>
                        Upload files
                    </button>
                    <input type="file" multiple onChange={handleChange} disabled={isLoading} />
                </div>

                <div className="upload-to-server-btn-wrapper">
                    <Btn error={error} isLoading={isLoading} isSuccess={isSuccess} icon={<CheckmarkIcon/>} onClick={handleUpload} />
                </div>
            </div>
            {error && <Error error={error} />}
        </>
    );
};

export default Uploader;
