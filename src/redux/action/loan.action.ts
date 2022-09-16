// import { ITask } from "../../component/Task/Task.interface";

import { ILoan } from "../../website/page/Loan/Loan.interface";

const SET_LOAN = "SET_LOAN";

const loanAction = {
	set: (payload: ILoan) => ({ type: SET_LOAN, payload }),
};

export { SET_LOAN, loanAction };
