// tslint:disable: comment-format
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

//import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { StoreModule } from './store/store.module';
import { CartDetailComponent } from './store/cartDetail.component';
import { CheckoutComponent } from './store/checkout.component';
import { StoreComponent } from './store/store.component';
import { RouterModule } from '@angular/router';
import { StoreFirstGuard } from "./storeFirst.guard";

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    //AppRoutingModule,
    StoreModule,
    RouterModule.forRoot([
      {path: 'store', component: StoreComponent, canActivate:[StoreFirstGuard]},
      {path: 'cart', component: CartDetailComponent, canActivate:[StoreFirstGuard]},
      {path: 'checkout', component: CheckoutComponent, canActivate:[StoreFirstGuard]},
      {path: '**', redirectTo: '/store'}
    ])
  ],
  providers: [StoreFirstGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
