import "./Confirm.scss";

export default function Confirm(props: { cancel: Function; confirm: Function }) {
	return (
		<div className="confirm">
			<div className="confirm__body">
				<span className="confirm__title">Tem certeza que deseja remover?</span>

				<ul className="confirm__action">
					<li className="confirm__action__item">
						<button className="button" onClick={() => props.cancel()}>
							cancelar
						</button>
					</li>
					<li className="confirm__action__item">
						<button className="button" onClick={() => props.confirm()}>
							confirmar
						</button>
					</li>
				</ul>
			</div>
		</div>
	);
}
