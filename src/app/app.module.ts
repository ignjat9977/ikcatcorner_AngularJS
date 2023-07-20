import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {HttpClientModule} from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { IndexComponent } from './components/main/index/index.component';
import { AboutComponent } from './components/main/about/about.component';
import { AuthorComponent } from './components/main/author/author.component';
import { CartComponent } from './components/main/cart/cart.component';
import { ContactComponent } from './components/main/contact/contact.component';
import { ShopComponent } from './components/main/shop/shop.component';
import { HeaderComponent } from './components/fixed/header/header.component';
import { FooterComponent } from './components/fixed/footer/footer.component';
import { SliderComponent } from './components/generalComponets/slider/slider.component';
import { ServiceSectionComponent } from './components/generalComponets/service-section/service-section.component';
import { BrandSectionComponent } from './components/generalComponets/brand-section/brand-section.component';
import { CategoiesComponentComponent } from './components/generalComponets/categoies-component/categoies-component.component';
import { DiscountPricePipe } from './pipes/discount-price.pipe';
import { QuantityPricePipe } from './pipes/price/quantity-price.pipe';
import { ReactiveFormsModule } from '@angular/forms';
import { NotFoundComponent } from './components/main/not-found/not-found.component';
import { ProductComponent } from './components/generalComponents/product/product.component';
import { ProductModalComponent } from './components/generalComponents/product-modal/product-modal.component';

@NgModule({
  declarations: [
    AppComponent,
    IndexComponent,
    AboutComponent,
    AuthorComponent,
    CartComponent,
    ContactComponent,
    ShopComponent,
    HeaderComponent,
    FooterComponent,
    SliderComponent,
    ServiceSectionComponent,
    BrandSectionComponent,
    CategoiesComponentComponent,
    DiscountPricePipe,
    QuantityPricePipe,
    NotFoundComponent,
    ProductComponent,
    ProductModalComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
