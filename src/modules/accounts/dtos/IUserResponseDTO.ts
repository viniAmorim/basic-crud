interface IUserResponseDTO {
  id: string;
  name: string;
  email: string;
  isAdmin: boolean;
  created_at: Date;
}

export { IUserResponseDTO };
