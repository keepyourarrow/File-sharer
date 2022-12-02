import "./App.css";

import useStep from "@hooks/useStep";

import AllFiles from "@components/AllFiles";
import Form from "@components/Form";

const App = () => {
    const elements = [<AllFiles />, <Form />];
    const { action, step } = useStep(elements);

    return (
        <div className="app">
            <div className="action">{action}</div>
            {step}
        </div>
    );
};

export default App;
