import { Injectable } from '@angular/core';
import { CanActivate, CanLoad, Route, Router, UrlSegment, UrlTree } from '@angular/router';
import { StatusCodes } from 'http-status-codes';
import { Observable } from 'rxjs';
import { SnackbarService } from '../services/snackbar.service';
import { InvalidResponseError, UserService } from '../services/user.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(public auth: UserService, public router: Router, public snackbar: SnackbarService) { }
  
  async canActivate(): Promise<boolean> {
      if (!this.auth.isAuthenticated()) {
        await this.router.navigate(['login']);
        return false;
      }
  
      try {
        const userP = this.auth.getUser();
        const stickersP = this.auth.getStickers();
        await Promise.all([userP, stickersP]);
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
