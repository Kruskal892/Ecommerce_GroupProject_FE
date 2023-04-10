import { Component, OnInit } from '@angular/core';
import { Product } from '../model/product.model';
import { NgForm } from '@angular/forms';
import { ProductService } from '../services/product.service';

@Component({
  selector: 'app-add-new-product',
  templateUrl: './add-new-product.component.html',
  styleUrls: ['./add-new-product.component.css']
})
export class AddNewProductComponent implements OnInit{
    product: Product = {
      productName: "",
      productDescription: "",
      productPrice: 0,
      productDiscountPrice: 0
    }


    constructor(private productService: ProductService) {};

    ngOnInit(): void {
      
    }

    addProduct(productForm: NgForm) {
      this.productService.addProduct(this.product).subscribe(
          (response: Product) => {
            productForm.reset();
          },
          (error) => {
            console.log(error);
          }
        );
    }
}
