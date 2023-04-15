import { Component, OnInit } from '@angular/core';
import { ProductService } from '../services/product.service';
import { HttpErrorResponse } from '@angular/common/http';
import { Product } from '../model/product.model';

@Component({
  selector: 'app-show-product-details',
  templateUrl: './show-product-details.component.html',
  styleUrls: ['./show-product-details.component.css'],
})
export class ShowProductDetailsComponent implements OnInit {
  productDetails: Product[] = [];

  displayedColumns: string[] = [
    'ID',
    'Product Name',
    'Description',
    'Price',
    'Discounted Price',
    'Edit',
    'Delete',
  ];

  constructor(private productService: ProductService) {}

  ngOnInit(): void {
    this.getAllProducts();
  }

  public getAllProducts() {
    this.productService.getAllProducts().subscribe(
      (resp: Product[]) => {
        // console.log(resp);
        this.productDetails = resp;
      },
      (error: HttpErrorResponse) => {
        console.log(error);
      }
    );
  }

  deleteProduct(productId: any) {
    this.productService.deleteProducts(productId).subscribe(
      (resp) => {
        this.getAllProducts();
        // console.log(resp);
      },
      (error: HttpErrorResponse) => {
        console.log(error);
      }
    );
  }
}
