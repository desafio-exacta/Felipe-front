import { useNavigate } from "react-router-dom";
import "./Header.scss";

export default function Header() {
	const navigate = useNavigate();

	return (
		<div className="header">
			<div className="header__container container">
				<ul className="header__menu">
					<li className="header__menu__item">
						<a onClick={() => navigate("/emprestimo")} className="header__menu__link">
							INICIO
						</a>
					</li>
					<li className="header__menu__item">
						<a href="#" className="header__menu__link">
							COMO FUNCIONA
						</a>
					</li>
					<li className="header__menu__item">
						<a href="#" className="header__menu__link">
							PRIVACIDADE
						</a>
					</li>
					<li className="header__menu__item">
						<a href="#" className="header__menu__link">
							AJUDA
						</a>
					</li>
				</ul>
			</div>
		</div>
	);
}
