import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  title = 'My first AGM project';
  lat = 51.678418;
  lng = 7.809007;
  constructor() { }

  ngOnInit(): void {
  }

}
