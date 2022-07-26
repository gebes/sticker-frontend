import {Injectable} from "@angular/core";
import {environment} from "../../environments/environment";
import {ApiService} from "./api.service";
import {Router} from "@angular/router";
import {StatusCodes} from 'http-status-codes'
import {Head} from "rxjs";
import {AddUser, EditUser, User, UserAuth, Token} from "../shared/models/user.model";
import {Achievement, AddAchievement, EditAchievement} from "../shared/models/achievement";
import {DateService} from "./date.service";
import {AddProject, EditProject, Project} from "../shared/models/project";


@Injectable()
export class UserService {

  user: (User | undefined)
  achievements: Achievement[] = []
  projects: Project[] = []

  constructor(private api: ApiService, private router: Router, private dateService: DateService) {
    api.defaultHeaderProvider = () => this.getTokenHeaders()

  }

  public getToken(): string | null {
    return localStorage.getItem("token")
  }

  public getTokenSafe(): string {
    const token = this.getToken()
    if (token === null) {
      this.router.navigate(["/login"]);
      throw Error("no token")
    }
    return token
  }

  public getTokenHeaders(): HeadersInit {
    return {
      "Authorization": this.getTokenSafe()
    }
  }

  public setToken(token: string | null): void {
    if (token == null) {
      localStorage.removeItem("token")
      this.user = undefined
    } else {
      localStorage.setItem("token", token)
    }
  }

  isAuthenticated = (): boolean => this.getToken() !== null

  getUser = async (): Promise<User> => this.user = await this.api.get<Promise<User>>("user")
  addUser = async (user: AddUser): Promise<User> => this.user = await this.api.post<Promise<User>>("user", {
    body: JSON.stringify(user),
    headers: {}
  })
  updateUser = async (user: EditUser): Promise<User> => this.user = await this.api.patch<Promise<User>>("user", {body: JSON.stringify(user)})

  postAuthRequest = (auth: UserAuth): Promise<Token> => this.api.post("user/auth", {
    body: JSON.stringify(auth),
    headers: {}
  })

  getAchievements = async (): Promise<Achievement[]> => this.achievements = await this.api.get("achievement")
  addAchievement = (achievement: AddAchievement): Promise<void> => this.api.post("achievement", {body: JSON.stringify(achievement)})
  updateAchievement = (achievement: EditAchievement): Promise<void> => this.api.patch("achievement", {body: JSON.stringify(achievement)})
  deleteAchievement = (id: number): Promise<void> => this.api.delete("achievement?id=" + id)


  achievementsOnDay = (d: Date): Achievement[] => this.achievements.filter((a) => this.dateService.sameDay(new Date(a.date), new Date(d.toISOString())));


  getProjects = async (): Promise<Project[]> => this.projects = await this.api.get("project")
  getProjectById = (id: number): Promise<Project> => this.api.get("project/" + id)
  addProject = (project: AddProject): Promise<void> => this.api.post("project", {body: JSON.stringify(project)})
  updateProject = (project: EditProject): Promise<void> => this.api.patch("project", {body: JSON.stringify(project)})
  deleteProject = (id: number): Promise<void> => this.api.delete("project?id=" + id)


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
