import {Injectable} from "@angular/core";
import {environment} from "../../environments/environment";
import {ApiService} from "./api.service";
import {Router} from "@angular/router";
import {StatusCodes} from 'http-status-codes'
import {Head} from "rxjs";
import {Sticker} from "../shared/models/sticker.model";


@Injectable()
export class UserService {

  stickers: Sticker[] = []

  constructor(private api: ApiService, private router: Router) {
  }


  getStickers = async (): Promise<Sticker[]> => this.stickers = await this.api.get<Promise<Sticker[]>>("sticker")


}


export class InvalidResponseError extends Error {
  status: number
  body: any

  constructor(status: number, msg: string, body: any) {
    super(msg);
    this.status = status
    this.body = body
  }
}
