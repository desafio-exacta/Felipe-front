import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import "./StepSimulation.scss";
import InputMask from "react-input-mask";
import http from "../../../service/http";
import shared from "../../../service/shared";
import { IStep } from "../Step.interface";
import { ILoan } from "../../../page/Loan/Loan.interface";
import { IStore } from "../../../../redux/store.interface";
import Loader from "../../Loader/Loader";

export default function StepSimulation() {
	const [isFormSubmitted, setIsFormSubmitted] = useState<boolean>(false);
	const steps: IStep[] = useSelector((state: IStore) => state.stepReducer);
	const loan: ILoan = useSelector((state: IStore) => state.loanReducer);
	const dispatch = useDispatch();
	const [loader, setLoader] = useState<boolean>(false);

	const handleFieldBySlug = (e: any, key: string) =>
		dispatch({ type: "SET_LOAN", payload: { ...loan, [key]: e.target.value } });

	const isFormValid = () => {
		const { name, cpf, cash_need, parcel, reason } = loan;

		return (
			name.trim().length &&
			cpf.replace(/[^0-9]/g, "").trim().length === 11 &&
			cash_need?.toString()?.trim().length &&
			parcel?.toString().trim().length &&
			reason.trim().length
		);
	};

	const handleFormSubmit = async (e: any) => {
		e.preventDefault();
		setIsFormSubmitted(true);

		if (!isFormValid()) return;

		setLoader(true);

		const form = {
			name: loan.name,
			cpf: loan.cpf.replace(/[^0-9]/g, ""),
			cash_need: loan.cash_need,
			parcel: loan.parcel,
			reason: loan.reason,
		};

		(() =>
			!loan.id ? http.post(`loan`, { ...form, _id: shared().uid() }) : http.put(`loan/${loan.id}`, { ...form }))()
			.then((res) => res.json())
			.then((res: ILoan) => {
				const { id, name, cpf, cash_need, parcel, reason } = res;
				dispatch({ type: "SET_LOAN", payload: { id, name, cpf, cash_need, parcel, reason } });
				dispatch({ type: "SET_STEP_BY_SLUG", payload: { slug: "simulation", valid: true, selected: false } });
				dispatch({ type: "SET_STEP_BY_SLUG", payload: { slug: "personal_data", selected: true } });
				setLoader(false);
			})
			.catch((error) =>
				alert(`:( \n\nOcorreu um erro em  nossos servidores. Por favor tente novamente mais tarde.`)
			);
	};

	return (
		<>
			{loader ? (
				<Loader />
			) : (
				<form className="step_simulation" onSubmit={handleFormSubmit}>
					<div className="step_simulation__container container sm">
						<span className="step_simulation__title">SIMULE</span>
						<div className="step_simulation__row">
							<div className="step_simulation__column">
								<div className={`input ${loan.name.trim().length ? `` : `invalid`}`}>
									<span className="input__feedback"></span>
									<input
										className="input__field"
										id="name"
										value={loan.name}
										onChange={(e: any) => handleFieldBySlug(e, "name")}
									/>
									<label htmlFor="name" className="input__label">
										NOME COMPLETO
									</label>
								</div>
							</div>
							<div className="step_simulation__column">
								<div
									className={`input ${
										loan.cpf.replace(/[^0-9]/g, "").trim().length === 11 ? `` : `invalid`
									}`}
								>
									<span className="input__feedback"></span>
									<InputMask
										mask="999.999.999-99"
										className="input__field"
										id="cpf"
										value={loan.cpf}
										onChange={(e: any) => handleFieldBySlug(e, "cpf")}
									/>
									<label htmlFor="cpf" className="input__label">
										CPF
									</label>
								</div>
							</div>
							<div className="step_simulation__column">
								<div className={`select ${loan.parcel?.toString().trim().length ? `` : `invalid`}`}>
									<span className="select__feedback"></span>
									<select
										className="select__field"
										id="parcel"
										value={loan.parcel?.toString()}
										onChange={(e: any) => handleFieldBySlug(e, "parcel")}
									>
										<option value="">Selecione</option>
										{Array(12)
											.fill(0)
											.map((_, index) => (
												<option value={index + 1} key={index + 1}>
													{index + 1} parcela{index + 1 > 1 ? `s` : ``}
												</option>
											))}
									</select>
									<label htmlFor="parcel" className="select__label">
										CPF
									</label>
								</div>
							</div>
						</div>
						<div className="step_simulation__row">
							<div className="step_simulation__column">
								<div className={`input ${loan.cash_need?.toString().trim().length ? `` : `invalid`}`}>
									<span className="input__feedback"></span>
									<input
										className="input__field"
										id="cash_need"
										value={loan.cash_need?.toString()}
										onInput={(e: any) => handleFieldBySlug(e, "cash_need")}
									/>
									<label htmlFor="cash_need" className="input__label">
										PRECISO DE
									</label>
								</div>
							</div>
							<div className="step_simulation__column">
								<div className={`input ${loan.reason.trim().length ? `` : `invalid`}`}>
									<span className="input__feedback"></span>
									<input
										className="input__field"
										id="reason"
										value={loan.reason}
										onInput={(e: any) => handleFieldBySlug(e, "reason")}
									/>
									<label htmlFor="reason" className="input__label">
										PARA
									</label>
								</div>
							</div>
						</div>
						<div className="step_simulation__row">
							<div className="step_simulation__column">
								<button
									className="step_simulation__button button arrow_right"
									disabled={!isFormValid() && isFormSubmitted}
								>
									CONTINUAR
								</button>
							</div>
						</div>
					</div>
				</form>
			)}
		</>
	);
}
