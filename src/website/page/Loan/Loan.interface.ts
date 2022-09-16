export interface ILoan {
	id: string | number | null;
	_id: string;
	name: string;
	cpf: string;
	cash_need: number | null;
	parcel: number | null;
	reason: string;
	rg: string;
	issued_on: string;
	dispatching_agency: string;
	gender: Gender | null;
}

export enum Gender {
	male = "male",
	femalke = "female",
}
