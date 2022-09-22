export class AuthService {
  loggedIn = false;

  isAuthenticated() {
   return new Promise(
      (res, rej) => {
        setTimeout(() => {
          res(this.loggedIn);
        }, 800);
      }
    );
  }

  login() {
    this.loggedIn = true;
    return this.loggedIn;
  }

  logout() {
    this.loggedIn = false;
    return this.loggedIn;
  }
}
