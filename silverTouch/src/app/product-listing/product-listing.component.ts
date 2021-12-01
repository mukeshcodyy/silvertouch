import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiManager } from '../services/api';
import { ProductsService } from '../services/products.service';
import {NgSelectModule, NgOption} from '@ng-select/ng-select';

@Component({
  selector: 'app-product-listing',
  templateUrl: './product-listing.component.html',
  styleUrls: ['./product-listing.component.css']
})
export class ProductListingComponent implements OnInit {
  ProductListArray:any;
  ProductListArray0:any;
  SearchArray:any;
  selection!:any;
  constructor(private product:ProductsService,private ActivatedRoute: ActivatedRoute,private router:Router) { }

  ngOnInit(): void {
    this.listingData();
  }
  filtercard(){

    this.ProductListArray0=this.SearchArray;
    this.SearchArray=this.ProductListArray0;
    let search=this.ProductListArray0.find((item:any) => item.Name===this.selection.Name);
    this.ProductListArray0=[];
    this.ProductListArray0.push(search);
  }
  listingData(){
    this.product.ListData(ApiManager.LISTING_API,{}).subscribe(response => {
      this.ProductListArray=response;
      this.ProductListArray0=this.ProductListArray.payload.data;
      this.SearchArray=this.ProductListArray0;

    })
  }
  editEmployee(value: any){
    let data= this.ProductListArray0.filter((item:any) => item.ID===value)
    this.router.navigate(['/listing/listingedit'],data)
  }
}
