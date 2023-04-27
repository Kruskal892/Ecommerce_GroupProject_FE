import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';
import { tap } from 'rxjs';
import { ProductService } from '../services/product.service';
import { userOrderDetails } from '../model/order-detail-model';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css'],
})
export class UserComponent implements OnInit {
  displayedColumns: string[] = ['FullName', 'Address', 'Contact Number', 'Amount', 'Status'];

  userOrderDetail: userOrderDetails [] = [];

  message: any;

  constructor(
    private userService: UserService,
    private productService: ProductService
  ) {}

  ngOnInit(): void {
    this.forUser();
    this.getOrder();
  }

  forUser() {
    this.userService.forUser().subscribe(
      (response) => {
        console.log(response);
        this.message = response;
      },
      (error) => {
        console.log(error);
      }
    );
  }

  getOrder() {
    this.productService.getAllOrder().subscribe(
      (resp: userOrderDetails[]) => {
        console.log(resp);
        this.userOrderDetail = resp;
      },
      (error) => {
        console.log(error);
      }
    );
  }
}
