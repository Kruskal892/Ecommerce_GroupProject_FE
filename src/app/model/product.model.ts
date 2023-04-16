import { FileHandle } from "./file-handle.model";

export interface Product{
    productName: string,
    productDescription: string,
    productPrice : number,
    productDiscountPrice : number,
    productImg: FileHandle[]
}