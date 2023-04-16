import { Component, OnInit } from '@angular/core';
import { ProductService } from '../services/product.service';
import { Product } from '../model/product.model';
import { map } from 'rxjs/operators';
import { HttpErrorResponse } from '@angular/common/http';
import { ImageProcessingService } from '../services/image-processing.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit{

  productDetails:Product[] = [];

  constructor(private productService: ProductService,
      private imageProcessingService: ImageProcessingService
    ) {}

  ngOnInit(): void {
    this.getAllProducts();
  }

  public getAllProducts() {
    this.productService.getAllProducts().pipe(
      map((products: Product[]) =>
        products.map((product: Product, i: number) =>
          this.imageProcessingService.createImages(product)
        )
      )
    )
    .subscribe(
      (resp: Product[]) => {
        this.productDetails = resp;
      },
      (error: HttpErrorResponse) => {
        console.log(error);
      }
    );
  }

}
