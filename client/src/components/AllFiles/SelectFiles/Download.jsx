import Btn from "@components/Btn";

import DownloadIcon from "@assets/icons/DownloadIcon";

import { saveZip } from "@utils";

const Download = ({files}) => {

    const handleSubmit = () => {
        if (files.length > 0) {
            saveZip(files);
        }
    };

    return <Btn classNames="select-files-btn" onClick={handleSubmit} icon={<DownloadIcon />} />;
};

export default Download;
