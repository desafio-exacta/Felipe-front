const baseAPI = "https://63236fab5c1b43572795ea1c.mockapi.io/api/v1";

const http = {
	get: async (endpoint: string) => {
		return await fetch(`${baseAPI}/${endpoint}`);
	},
	post: async (endpoint: string, body: any) => {
		return await fetch(`${baseAPI}/${endpoint}`, {
			method: "post",
			body: JSON.stringify(body),
			headers: {
				Accept: "application/json",
				"Content-Type": "application/json",
			},
		});
	},
	put: async (endpoint: string, body: any) => {
		return await fetch(`${baseAPI}/${endpoint}`, {
			method: "put",
			body: JSON.stringify(body),
			headers: {
				Accept: "application/json",
				"Content-Type": "application/json",
			},
		});
	},
	delete: async (endpoint: string) => {
		return await fetch(`${baseAPI}/${endpoint}`, {
			method: "delete",
			headers: {
				Accept: "application/json",
				"Content-Type": "application/json",
			},
		});
	},
};

export default http;
