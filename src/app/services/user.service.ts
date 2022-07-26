import {Injectable} from "@angular/core";
import {environment} from "../../environments/environment";
import {ApiService} from "./api.service";
import {Router} from "@angular/router";
import {StatusCodes} from 'http-status-codes'
import {Head} from "rxjs";
import {AddSticker, Sticker} from "../shared/models/sticker.model";
import {CookieService} from "ngx-cookie";
import {User} from "../shared/models/user.model";


@Injectable()
export class UserService {

  user: User | undefined
  stickers: Sticker[] = []

  constructor(private api: ApiService, private router: Router, private cookieService: CookieService) {
  }

  isAuthenticated = (): boolean => this.cookieService.get("access_token_discord") !== undefined

  getUser = async (): Promise<User> => this.user = await this.api.get<Promise<User>>("user")

  getStickers = async (): Promise<Sticker[]> => this.stickers = await this.api.get<Promise<Sticker[]>>("sticker")
  createSticker = async (sticker: AddSticker): Promise<Sticker> => await this.api.post<Promise<Sticker>>("sticker", {body: JSON.stringify(sticker)})
  deleteSticker = async (id: number): Promise<Sticker> => await this.api.delete<Promise<Sticker>>("sticker?id=" + id)


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
