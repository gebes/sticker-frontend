import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {SnackbarService} from "../services/snackbar.service";
import {UserService} from "../services/user.service";
import {AddSticker} from "../shared/models/sticker.model";

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.scss']
})
export class CreateComponent implements OnInit {
  loading = false

  constructor(private router: Router, private snackbar: SnackbarService, private userService: UserService) {
    let state: any = this.router.getCurrentNavigation()?.extras?.state
    this.form.controls.latitude.setValue(state.coords.lat)
    this.form.controls.longitude.setValue(state.coords.lng)
  }

  form = new FormGroup({
    locationDescription: new FormControl('', [Validators.required]),
    latitude: new FormControl(0, [Validators.required]),
    longitude: new FormControl(0, [Validators.required]),
    edition: new FormControl("holiday")
  },)


  ngOnInit(): void {
  }

  async onSaveClick() {
    this.form.markAllAsTouched()
    if (this.form.invalid) return;
    this.loading = true
    try {
      const sticker: AddSticker = {
        location_description: this.form.controls.locationDescription.value ?? "",
        latitude: this.form.controls.latitude.value ?? 0,
        longitude: this.form.controls.longitude.value ?? 0,
        edition: this.form.controls.edition.value ?? "other",
      }
      await this.userService.createSticker(sticker)
      await this.router.navigate(['/'])
    } catch (e) {
      this.snackbar.snackbarErrorHandler(e, new Map([]));
    }
    this.loading = false
  }

  locationDescriptionError = {'required': 'Gib eine Beschreibung an'}
  latitudeErrors = {'required': 'Gib einen Längengrad an'}
  longitudeErrors = {'required': 'Gib einen Breitengrad an'}


  checkError(t: FormControl, errors: any): string {
    for (let key of Object.keys(errors)) {
      if (t.hasError(key)) return errors[key];
    }
    return ""
  }

}
