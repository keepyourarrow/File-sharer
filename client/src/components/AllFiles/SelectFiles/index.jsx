import { useState } from "react";

import Delete from "./Delete";
import Download from "./Download";
import Input from "./Input";
import Error from "@components/Error";

const SelectFiles = ({ files, fileNameHashes, selectedIds, setSelectedIds, onSuccessDelete }) => {
    const [deleteError, setDeleteError] = useState(null);
    return (
        <>
            <div className="select-files">
                <Input
                    fileNameHashes={fileNameHashes}
                    selectedIds={selectedIds}
                    setSelectedIds={setSelectedIds}
                />

                <div className="select-files-btn-wrapper">
                    <Download
                        files={files.slice(0, selectedIds.length)}
                        setSelectedIds={setSelectedIds}
                    />
                    <Delete
                        setDeleteError={setDeleteError}
                        selectedIds={selectedIds}
                        setSelectedIds={setSelectedIds}
                        onSuccessDelete={onSuccessDelete}
                    />
                </div>
            </div>
            {deleteError && <Error error={deleteError} />}
        </>
    );
};

export default SelectFiles;
