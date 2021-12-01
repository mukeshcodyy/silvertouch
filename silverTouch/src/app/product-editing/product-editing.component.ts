import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { DomSanitizer } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ApiManager } from '../services/api';
import { ProductsService } from '../services/products.service';

@Component({
  selector: 'app-product-editing',
  templateUrl: './product-editing.component.html',
  styleUrls: ['./product-editing.component.css']
})
export class ProductEditingComponent implements OnInit {
  RegisterForm!: FormGroup;
  buttonMode:any;
  ParamRoute:any;
  ProductListArray:any;
  ProductListArray0:any;
  data:any;
  navigation:any;

              constructor(private toastr:ToastrService,private product:ProductsService,private sant: DomSanitizer,private build:FormBuilder,private activatedRoute:ActivatedRoute,private router:Router) {

                  this.navigation = this.router.getCurrentNavigation();
                  this.data=this.navigation?.extras;


               }

  ngOnInit(): void {

    this.routerMode();

    this.register();
    if(this.data.length > 0)
      this.editsetdata();
  }
  // to se focus
  setFocus(targetInput: any) {
    var targetElem = document.getElementById(targetInput);
    setTimeout(function waitTargetElem() {
      if (document.body.contains(targetElem)) {
        targetElem!.focus();
      } else {
        setTimeout(waitTargetElem, 100);
      }
    }, 100);
  }
  // to set the data in edit mode
  editsetdata(){
    this.RegisterForm.get('Name')?.setValue(this.data[0].Name);
    this.RegisterForm.get('Designation')?.setValue(this.data[0].Designation);
    this.RegisterForm.get('Department')?.setValue(this.data[0].Department);
    this.RegisterForm.get('Phone')?.setValue(this.data[0].Phone);
  }
  // this router for change mode
  routerMode(){
    this.ParamRoute=this.activatedRoute.snapshot.routeConfig?.path;
    if(this.ParamRoute=="listing/listingAdd"){
      this.buttonMode="Register"
    }else if(this.ParamRoute=="listing/listingedit"){
      this.buttonMode="Update"

    }
  }

  register(){
    this.RegisterForm=this.build.group({
      Name:new FormControl(null,Validators.required),
      Designation:new FormControl(null,Validators.required),
      Department:new FormControl(null,Validators.required),
      Phone:new FormControl(null,[Validators.required,Validators.pattern("^((\\+91-?)|0)?[0-9]{10}$")]),
    });
  }

  OnSubmit(){
    if(this.RegisterForm.status==="VALID"){
      if(this.buttonMode=="Register"){
        this.product.AddData(ApiManager.ADD_EMPLOYEE,this.RegisterForm.value).subscribe(response =>{
          this.toastr.success("Employee added successfully.")
          this.router.navigate(['/listing'])
        },
        err=>{
          this.toastr.warning("Something went wrong!")

        }
        )
      }
      else if(this.buttonMode=="Update"){
        this.RegisterForm.value['ID']=this.data[0].ID
        this.product.AddData(ApiManager.EDIT_EMPLOYEE,this.RegisterForm.value).subscribe(response =>{
          this.toastr.success("Employee Updated successfully.")
          this.router.navigate(['/listing'])
        },
        err=>{
          this.toastr.warning("Something went wrong!")

        }
        )
      }
    }else{
      console.log(this.RegisterForm.controls['Phone'].status)
      if(this.RegisterForm.get('Name')?.value==null){
        this.setFocus('name');
        this.toastr.warning("Please enter a valid Name!")


      }else if(this.RegisterForm.get('Designation')?.value==null){
        this.setFocus('designation');
        this.toastr.warning("Please enter a valid Designation!")
      }else if(this.RegisterForm.get('Department')?.value==null){
        this.setFocus('department');
        this.toastr.warning("Please enter a valid Department!")
      }else if(this.RegisterForm.controls['Phone'].status==="INVALID"){
        this.setFocus('phone');
        this.toastr.warning("Please enter a valid phone number(*10 DIGITES)!")
      }
    }
  }

}
