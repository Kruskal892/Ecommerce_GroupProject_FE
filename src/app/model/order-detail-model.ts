import { Product } from "./product.model";

export interface userOrderDetails {
    email: string;
    orderId: number;
    orderFullName: string;
    orderAddress: string;
    orderContactNumber: string;
    orderStatus: string;
    orderQuantity: number;
    product: Product;
    user: any;
}