import {Injectable} from '@angular/core';
import {Router, CanActivate} from '@angular/router';
import {InvalidResponseError, UserService} from './user.service';
import {SnackbarService} from "./snackbar.service";
import {StatusCodes} from "http-status-codes";

@Injectable()
export class AuthGuardService implements CanActivate {
  constructor(public auth: UserService, public router: Router, public snackbar: SnackbarService) {
  }

  async canActivate(): Promise<boolean> {
    if (!this.auth.isAuthenticated()) {
      await this.router.navigate(['login']);
      return false;
    }

    try {
      const userP = this.auth.getUser()
      const stickersP = this.auth.getStickers()
      await userP
      await stickersP
    } catch (e) {
      if (e instanceof InvalidResponseError) {
        if (e.status === StatusCodes.UNAUTHORIZED) {
          await this.router.navigate(["/login"]);
          return false;
        }
      }
      this.snackbar.snackbarErrorHandler(e, new Map([]))
      return false;
    }

    return true;
  }
}
