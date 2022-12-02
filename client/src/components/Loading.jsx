import { ClipLoader } from "react-spinners";

const Loading = ({size=75}) => {
    return (
        <div>
            <ClipLoader color="#36d7b7" size={size} />
        </div>
    );
};

export default Loading;
