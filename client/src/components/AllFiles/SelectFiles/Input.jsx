import { useEffect, useState } from "react";

const Input = ({ fileNameHashes, selectedIds, setSelectedIds }) => {
    const [input, setInput] = useState("");

    const handleChange = (e) => {
        const value = e.target.value;

        if (value >= 0) {
            const selected = [];
            for (let i = 0; i < value; i++) {
                if (fileNameHashes[i]) {
                    selected.push(fileNameHashes[i]);
                }
            }

            setSelectedIds(selected);
        }
    };

    useEffect(() => {
        setInput(selectedIds.length > 0 ? selectedIds.length : "");
    },[selectedIds.length])

    return (
        <div>
            <input
                className="select-files-input"
                type="number"
                placeholder={0}
                value={input}
                onChange={handleChange}
                pattern="[0-9]*"
            />
        </div>
    );
};

export default Input;
