export interface ILogin {
    email: string,
    password: string
}

export interface IUser {
    roleId: number,
    hospitalId: string,
    email: string,
    password: string,
    fullName: string,
    avatar: string,
    language: string,
    isshow: boolean,
    code: string
}
