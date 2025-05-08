interface ICreateUserDTO {
  name: string;
  password: string;
  email: string;
  phone?: string;
  id?: string;
}

export { ICreateUserDTO };
