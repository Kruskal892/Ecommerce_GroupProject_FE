import { Component, OnInit } from '@angular/core';
import { Product } from '../../model/product.model';
import { NgForm } from '@angular/forms';
import { ProductService } from '../../services/product.service';
import { FileHandle } from '../../model/file-handle.model';
import { DomSanitizer } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-add-new-product',
  templateUrl: './add-new-product.component.html',
  styleUrls: ['./add-new-product.component.css'],
})
export class AddNewProductComponent implements OnInit {
  isNewProduct = true;

  product: Product = {
    id : null,
    productName: '',
    productDescription: '',
    productPrice: 0,
    productDiscountPrice: 0,
    productImg: [],
  };

  constructor(
    private productService: ProductService,
    private sanitizer: DomSanitizer,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.product = this.activatedRoute.snapshot.data['product'];


    if(this.product && this.product.id){
      this.isNewProduct = false;
    }
  }

  addProduct(productForm: NgForm) {
    const productFormData = this.prepareFormData(this.product);

    this.productService.addProduct(productFormData).subscribe(
      (response: Product) => {
        productForm.reset();
        this.product.productImg = [];
      },
      (error) => {
        console.log(error);
      }
    );
  }

  prepareFormData(product: Product): FormData {
    const formData = new FormData();

    formData.append(
      'product',
      new Blob([JSON.stringify(product)], { type: 'application/json' })
    );

    for (var i = 0; i < product.productImg.length; i++) {
      formData.append(
        'imageFile',
        product.productImg[i].file,
        product.productImg[i].file.name
      );
    }

    return formData;
  }

  onFileSelected(event: any) {
    if (event.target.files) {
      const file = event.target.files[0];

      const FileHandle: FileHandle = {
        file: file,
        url: this.sanitizer.bypassSecurityTrustUrl(
          window.URL.createObjectURL(file)
        ),
      };
      this.product.productImg.push(FileHandle);
    }
  }

  removeImg(i: number){
    this.product.productImg.splice(i, 1);
  }

  fileDrop(fileHandle: FileHandle) {
    this.product.productImg.push(fileHandle);
  }
}
