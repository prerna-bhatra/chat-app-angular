export class IESignup {
  fullname: string | undefined;
  username: string | undefined;
  password: string | undefined;
}

export interface IEUserDetails {
  fullname?: string | undefined;
  username?: string | undefined;
  isLoggedIn?: boolean;
  access_token: string;
}

export interface IEUserData {
  _id: string | undefined;
  fullname?: string | undefined;
  username?: string | undefined;
}
