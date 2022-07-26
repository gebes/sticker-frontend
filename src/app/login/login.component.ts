import {Component, Inject, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {environment} from "../../environments/environment";
import {DOCUMENT} from "@angular/common";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private router: Router, @Inject(DOCUMENT) private document: Document) {
  }

  ngOnInit(): void {
  }

  async signInClick() {
    this.document.location.href = environment.baseUrl + "auth/discord/login"
  }

}
