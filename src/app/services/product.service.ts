import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Product } from '../model/product.model';
import { Order } from '../model/orders.model';
import { userOrderDetails } from '../model/order-detail-model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private httpClient: HttpClient) { }

  public addProduct(product: FormData) {
    return this.httpClient.post<Product>("http://localhost:8080/addNewProduct", product);
  }

  public getAllProducts(pageCount: number, searchByKeyWord:string = "") {
    return this.httpClient.get<Product[]>("http://localhost:8080/getAllProducts?pageCount=" + pageCount + "&searchKey=" + searchByKeyWord);
  }

  public deleteProducts(productId: number) {
    return this.httpClient.delete("http://localhost:8080/deleteProducts/"+productId);
  }

  public getProductDetailById(id: number){
    return this.httpClient.get<Product>("http://localhost:8080/getProductDetailsById/"+id);
  }

  public getProductDetails(isSingleProduct:any, id:any) {
    return this.httpClient.get<Product[]>("http://localhost:8080/getProductDetails/" + isSingleProduct +"/" +id);
  }

  public placeOrder(order: Order, isCartCheckout:any) {
    return this.httpClient.post("http://localhost:8080/placeOrder/" + isCartCheckout, order);
  }

  public addToCart(id: any) {
    return this.httpClient.get("http://localhost:8080/addToCart/"+id);
  }

  public getCartInformation() {
    return this.httpClient.get("http://localhost:8080/getCartDetails");
  }

  public deleteCartItem(cartId:any){
    return this.httpClient.delete("http://localhost:8080/deleteCartItem/" + cartId);
  }

  public getAllOrder(): Observable<userOrderDetails[]>{
    return this.httpClient.get<userOrderDetails[]>("http://localhost:8080/getOrder");
  }

  public getAllUserOrder(status:any): Observable<userOrderDetails[]> {
    return this.httpClient.get<userOrderDetails[]>("http://localhost:8080/getAllOrder/"+status)
  }

  public markedAsDelivered(orderId:number) {
    return this.httpClient.get("http://localhost:8080/markedAsDelivered/" + orderId)
  }
}
