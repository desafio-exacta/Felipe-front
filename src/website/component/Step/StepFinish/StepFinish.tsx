import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

export default function StepFinish() {
	const navigate = useNavigate();
	const dispatch = useDispatch();
	const [loader, setLoader] = useState<boolean>(false);

	const handleFormSubmit = () => {
		dispatch({
			type: "SET_LOAN",
			payload: {
				id: null,
				_id: "",
				name: "",
				cpf: "",
				cash_need: null,
				parcel: null,
				reason: "",
				rg: "",
				issued_on: "",
				dispatching_agency: "",
				gender: null,
			},
		});
		dispatch({ type: "SET_STEP_BY_SLUG", payload: { slug: "finish", valid: true, selected: false } });
		dispatch({ type: "SET_STEP_BY_SLUG", payload: { slug: "simulation", selected: true } });
		navigate("/emprestimo");
	};

	return (
		<div className="step_simulation">
			<div className="step_simulation__container container sm">
				<span className="step_simulation__title">FINALIZE SEU PEDIDO</span>
				<div className="step_simulation__row">
					<div className="step_simulation__column">
						<button
							className="step_simulation__button button arrow_right"
							onClick={() => handleFormSubmit()}
						>
							FINALIZAR
						</button>
					</div>
				</div>
			</div>
		</div>
	);
}
