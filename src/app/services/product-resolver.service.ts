import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  Resolve,
  RouterStateSnapshot,
} from '@angular/router';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { ImageProcessingService } from './image-processing.service';
import { ProductService } from './product.service';
import { Product } from '../model/product.model';

@Injectable({
  providedIn: 'root',
})
export class ProductResolverService implements Resolve<Product> {
  constructor(private productService: ProductService,
    private imageProcessingService: ImageProcessingService) {}

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<Product> {
    const id = route.paramMap.get("id");
    if (id) {
      return this.productService.getProductDetailById(+id)
      .pipe(
          map(pic => this.imageProcessingService.createImages(pic))
        );
    } else {
      // return empty product observable.
     return of(this.getProductDetails())
    }
  }

  getProductDetails() {
    return {
    id: null,
    productName: '',
    productDescription: '',
    productPrice: 0,
    productDiscountPrice: 0,
    productImg: [],
    };
  }
}
