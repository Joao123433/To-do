export interface AuthContextInterface {
	isAuthenticated: boolean;
	login: (email: string, password: string) => void;
	logout: () => void;
}
