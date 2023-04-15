import { Component, OnInit } from '@angular/core';
import { ProductService } from '../services/product.service';
import { HttpErrorResponse } from '@angular/common/http';
import { Product } from '../model/product.model';
import { MatDialog } from '@angular/material/dialog';
import { ShowProductImagesComponent } from '../show-product-images/show-product-images.component';
import { ImageServiceService } from '../image-service.service';
import { map } from 'rxjs/operators';

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
    'Images',
    'Edit',
    'Delete',
  ];

  constructor(
    private productService: ProductService,
    public imageBox: MatDialog,
    private imageService: ImageServiceService
  ) {}

  ngOnInit(): void {
    this.getAllProducts();
  }

  public getAllProducts() {
    this.productService.getAllProducts()
    .pipe(
      map((x: Product[], i) => x.map((product: Product) => this.imageService.createImages(product)))
      )
    .subscribe(
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

  showImages(product: Product) {
    console.log(product);
    this.imageBox.open(ShowProductImagesComponent, {
      height: '500px',
      width: '800px'
    })
  }

}
