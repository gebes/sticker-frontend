import {Injectable} from "@angular/core";
import {ApiService} from "./api.service";
import {Router} from "@angular/router";
import {MatSnackBar} from "@angular/material/snack-bar";
import {InvalidResponseError} from "./user.service";
import {StatusCodes} from "http-status-codes";

@Injectable()
export class SnackbarService {

  constructor(private _snackBar: MatSnackBar) {
  }

  public openSnackbar(message: string){
    this._snackBar.open(message, undefined, {
      duration: 6000
    })
  }

  public snackbarErrorHandler(e: any, messages: Map<number, string | (() => string)>) {
    console.log(e);
    const msgs: Map<number, string | (()=>string)> = new Map([
      [StatusCodes.BAD_REQUEST, "Es gab ein Problem beim Bearbeiten der Anfrage"],
      [StatusCodes.INTERNAL_SERVER_ERROR, "Der Server hat ein Problem beim Bearbeiten der Anfrage"],
      ...messages
    ] )


    if (e instanceof InvalidResponseError) {
      const message: string | (() => void) = msgs.get(e.status) ?? "Es gab ein unerwartetes Problem beim Bearbeiten der Anfrage";

      if (typeof message === 'string') {
        this.openSnackbar(message)
      } else {
        message();
      }
    } else {
      this.openSnackbar( "Es gab ein Problem mit der Verbindung zum Server")
    }
  }

}
