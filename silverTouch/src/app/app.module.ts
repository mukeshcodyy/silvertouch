import { NgModule } from '@angular/core';
import { RouterModule, Routes,CanActivate } from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserModule } from '@angular/platform-browser';
import { LoadingBarModule } from '@ngx-loading-bar/core';
import { LoadingBarRouterModule } from '@ngx-loading-bar/router';
import { AppRoutingModule } from './app-routing.module';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { ProductEditingComponent } from './product-editing/product-editing.component';
import { ProductListingComponent } from './product-listing/product-listing.component';
import { LoginComponent } from './login/login.component';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { LoginauthGuard } from './login/loginauth.guard';
import { ToastrModule } from 'ngx-toastr';
import { NgSelectModule } from '@ng-select/ng-select';
const routes: Routes = [
  {path: '', component:LoginComponent,pathMatch:'full'},
  {path: 'listing',canActivate: [LoginauthGuard] ,component:ProductListingComponent},
  {path: 'listing/listingAdd', component:ProductEditingComponent},
  {path: 'listing/listingedit', component:ProductEditingComponent},
]

@NgModule({
  declarations: [
    AppComponent,
    ProductEditingComponent,
    ProductListingComponent,
    LoginComponent
  ],
  imports: [
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    RouterModule.forRoot(routes),
    BrowserModule,
    AppRoutingModule,
    LoadingBarModule,
    LoadingBarRouterModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot(), // ToastrModule added
    NgSelectModule,
  ],
  providers: [],
  exports: [RouterModule],
  bootstrap: [AppComponent]
})
export class AppModule { }
