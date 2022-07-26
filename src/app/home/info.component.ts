import {Component, Inject, OnInit} from '@angular/core';
import {Sticker} from "../shared/models/sticker.model";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {UserService} from "../services/user.service";


@Component({
  selector: 'app-info',
  templateUrl: './info.component.html',
  styleUrls: ['./info.component.css']
})
export class InfoComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<InfoComponent>,
              @Inject(MAT_DIALOG_DATA) public data: Sticker, private userService: UserService) {
  }

  edition(): string {
    switch (this.data.edition) {
      case "original":
        return "😎 Original"
      case "original_with_earring":
        return "👂 Original (mit Ohrring)"
      case "winter":
        return "⛄️ Winter"
      case "train":
        return "🚇 Zug"
      case "mail":
        return "📮 Post"
      case "holiday":
        return "🏝 Urlaub"
      default:
        return "❓ Unbekannt"
    }
  }


  canDelete(): boolean{
   return (this.userService.user?.id ?? 0) === this.data.edges.owner.id
  }

  ngOnInit(): void {
  }

  onOkClick(){
    this.dialogRef.close()
  }

}
