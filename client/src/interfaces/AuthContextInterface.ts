export interface AuthContextInterface {
	isAuthenticated: boolean;
	login: () => void;
	logout: () => void;
}
