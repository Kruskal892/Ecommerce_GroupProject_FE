import { Component, Inject, OnInit } from '@angular/core';
import {MatDialog, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { FileHandle } from '../../model/file-handle.model';

@Component({
  selector: 'app-show-product-images',
  templateUrl: './show-product-images.component.html',
  styleUrls: ['./show-product-images.component.css']
})
export class ShowProductImagesComponent implements OnInit{

  constructor(@Inject(MAT_DIALOG_DATA) public data: any) {}

  ngOnInit(): void {
    this.receiveImages()
  }

  receiveImages() {
    // console.log(this.data)
  }
}
