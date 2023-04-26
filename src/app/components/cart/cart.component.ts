import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit{

  displayedColumns: string[] = ['Name', 'Description', 'Price', 'DiscountedPrice', 'Action'];

  cartData: any[] = [];

  constructor(private productService: ProductService,private router: Router) {}
  ngOnInit(): void {
    this.getCartInfo();
  }

  getCartInfo() {
    this.productService.getCartInformation().subscribe(
      (resp: any) => {
        console.log(resp)
        this.cartData = resp;
      },(error) => {
        console.log(error)
      }
    )
  }

  checkout(){
    this.router.navigate([
      '/buyProduct',
      {
        isSingleProduct: false,
        id: 0,
      },
    ]);
 }

 deleteProduct(cartId:any) {
    this.productService.deleteCartItem(cartId).subscribe(
      (resp) => {
        console.log(resp)
        this.getCartInfo();
      },(error) => {
        console.log(error)
      }
    )
  }
}
