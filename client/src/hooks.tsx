import { useQuery, useMutation } from "@tanstack/react-query";
import { fetcher, poster, API } from "./axios";
import { useDispatch, useSelector } from "react-redux";
import { signin } from "./slices/auth";
import { authState } from "./App";

export const useAuth = () => {
	const [authToken, setToken] = authState.useState();

	const refreshToken = (token: string) => {
		fetch(`${API}/refresh-token`, {
			headers: {
				Authorization: `Bearer ${token}`,
			},
		})
			.then((res) => res.json())
			.then((data) => {
				if (data.access_token) return setAuthToken(data.access_token);
			});
	};

	const setAuthToken = (newToken: string | null) => {
		setToken(newToken);
		if (!newToken) return localStorage.removeItem("AUTH_TOKEN");
		localStorage.setItem("AUTH_TOKEN", newToken);
	};

	return {
		authToken,
		setAuthToken,
		refreshToken,
	};
};