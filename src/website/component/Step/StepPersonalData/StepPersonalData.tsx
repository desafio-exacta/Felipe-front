import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import "./StepPersonalData.scss";
import InputMask from "react-input-mask";
import dispatchingAgencies from "../dispatchingAgencies.json";
import http from "../../../service/http";
import { ILoan } from "../../../page/Loan/Loan.interface";
import { IStep } from "../Step.interface";
import { IStore } from "../../../../redux/store.interface";
import Loader from "../../Loader/Loader";

export default function StepPersonalData() {
	const [isFormSubmitted, setIsFormSubmitted] = useState<boolean>(false);
	const steps: IStep[] = useSelector((state: IStore) => state.stepReducer);
	const loan: ILoan = useSelector((state: IStore) => state.loanReducer);
	const dispatch = useDispatch();
	const [loader, setLoader] = useState<boolean>(false);

	const handleFieldBySlug = (e: any, key: string) =>
		dispatch({ type: "SET_LOAN", payload: { ...loan, [key]: e.target.value } });

	const handleGenderToggler = (value: string) => {
		value = loan.gender === value ? "" : value;
		dispatch({ type: "SET_LOAN", payload: { ...loan, gender: value } });
	};

	const isFormValid = () => {
		const { rg, issued_on, dispatching_agency, gender } = loan;
		return (
			rg.trim().replace(/[^0-9]/g, "").length === 8 &&
			issued_on.replace(/[^0-9]/g, "").trim().length === 8 &&
			dispatching_agency.trim().length &&
			dispatchingAgencies.find((item) => item.value === dispatching_agency.trim()) &&
			["male", "female"].includes((gender || "").trim())
		);
	};

	const handleFormSubmit = async (e: any) => {
		e.preventDefault();
		setIsFormSubmitted(true);

		if (!isFormValid()) return;

		setLoader(true);

		const form = {
			rg: loan.rg.replace(/[^0-9]/g, ""),
			issued_on: loan.issued_on.replace(/[^0-9]/g, ""),
			dispatching_agency: loan.dispatching_agency,
			gender: loan.gender,
		};

		http.put(`loan/${loan.id}`, { ...loan, ...form })
			.then((res) => res.json())
			.then((res: ILoan) => {
				dispatch({ type: "SET_LOAN", payload: res });
				dispatch({
					type: "SET_STEP_BY_SLUG",
					payload: { slug: "personal_data", valid: true, selected: false },
				});
				dispatch({ type: "SET_STEP_BY_SLUG", payload: { slug: "summary", selected: true } });
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
				<form className="step_personal_data" onSubmit={handleFormSubmit}>
					<div className="step_personal_data__container container sm">
						<span className="step_personal_data__title">DADOS PESSOAIS</span>
						<div className="step_personal_data__row">
							<div className="step_personal_data__column">
								<div
									className={`input ${
										loan.rg.trim().replace(/[^0-9]/g, "").length === 8 ? `` : `invalid`
									}`}
								>
									<span className="input__feedback"></span>
									<InputMask
										mask="9999999-9"
										className="input__field"
										id="rg"
										value={loan.rg}
										onChange={(e: any) => handleFieldBySlug(e, "rg")}
									/>
									<label htmlFor="rg" className="input__label">
										NÚMERO DO RG
									</label>
								</div>
							</div>
							<div className="step_personal_data__column">
								<div
									className={`input ${
										loan.issued_on.replace(/[^0-9]/g, "").trim().length === 8 ? `` : `invalid`
									}`}
								>
									<span className="input__feedback"></span>
									<InputMask
										mask="99/99/9999"
										className="input__field"
										id="issued_on"
										value={loan.issued_on}
										onChange={(e: any) => handleFieldBySlug(e, "issued_on")}
									/>
									<label htmlFor="issued_on" className="input__label">
										DATA DE EMISSÃO
									</label>
								</div>
							</div>
							<div className="step_personal_data__column">
								<div
									className={`select ${
										loan.dispatching_agency.trim().length &&
										dispatchingAgencies.find(
											(item) => item.value === loan.dispatching_agency.trim()
										)
											? ``
											: `invalid`
									}`}
								>
									<span className="select__feedback"></span>
									<select
										id="dispatching_agency"
										className="select__field"
										value={loan.dispatching_agency}
										onChange={(e: any) => handleFieldBySlug(e, "dispatching_agency")}
									>
										{dispatchingAgencies.length &&
											dispatchingAgencies.map((item) => (
												<option key={item.value} value={item.value}>
													{item.label}
												</option>
											))}
									</select>
									<label htmlFor="dispatching_agency" className="select__label">
										ORGÃO EXPEDIDOR
									</label>
								</div>
							</div>
						</div>
						<div className="step_personal_data__row">
							<div className="step_personal_data__column">
								<div className="checkbox">
									<input
										type="checkbox"
										className="checkbox__field"
										name="gender"
										id="gender_female"
										value="female"
										checked={loan.gender === `female`}
										onChange={(e: any) => handleGenderToggler("female")}
									/>
									<label htmlFor="gender_female" className="checkbox__option">
										FEMININO
									</label>

									<input
										type="checkbox"
										className="checkbox__field"
										name="gender"
										id="gender_male"
										value="male"
										checked={loan.gender === `male`}
										onChange={(e: any) => handleGenderToggler("male")}
									/>
									<label htmlFor="gender_male" className="checkbox__option">
										MASCULINO
									</label>

									<span className="checkbox__label">SEXO</span>
								</div>
							</div>
						</div>
						<div className="step_personal_data__row">
							<div className="step_personal_data__column">
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
