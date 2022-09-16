import { useDispatch, useSelector } from "react-redux";
import StepHeader from "./StepHeader/StepHeader";
import StepPersonalData from "./StepPersonalData/StepPersonalData";
import StepSimulation from "./StepSimulation/StepSimulation";
import "./Step.scss";
import { useEffect, useState } from "react";
import http from "../../service/http";
import StepFinish from "./StepFinish/StepFinish";
import StepSummary from "./StepSummary/StepSummary";
import { ILoan } from "../../page/Loan/Loan.interface";
import { IStore } from "../../../redux/store.interface";
import { IStep } from "./Step.interface";
import Loader from "../Loader/Loader";

export default function Step(props: { id?: string | number | undefined }) {
	const steps: IStep[] = useSelector((state: IStore) => state.stepReducer);
	const [loader, setLoader] = useState<boolean>(true);
	const dispatch = useDispatch();

	const getActivatedStep = () => {
		return steps.find((step) => step.selected);
	};

	useEffect(() => {
		if (!props.id) {
			return setLoader(false);
		};

		setLoader(true);

		http.get(`loan/${props.id}`)
			.then((res) => res.json())
			.then((res: ILoan) => {
				dispatch({ type: "SET_LOAN", payload: res });
				setLoader(false);
			})
			.catch((error) =>
				alert(`:( \n\nOcorreu um erro em  nossos servidores. Por favor tente novamente mais tarde.`)
			);
	}, []);

	return (
		<>
			{loader ? (
				<Loader />
			) : (
				<div className="step">
					<StepHeader />
					<ul className="step__list">
						<div className="step__list__container container md">
							{steps &&
								steps.map((step) => (
									<li
										className={`step__list__item ${step.valid ? `valid` : ``} ${
											step.selected ? `selected` : ``
										}`}
										key={step.slug}
									>
										{step.label}
									</li>
								))}
						</div>
					</ul>
					<div className="step__body">
						<div className="step__item">
							{getActivatedStep()?.slug === "simulation" && <StepSimulation />}
						</div>
						<div className="step__item">
							{getActivatedStep()?.slug === "personal_data" && <StepPersonalData />}
						</div>
						<div className="step__item">{getActivatedStep()?.slug === "summary" && <StepSummary />}</div>
						<div className="step__item">{getActivatedStep()?.slug === "finish" && <StepFinish />}</div>
					</div>
				</div>
			)}
		</>
	);
}
