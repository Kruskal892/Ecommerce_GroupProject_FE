import { Component, OnInit } from '@angular/core';
import { UserAuthService } from '../../services/user-auth.service';
import { Router } from '@angular/router';
import { UserService } from '../../services/user.service';
import { ProductService } from 'src/app/services/product.service';
import { DataSource } from '@angular/cdk/collections';
import { userOrderDetails } from 'src/app/model/order-detail-model';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css'],
})
export class AdminComponent implements OnInit {
  displayedColumns: string[] = [
    'Id',
    'Product Name',
    'FullName',
    'Address',
    'Contact Number',
    'UserName',
    'Status',
    'Action'
  ];

  dataSource: userOrderDetails [] = [];
  isChecked = false;
  status: string = 'All'

  constructor(
    private userAuthService: UserAuthService,
    private router: Router,
    public userService: UserService,
    private productService: ProductService
  ) {}

  ngOnInit(): void {
    this.getAllUserOrder(this.status);
  }

  // check if user is login
  public isLoggedIn() {
    return this.userAuthService.isLoggedIn();
  }

  //Logout current user
  public logout() {
    this.userAuthService.clear();
    this.router.navigate(['/']);
  }

  public isAdmin() {
    return this.userAuthService.isAdmin();
  }

  getAllUserOrder(statusParam:string) {
    this.productService.getAllUserOrder(statusParam).subscribe(
      (resp: userOrderDetails[]) => {
        console.log(resp);
        this.dataSource = resp;
      },
      (error) => {
        console.log(error);
      }
    );
  }

  markedAsDelivered(element:any) {
    console.log(element)
    this.productService.markedAsDelivered(element).subscribe(
      (resp) => {
        this.getAllUserOrder(this.status);
        this.isChecked = true;
        console.log(resp)
      },(error) => {
        console.log(error)
      }
    )
  }
}
