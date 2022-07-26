import "reflect-metadata";
import {User} from "./user.model";

export  class Sticker {
  public id: number = 0;
  public location_description: string = "";
  public latitude: number = 0;
  public longitude: number = 0;
  public edition: string = "";
  public created_at: string = "";
  public edges: Edges = {owner: {created_at: "", id: "", name: "", updated_at: ""}};
}

export class Edges {
  public owner: User = {created_at: "", id: "", name: "", updated_at: ""};
}


export class AddSticker {
  public location_description: string = "";
  public latitude: number = 0;
  public longitude: number = 0;
  public edition: string = "";
}
