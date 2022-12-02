import { useState, useEffect } from "react";
import usePost from "@hooks/usePost";

import Btn from "@components/Btn";

import DeleteIcon from "@assets/icons/DeleteIcon";

import { deleteFiles } from "@api/delete";

const Delete = ({ setDeleteError, selectedIds, setSelectedIds, onSuccessDelete }) => {
    const [submitData, setSubmitData] = useState(null);
    const { error, isLoading } = usePost(deleteFiles, submitData, setSubmitData, () => {
        setSelectedIds([]);
        onSuccessDelete();
    },);

    const handleSubmit = () => {
        if (selectedIds.length > 0) {
            setSubmitData(selectedIds);
        }
    };

    useEffect(() => {
        setDeleteError(error);
    },[error])

    return (
        <Btn
            error={error}
            isLoading={isLoading}
            classNames="select-files-btn"
            icon={<DeleteIcon />}
            onClick={handleSubmit}
        />
    );
};

export default Delete;
