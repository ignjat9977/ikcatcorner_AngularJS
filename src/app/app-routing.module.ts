import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router'; // CLI imports router
import { IndexComponent } from './components/main/index/index.component';
import { ShopComponent } from './components/main/shop/shop.component';
import { AboutComponent } from './components/main/about/about.component';
import { AuthorComponent } from './components/main/author/author.component';
import { CartComponent } from './components/main/cart/cart.component';
import { ContactComponent } from './components/main/contact/contact.component';
import { NotFoundComponent } from './components/main/not-found/not-found.component';

const routes: Routes = [
  { path: '', redirectTo: 'index', pathMatch: 'full'},
  { path: 'index', component: IndexComponent },
  { path: 'shop', component: ShopComponent },
  { path: 'about', component: AboutComponent },
  { path: 'author', component: AuthorComponent },
  { path: 'cart', component: CartComponent },
  { path: 'contact', component: ContactComponent },
  { path: '**', component:NotFoundComponent}
];

// configures NgModule imports and exports
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
