const Error = ({ error }) => {
    return (
        <div className="error-wrapper">
            <span className="error">{JSON.stringify(error)}</span>
        </div>
    );
};

export default Error;
