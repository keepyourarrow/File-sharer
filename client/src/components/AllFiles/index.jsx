import "./index.css";

import { useState,useEffect } from "react";
import useGet from "@hooks/useGet";

import FilesViewer from "../FilesViewer";
import Error from "../Error";
import Loading from "../Loading";
import NoFiles from "./NoFiles";
import SelectFiles from "./SelectFiles";

import { getFiles } from "@api/get";

const AllFiles = () => {
    const [fileNameHashes, setFileNameHashes] = useState({});
    const [files, setFiles] = useState([]);
    const [selectedIds, setSelectedIds] = useState([]);

    const { error, isLoading, refetch } = useGet(getFiles, ({ newFiles, newHashes }) => {
        setFiles(newFiles);
        setFileNameHashes(newHashes);
    });

    const onSuccessDelete = () => {
        refetch();
    }

    if (error) {
        return <Error error={error} />;
    }

    if (isLoading) {
        return <Loading />;
    }

    if (files.length == 0) {
        return <NoFiles />;
    }

    return (
        <div>
            <SelectFiles
                files={files}
                fileNameHashes={fileNameHashes}
                selectedIds={selectedIds}
                setSelectedIds={setSelectedIds}
                onSuccessDelete={onSuccessDelete}
            />
            <FilesViewer files={files} numberOfSelected={selectedIds.length} />
        </div>
    );
};

export default AllFiles;
