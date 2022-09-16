import { useSelector } from "react-redux";
import { IStore } from "../../../../redux/store.interface";
import { ILoan } from "../../../page/Loan/Loan.interface";
import "./StepHeader.scss";

export default function StepHeader(props: any) {
	const loan: ILoan = useSelector((state: IStore) => state.loanReducer);

	return (
		<div className="step_header">
			<div className="step_header__container container md">
				<div className="step_header__row">
					<div className="step_header__column">
						<span className="step_header__title">ME CHAMO:</span>
						<span className="step_header__text">{loan.name || "NOME COMPLETO"}</span>
						<span className="step_header__extra">
							<span className="step_header__extra__title">CPF:</span>
							<span className="step_header__extra__text">{loan.cpf || "000.000.000-00"}</span>
						</span>
					</div>
					<div className="step_header__column">
						<span className="step_header__title">PRECISO DE:</span>
						<span className="step_header__text">R$ {loan.cash_need || "0"}</span>
					</div>
					<div className="step_header__column">
						<span className="step_header__title">QUERO PAGAR EM:</span>
						<span className="step_header__text">{loan.parcel} VEZES</span>
					</div>
					<div className="step_header__column">
						<span className="step_header__title">PARA: </span>
						<span className="step_header__text">{loan.reason || "MOTIVO DO EMPRÉSTIMO"}</span>
					</div>
				</div>
			</div>
		</div>
	);
}
