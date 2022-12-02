const FilesViewer = ({ files, isSmall = false, numberOfSelected = 0 }) => {
    return (
        <div className={`all-files ${isSmall ? "small" : ""}`}>
            {files.map((file, index) => {
				let classNames = 'all-files-item';

				if ( isSmall ) {
					classNames += " small";
				}

				if ( index + 1 <= numberOfSelected ) {
					classNames += " selected";
				}

                return (
                    <div
                        key={index}
                        className={classNames}
                    >
                        <img src={file} alt={`image-${index}`} />
                    </div>
                );
            })}
        </div>
    );
};

export default FilesViewer;
