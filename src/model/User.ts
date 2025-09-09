export enum UserRole {
    "User",
    "Admin"
}

export interface IDisplayUser {
    id?: string, // PSQL uuid
    email: string, // Unique
    first_name: string,
    last_name: string,
    middle_name?: string,
    birthday: Date,
    role?: UserRole, // default "User"
    status?: boolean, // True = active, False = inactive
}

export interface IUser extends IDisplayUser {
    password: string,
    version?: number,
} // username: string,