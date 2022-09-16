// import { ITask } from "../../component/Task/Task.interface";

import { IStep } from "../../website/component/Step/Step.interface";

const SET_STEP_BY_SLUG = "SET_STEP_BY_SLUG";

const stepAction = {
	set: (payload: IStep) => ({ type: SET_STEP_BY_SLUG, payload }),
};

export { SET_STEP_BY_SLUG, stepAction };
