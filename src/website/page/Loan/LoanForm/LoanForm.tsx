import { useParams } from "react-router-dom";
import Step from "../../../component/Step/Step";

export default function LoanForm() {
	const { id } = useParams();

	return <Step id={id || ""} />;
}
