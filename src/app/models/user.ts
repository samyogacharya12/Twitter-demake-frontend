export interface IUser {
  id?: number;
  name?: string;
  email?: string;
  userName?: string; // Keep userName required
}

export class User implements IUser {
  constructor(
    public id?: number,
    public name?: string,
    public email?: string,
    public userName?: string // userName is required in the constructor
  ) {}
}