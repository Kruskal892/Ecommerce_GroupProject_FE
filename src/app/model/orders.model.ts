import { orderQuantity } from "./order-quantity.model";

export interface Order {
    fullName: string;
    address: string;
    contactNumber: string;
    countProductQuantityList: orderQuantity[];
}