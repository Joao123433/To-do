export interface AuthContextInterface {
	isAuthenticated: boolean;
	login: (name: string, password: string) => void;
	logout: () => void;
}
