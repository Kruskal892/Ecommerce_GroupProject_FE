import { Injectable } from '@angular/core';
import { Product } from './model/product.model';
import { FileHandle } from './model/file-handle.model';
import { DomSanitizer } from '@angular/platform-browser';

@Injectable({
  providedIn: 'root',
})
export class ImageServiceService {
  constructor(private sanitizer: DomSanitizer) {}

  public createImages(product: Product) {
    const productImages: any[] = product.productImage;

    const productImagesToFileHandle: FileHandle[] = [];

    for (let i = 0; i < productImages?.length; i++) {
      const imageData = productImages[i];

      const imageBlob = this.dataURItoBLOB(
        imageData.pictureByte,
        imageData.type
      );

      const imageFile = new File([imageBlob], imageData.imageName, {
        type: imageData.type,
      });

      const imageFileHandle: FileHandle = {
        file: imageFile,
        url: this.sanitizer.bypassSecurityTrustUrl(
          window.URL.createObjectURL(imageFile)
        ),
      };

      productImagesToFileHandle.push(imageFileHandle);
    }

    product.productImage = productImagesToFileHandle;
    return product;
  }

  // Convert Images Data from data bytes to seeable images
  public dataURItoBLOB(picBytes: string, imageType: any) {
    const byteString = window.atob(picBytes);
    const arrayBuffer = new ArrayBuffer(byteString.length);
    const int8Array = new Uint8Array(arrayBuffer);

    for (let i = 0; i < byteString.length; i++) {
      int8Array[i] = byteString.charCodeAt(i);
    }

    // Create New Blob
    const blob = new Blob([int8Array], { type: imageType });
    return blob;
  }
}
