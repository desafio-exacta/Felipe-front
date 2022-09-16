import { useState } from "react";
import { useDispatch } from "react-redux";

export default function StepSummary() {
	const dispatch = useDispatch();
	const [loader, setLoader] = useState<boolean>(false);

	const handleFormSubmit = () => {
		dispatch({ type: "SET_STEP_BY_SLUG", payload: { slug: "summary", valid: true, selected: false } });
		dispatch({ type: "SET_STEP_BY_SLUG", payload: { slug: "finish", selected: true } });
	};

	return (
		<div className="step_simulation">
			<div className="step_simulation__container container sm">
				<span className="step_simulation__title">REVISE SEU PEDIDO</span>
				<div className="step_simulation__row">
					<div className="step_simulation__column">
						<button
							className="step_simulation__button button arrow_right"
							onClick={() => handleFormSubmit()}
						>
							CONTINUAR
						</button>
					</div>
				</div>
			</div>
		</div>
	);
}
