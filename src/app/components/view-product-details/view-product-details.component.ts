import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Product } from 'src/app/model/product.model';

@Component({
  selector: 'app-view-product-details',
  templateUrl: './view-product-details.component.html',
  styleUrls: ['./view-product-details.component.css'],
})
export class ViewProductDetailsComponent implements OnInit {
  selectedProductIndex = 0;

  product: Product;

  constructor(private activatedRoute: ActivatedRoute,private router: Router) {}

  ngOnInit(): void {
    this.product = this.activatedRoute.snapshot.data['product'];
    console.log(this.product);
  }

  changeImgIndex(index: any) {
    this.selectedProductIndex = index;
  }

  buyProduct(id:any) {
    this.router.navigate(['/buyProduct', {
      isSingleProduct : true,
      id: id
    }])
  }
}
