import {Injectable} from "@angular/core";
import {environment} from "../../environments/environment";
import {InvalidResponseError} from "./user.service";
import {Router} from "@angular/router";

type HeaderProvider = () => HeadersInit

@Injectable()
export class ApiService {

  constructor() {
  }

  private _defaultHeaderProvider: HeaderProvider = () => ({})

  public async get<T>(route: string, init: RequestInit = {}): Promise<T> {
    return this.callApi(route, init)
  }

  public async post<T>(route: string, init: RequestInit = {}): Promise<T> {
    return this.callApi(route, {method: "POST", ...init})
  }

  public async patch<T>(route: string, init: RequestInit = {}): Promise<T> {
    return this.callApi(route, {method: "PATCH", ...init})
  }

  public async delete<T>(route: string, init: RequestInit = {}): Promise<T> {
    return this.callApi(route, {method: "delete", ...init})
  }

  private async callApi<T>(route: string, init: RequestInit = {}): Promise<T> {
    if (init.headers == null) {
      init.headers = this._defaultHeaderProvider()
    }
    const result = await fetch(environment.baseUrl + route, init)
    const body = await result.json()

    if (!this.isStatusOk(result.status)) {
      throw new InvalidResponseError(result.status, body["message"] ?? body["error"] ?? "No error message provided", body);
    }
    return body as T
  }

  public isStatusOk(status: number): boolean {
    return status - (status % 100) === 200
  }

  public set defaultHeaderProvider(provider: HeaderProvider) {
    this._defaultHeaderProvider = provider
  }

}
