import {Component, OnInit, ViewChild} from '@angular/core';
import {AgmMap} from "@agm/core";
import {Sticker} from "../shared/models/sticker.model";
import {InvalidResponseError, UserService} from "../services/user.service";
import {MouseEvent} from "@agm/core/map-types";
import {Router} from "@angular/router";
import {MatDialog, MatDialogRef} from "@angular/material/dialog";
import {InfoComponent} from "./info.component";
import {StatusCodes} from "http-status-codes";
import {SnackbarService} from "../services/snackbar.service";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  kaindorfLat = 46.8014175;
  kaindorfLng = 15.54026;

  @ViewChild("map") map!: AgmMap;


  constructor(private userService: UserService, private router: Router, private dialog: MatDialog, private snackbar: SnackbarService) {
  }

  loading = false

  ngOnInit(): void {
    this.loadStickers()
  }

  async loadStickers() {
    if (this.loading) return
    this.loading = true
    try {
      await this.userService.getStickers()
    } catch (e) {
      if (e instanceof InvalidResponseError) {
        if (e.status === StatusCodes.UNAUTHORIZED) {
          await this.router.navigate(["/login"]);
          return
        }
      }
      this.snackbar.snackbarErrorHandler(e, new Map([]))
    }
    this.loading = false
  }

  stickers(): Sticker[] {
    return this.userService.stickers
  }

  stickerToEmoji(sticker: Sticker): string {
    switch (sticker.edition) {
      case "original":
        return "😎";
      case "original_with_earring":
        return "👂";
      case "winter":
        return "⛄️";
      case "train":
        return "🚇";
      case "mail":
        return "📮";
      case "holiday":
        return "🏝";
      default:
        return "❓";
    }
  }

  async createSticker(event: MouseEvent): Promise<void> {
    if(this.map.zoom < 18) {
      this.snackbar.openSnackbar('Du musst weiter hineinzoomen, um einen Sticker erstellen zu können!');
      return;
    }

    await this.router.navigate(['/create'], {state: {coords: event.coords}})
  }

  stickerClick(sticker: Sticker) {
    let dialogRef = this.dialog.open(InfoComponent, {data: sticker});
    dialogRef.afterClosed().subscribe(async result => {
      if (result === null) {
        await this.deleteSticker(sticker);
        await this.loadStickers();
      }
    });
  }

  async deleteSticker(sticker: Sticker) {
    try {
      await this.userService.deleteSticker(sticker.id)
    } catch (e) {
      if (e instanceof InvalidResponseError) {
        if (e.status === StatusCodes.UNAUTHORIZED) {
          await this.router.navigate(["/login"]);
          return
        }
      }
      this.snackbar.snackbarErrorHandler(e, new Map([]))
    }
  }

}
