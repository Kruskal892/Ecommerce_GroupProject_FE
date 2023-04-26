import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Order } from 'src/app/model/orders.model';
import { Product } from 'src/app/model/product.model';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-buy-products',
  templateUrl: './buy-products.component.html',
  styleUrls: ['./buy-products.component.css'],
})
export class BuyProductsComponent implements OnInit {
  isSingleProduct: any = '';

  productDetails: Product[] = [];

  orderDetails: Order = {
    fullName: '',
    address: '',
    contactNumber: '',
    email: '',
    countProductQuantityList: [],
  };

  constructor(
    private activatedRoute: ActivatedRoute,
    private productService: ProductService,
    private router: Router
  ) {}
  ngOnInit(): void {
    this.productDetails = this.activatedRoute.snapshot.data['productDetails'];
    this.isSingleProduct = this.activatedRoute.snapshot.paramMap.get("isSingleProduct");

    this.productDetails.forEach((x) =>
      this.orderDetails.countProductQuantityList.push({
        productId: x.id,
        quantity: 1,
      })
    );

    console.log(this.productDetails);
    console.log(this.orderDetails);
  }

  public placeOrder(orderForm: NgForm) {
    this.productService.placeOrder(this.orderDetails, this.isSingleProduct).subscribe(
      (resp) => {
        console.log(resp);
        orderForm.reset();
        this.router.navigate(["/orderConfirmation"]);
      },
      (error) => {
        console.log(error);
      }
    );
  }

  getQuantityValue(id: any) {
    const filterProductList = this.orderDetails.countProductQuantityList.filter(
      (productQuantity) => productQuantity.productId === id
    );

    return filterProductList[0].quantity;
  }

  getCalculatedPrice(id: any, productDiscountPrice: any) {
    const filterProductList = this.orderDetails.countProductQuantityList.filter(
      (productQuantity) => productQuantity.productId === id
    );

    return filterProductList[0].quantity * productDiscountPrice;
  }

  onChangeAmount(value: any, id: any) {
    this.orderDetails.countProductQuantityList.filter(
      (orderAmount) => orderAmount.productId === id
    )[0].quantity = value;
  }

  getTotalPrice() {
    let totalPrice = 0;
    this.orderDetails.countProductQuantityList.forEach((productQuantity) => {
      const price = this.productDetails.filter(
        (product) => product.id === productQuantity.productId
      )[0].productDiscountPrice;
      totalPrice = totalPrice + price * productQuantity.quantity;
    });

    return totalPrice;
  }
}
