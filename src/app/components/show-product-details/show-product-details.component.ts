import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../services/product.service';
import { HttpErrorResponse } from '@angular/common/http';
import { Product } from '../../model/product.model';
import { MatDialog } from '@angular/material/dialog';
import { ShowProductImagesComponent } from '../show-product-images/show-product-images.component';
import { map } from 'rxjs/operators';
import { ImageProcessingService } from '../../services/image-processing.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-show-product-details',
  templateUrl: './show-product-details.component.html',
  styleUrls: ['./show-product-details.component.css'],
})
export class ShowProductDetailsComponent implements OnInit {
  showTable = false;
  isMoreProduct = false;
  pageCount:number = 0;
  productDetails: Product[] = [];

  displayedColumns: string[] = [
    'ID',
    'Product Name',
    'Description',
    'Price',
    'DiscountedPrice',
    'Actions',

  ];

  constructor(
    private productService: ProductService,
    public imageBox: MatDialog,
    private imageProcessingService: ImageProcessingService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.getAllProducts();
  }

  searchByKeyWord(searchbykeyword:any){
    console.log(searchbykeyword);
    this.pageCount = 0;
    this.productDetails =[];
    this.getAllProducts(searchbykeyword)
  }

  public getAllProducts(searchKey:string = "") {
    this.showTable = false;
    this.productService
      .getAllProducts(this.pageCount, searchKey)
      .pipe(
        map((products: Product[]) =>
          products.map((product: Product, i: number) =>
            this.imageProcessingService.createImages(product)
          )
        )
      )
      .subscribe(
        (resp: Product[]) => {
          console.log(resp)
          resp.forEach(product => this.productDetails.push(product));
          this.showTable = true;
          if(resp.length == 8) {
            this.isMoreProduct = true;
          }else{
            this.isMoreProduct = false;
          }
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
    // console.log(product);
    this.imageBox.open(ShowProductImagesComponent, {
      data: {
        images: product.productImg,
      },
      height: '500px',
      width: '800px',
    });
  }

  editProducts(id: any) {
    this.router.navigate(['/addNewProduct', {id: id}])
  }

  public loadMoreProduct(){
    this.pageCount = this.pageCount + 1;
    this.getAllProducts();
  }
}
