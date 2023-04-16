import { FileHandle } from "./file-handle.model";

export interface Product{
    id: number | null,
    productName: string,
    productDescription: string,
    productPrice : number,
    productDiscountPrice : number,
    productImg: FileHandle[]
}