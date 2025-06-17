export interface User extends NewUser {
  id: number;
}

export interface NewUser {
  name: string;
  gender: string;
}
