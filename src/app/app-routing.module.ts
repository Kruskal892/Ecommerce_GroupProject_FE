import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { AdminComponent } from './components/admin/admin.component';
import { UserComponent } from '../app/components/user/user.component';
import { LoginComponent } from './components/login/login.component';
import { ForbiddenComponent } from './components/forbidden/forbidden.component';
import { AuthGuard } from './components/authentication/auth.guard';
import { AddNewProductComponent } from './components/add-new-product/add-new-product.component';
import { ShowProductDetailsComponent } from './components/show-product-details/show-product-details.component';
import { ProductResolverService } from './services/product-resolver.service';
import { ViewProductDetailsComponent } from './components/view-product-details/view-product-details.component';
import { BuyProductsComponent } from './components/buy-products/buy-products.component';
import { BuyProductResolverService } from './services/buy-product-resolver.service';
import { OrderConfirmationComponent } from './components/order-confirmation/order-confirmation.component';
import { RegisterComponent } from './components/register/register.component';
import { CartComponent } from './components/cart/cart.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  {
    path: 'admin',
    component: AdminComponent,
    canActivate: [AuthGuard],
    data: { roles: ['Admin'] },
  },
  {
    path: 'user',
    component: UserComponent,
    canActivate: [AuthGuard],
    data: { roles: ['User'] },
  },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'forbidden', component: ForbiddenComponent },
  {
    path: 'addNewProduct',
    component: AddNewProductComponent,
    canActivate: [AuthGuard],
    data: { roles: ['Admin'] },
    resolve: {
      product: ProductResolverService,
    },
  },
  {
    path: 'showAllProduct',
    component: ShowProductDetailsComponent,
    canActivate: [AuthGuard],
    data: { roles: ['Admin'] },
  },
  {
    path: 'viewProductDetails',
    component: ViewProductDetailsComponent,
    resolve: { product: ProductResolverService },
  },
  {
    path: 'buyProduct',
    component: BuyProductsComponent,
    canActivate: [AuthGuard],
    data: { roles: ['User'] },
    resolve: { productDetails: BuyProductResolverService },
  },
  {
    path: 'orderConfirmation',
    component: OrderConfirmationComponent,
    canActivate: [AuthGuard],
    data: { roles: ['User'] },
  },
  {
    path: 'cart',
    component: CartComponent,
    canActivate: [AuthGuard],
    data: { roles: ['User'] },
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
