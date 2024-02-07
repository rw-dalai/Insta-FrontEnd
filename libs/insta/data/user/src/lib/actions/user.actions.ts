export interface UserRegistrationCommand {
	email: string;
	password: string;
	firstName: string;
	lastName: string;
}

export interface UserLoginCommand {
	email: string;
	password: string;
}
