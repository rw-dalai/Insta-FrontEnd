export interface UserRegistrationCommand {
	firstName: string;
	lastName: string;
	email: string;
	password: string;
}

export interface UserLoginCommand {
	email: string;
	password: string;
}
