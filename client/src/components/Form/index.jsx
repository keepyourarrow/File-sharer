import './index.css';

import { useState, useEffect } from "react";

import Uploader from "./Uploader";
import FilesViewer from "../FilesViewer";

const Form = () => {
	const [files, setFiles] = useState([]);

    return (
        <div>
            <Uploader setFiles={setFiles} />

			{files.length > 0 && (
				<FilesViewer files={files} isSmall />
			)}
        </div>
    );
};

export default Form;
