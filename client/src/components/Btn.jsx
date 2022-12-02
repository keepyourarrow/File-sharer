import { cloneElement } from "react";

import Loading from "./Loading";

const Btn = ({ error, isSuccess, isLoading, icon, classNames="", onClick }) => {

	let color = 'gray';

	if ( error ) {
		color = 'red';
	} else if ( isSuccess ) {
		color = 'green';
	}

    return (
		<button className={`submit-btn ${classNames}`} onClick={onClick}>
			{isLoading ? (
				<div className="submit-btn-loader-wrapper">
					<Loading size={25} />
				</div>
			) : (
				cloneElement(icon, { color })
			)}
		</button>
    );
};

export default Btn;
