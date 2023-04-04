import { Component, OnInit } from '@angular/core';
import { UserAuthService } from '../services/user-auth.service';
import { Router } from '@angular/router';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {
  constructor(
    private userAuthService: UserAuthService,
    private router: Router,
    public userService: UserService
  ) {}

  ngOnInit(): void {}

  // check if user is login
  public isLoggedIn() {
    return this.userAuthService.isLoggedIn();
  }

  //Logout current user
  public logout () {
    this.userAuthService.clear();
    this.router.navigate(['/home']);
  }
}
