import { Component, OnInit } from '@angular/core';
import { tap } from 'rxjs';
import { userOrderDetails } from 'src/app/model/order-detail-model';
import { ProductService } from 'src/app/services/product.service';
import { UserService } from 'src/app/services/user.service';


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
