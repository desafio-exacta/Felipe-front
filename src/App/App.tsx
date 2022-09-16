import React from "react";
import { Provider } from "react-redux";
import store from "../redux/store";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import "./App.scss";
import Header from "../website/component/Header/Header";
import LoanList from "../website/page/Loan/LoanList/LoanList";
import LoanForm from "../website/page/Loan/LoanForm/LoanForm";

export default function App() {
	return (
		<Provider store={store}>
			<BrowserRouter>
				<Header />
				<Routes>
					<Route path="/emprestimo" element={<LoanList />} />
					<Route path="/emprestimo/novo" element={<LoanForm />} />
					<Route path="/emprestimo/editar/:id" element={<LoanForm />} />
					<Route path="*" element={<Navigate to="/emprestimo" replace />} />
				</Routes>
			</BrowserRouter>
		</Provider>
	);
}
