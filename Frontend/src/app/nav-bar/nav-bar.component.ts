import { Component, OnInit } from '@angular/core';
import { AlertifyService } from '../services/alertify.service';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent implements OnInit {
  loggedInUser!: string

  constructor(private alertify: AlertifyService) { }

  ngOnInit(): void {

  }

  isLoggedIn() {
    this.loggedInUser = localStorage.getItem('token')!;
    return this.loggedInUser
  }

  logout() {
    localStorage.removeItem('token')
    this.alertify.warning('Logout Successful')
  }

}
