import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Order } from 'src/app/model/orders.model';
import { Product } from 'src/app/model/product.model';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-buy-products',
  templateUrl: './buy-products.component.html',
  styleUrls: ['./buy-products.component.css']
})
export class BuyProductsComponent implements OnInit{

  productDetails: Product[] = [];

  orderDetails: Order = {
    fullName: '',
    address: '',
    contactNumber: '',
    countProductQuantityList: [] 
  }

  constructor(private activatedRoute: ActivatedRoute, private productService: ProductService) {}
  ngOnInit(): void {
    this.productDetails = this.activatedRoute.snapshot.data['productDetails'];
    this.productDetails.forEach(
      x=> this.orderDetails.countProductQuantityList.push(
        {productId: x.id, quantity: 1}
      )  
    );

    console.log(this.productDetails);
    console.log(this.orderDetails)
  }

  public placeOrder(orderForm: NgForm) {
    this.productService.placeOrder(this.orderDetails).subscribe(
      (resp) => {
        console.log(resp)
        orderForm.reset();
      },(error) =>{
        console.log(error)
      }
    )
  }
}
