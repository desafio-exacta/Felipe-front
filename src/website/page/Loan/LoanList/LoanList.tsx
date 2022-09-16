import { useEffect, useState } from "react";
import http from "../../../service/http";
import "./LoanList.scss";
import { useNavigate } from "react-router-dom";
import Loader from "../../../component/Loader/Loader";
import { ILoan } from "../Loan.interface";
import Confirm from "../../../component/Confirm/Confirm";

export default function LoanList() {
	const [loans, setLoans] = useState<any[]>([]);
	const [loader, setLoader] = useState<boolean>(true);
	const navigate = useNavigate();
	const [removingLoan, setRemovingLoan] = useState<ILoan | null>(null);

	useEffect(() => {
		getLoans();
	}, []);

	const getLoans = async () => {
		http.get(`loan`)
			.then((res) => res.json())
			.then((res) => {
				setLoans(res);
				setLoader(false);
			})
			.catch((error) =>
				alert(`:( \n\nOcorreu um erro em  nossos servidores. Por favor tente novamente mais tarde.`)
			);
	};

	const cancel = () => {
		setRemovingLoan(null);
	};

	const confirm = () => {
		setLoader(true);

		http.delete(`loan/${removingLoan?.id}`)
			.then((res) => res.json())
			.then((res) => {
				setRemovingLoan(null);
				getLoans();
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
				<>
					{removingLoan && <Confirm cancel={cancel} confirm={confirm} />}
					<div className="loan_list">
						<div className="loan_list__container container md">
							<span className="loan_list__title">Solicitações de empréstimo</span>
							<button className="button" onClick={() => navigate("/emprestimo/novo")}>
								Nova solicitação
							</button>
							<div className="loan_list__row">
								{loans &&
									loans.map((loan: any) => (
										<div className="loan_list__column" key={loan.id}>
											<div className="loan">
												<span className="loan__name">
													<strong>Nome: </strong>
													{loan.name}
												</span>
												<span className="loan__rg">
													<strong>RG: </strong>
													{loan.rg}
												</span>
												<ul className="loan__action">
													<li className="loan__action__item">
														<button
															className="loan__action__item__button button sm"
															onClick={() => navigate(`/emprestimo/editar/${loan.id}`)}
														>
															editar
														</button>
													</li>
													<li className="loan__action__item">
														<button
															className="loan__action__item__button button sm"
															onClick={() => setRemovingLoan(loan)}
														>
															excluir
														</button>
													</li>
												</ul>
											</div>
										</div>
									))}
							</div>
						</div>
					</div>
				</>
			)}
		</>
	);
}
