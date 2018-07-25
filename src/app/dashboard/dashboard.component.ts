import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  userProfile:any;

  constructor() { }

  ngOnInit() {
    this.userProfile=JSON.parse(localStorage['userProfile']);
  }
}
