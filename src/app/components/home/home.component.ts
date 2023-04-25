import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../services/product.service';
import { Product } from '../../model/product.model';
import { map } from 'rxjs/operators';
import { HttpErrorResponse } from '@angular/common/http';
import { ImageProcessingService } from '../../services/image-processing.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit{

  pageCount: number = 0;
  productDetails:Product[] = [];
  isMoreProduct = false;

  constructor(private productService: ProductService,
      private imageProcessingService: ImageProcessingService,
      private router: Router
    ) {}

  ngOnInit(): void {
    this.getAllProducts();
  }

  searchByKeyWord(keyword: any){
    this.pageCount = 0;
    this.productDetails = [];
    this.getAllProducts(keyword)
  }

  public getAllProducts(searchKey: string = "") {
    this.productService.getAllProducts(this.pageCount, searchKey).pipe(
      map((products: Product[]) =>
        products.map((product: Product, i: number) =>
          this.imageProcessingService.createImages(product)
        )
      )
    )
    .subscribe(
      (resp: Product[]) => {
        if(resp.length == 8) {
          this.isMoreProduct = true;
        }else{
          this.isMoreProduct = false;
        }
        resp.forEach(p => this.productDetails.push(p))
        // this.productDetails = resp;
        console.log(resp)
      },
      (error: HttpErrorResponse) => {
        console.log(error);
      }
    );
  }

  viewProductDetails(id:any) {
    this.router.navigate(['/viewProductDetails', {id: id}])
  }

  public showNextPage(){
    this.pageCount = this.pageCount + 1;
    this.getAllProducts();
  }

}
