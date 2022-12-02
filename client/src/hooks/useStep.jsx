import {useState, useEffect} from 'react';

const useStep = (elements) => {
    const [currentIndex, setCurrentIndex] = useState(0);


    const handleOnClick = () => {
        setCurrentIndex(prev => {
            if ( prev <= 0 ) return 1;
            return 0;
        })
    }

    const getAction = () => {
        const value = currentIndex == 0 ? "Upload files" : "View files";

        return <button type="button" onClick={handleOnClick}>
            {value}
        </button>
    };

    return ({
        action: getAction(),
        step: elements[currentIndex]
    });
};

export default useStep;