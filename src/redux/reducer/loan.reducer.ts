import { ILoan } from "../../website/page/Loan/Loan.interface";
import { SET_LOAN } from "../action/loan.action";

const INITIAL_STATE: ILoan = {
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
};

const loanReducer = (state = INITIAL_STATE, action: { type: string; payload: ILoan }) => {
	switch (action.type) {
		case SET_LOAN:
			return { ...state, ...action.payload };
		default:
			return state;
	}
};

export default loanReducer;
