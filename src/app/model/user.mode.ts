

export class User {

  public name: string;

  public email: string;

  public role: string;

  public img: string;

  public uid: string;

  public token: string;

  public refreshToken: string;

  constructor(uid: string, img: string, name: string, email: string, role: string, token: string, refreshToken: string) {
    this.uid = uid;
    this.img = img;
    this.name = name;
    this.email = email;
    this.role = role;
    this.token = token;
    this.refreshToken = refreshToken;
  }
}