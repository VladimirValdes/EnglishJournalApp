export interface RenewToken {
  token: string;
  refreshToken: string;
  user:  User;
}


export interface RefreshToken {
  token:        string;
  refreshToken: string;
}

export interface User {
  name:   string;
  email:  string;
  role:   string;
  status: boolean;
  uid:    string;
}
