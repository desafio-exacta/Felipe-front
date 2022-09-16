import { IStep } from "../../website/component/Step/Step.interface";
import { SET_STEP_BY_SLUG } from "../action/step.action";

const INITIAL_STATE: IStep[] = [
	{ slug: "simulation", label: "SIMULE", title: "SIMULE", valid: true, selected: true },
	{ slug: "personal_data", label: "PREENCHA O CADASTRO", title: "DADOS PESSOAIS", valid: false, selected: false },
	{ slug: "summary", label: "REVISE SEU PEDIDO", title: "REVISE SEU PEDIDO", valid: false, selected: false },
	{ slug: "finish", label: "FINALIZE SEU PEDIDO", title: "FINALIZE SEU PEDIDO", valid: false, selected: false },
];

const stepReducer = (state = INITIAL_STATE, action: { type: string; payload: IStep }) => {
	switch (action.type) {
		case SET_STEP_BY_SLUG:
			return state.map((step) =>
				step.slug === action.payload.slug ? { ...step, ...action.payload } : step
			);
		default:
			return state;
	}
};

export default stepReducer;
