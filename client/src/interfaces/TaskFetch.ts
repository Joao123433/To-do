export interface TaskFetch {
	id: string;
	title: string;
	priority: string;
	deadline: Date;
	status: string;
	comment: string;
	finished: boolean;
	row: number;
	createdAt: Date;
	updatedAt: Date;
}
