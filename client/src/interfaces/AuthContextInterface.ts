export interface AuthContextInterface {
	isAuthenticated: boolean;
	login: (email: string, password: string) => void;
	logout: () => void;
	// register: (email: string, password: string, name: string) => Promise<string>;
	register: (email: string, password: string, name: string) => void;
	checkToken: () => void;
}
