export interface RenewToken {
  token: string;
  user:  User;
}

export interface User {
  name:   string;
  email:  string;
  role:   string;
  status: boolean;
  uid:    string;
}
