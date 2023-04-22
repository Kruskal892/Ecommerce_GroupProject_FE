import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  Resolve,
  RouterStateSnapshot,
} from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Product } from '../model/product.model';
import { ProductService } from './product.service';
import { ImageProcessingService } from './image-processing.service';

@Injectable({
  providedIn: 'root',
})
export class BuyProductResolverService implements Resolve<Product[]> {
  constructor(
    private productService: ProductService,
    private imageProcessingService: ImageProcessingService
  ) {}
  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Product[] | Observable<Product[]> | Promise<Product[]> {
    const id = route.paramMap.get('id');
    const isSingleProduct = route.paramMap.get('isSingleProduct');
    return this.productService
      .getProductDetails(isSingleProduct, id)
      .pipe(
        map((x: Product[], i) =>
          x.map((product: Product) =>
            this.imageProcessingService.createImages(product)
          )
        )
      );
  }
}
