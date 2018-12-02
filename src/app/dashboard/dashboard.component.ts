import { Component, OnInit,Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { AuthenticationService } from '../Services/authentication.service';
import { Product } from '../Models/Product.Model';
import { ProductService } from '../Services/product.service';
import { IAlert } from '../Models/IAlert';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  productForm: FormGroup;
  sellerName:string="";
  sellerId:number=0;
  productFormInputs: Product[];
  @Input()
  public alerts: Array<IAlert> = [];
  public globalResponse: any;
  productImage:File=null;

  constructor(private fb: FormBuilder,private authService:AuthenticationService,private productService:ProductService) { }

  ngOnInit() {
    this.productForm = this.fb.group({
      Name:  ['', Validators.compose([Validators.required, Validators.minLength(3),Validators.maxLength(50)])],
      Description:['',Validators.compose([Validators.required, Validators.minLength(3),Validators.maxLength(50)])],
      Price:['',Validators.compose([Validators.required])],
      Category:['',Validators.required],
      Quantity:['',Validators.required],
      Address:['',Validators.required],
      image:['',Validators.required],
      Conditions:['',''],

    });
     this.GetSellerDetails();
  }
  GetSellerDetails()
  {
    let details=this.authService.getRole();
   // console.log(details);
    this.sellerId=details["Id"];
    this.sellerName=details["UserName"];
  }
  handleImageFile(file:FileList)
  {
    this.productImage=file.item(0);
  }
  OnSaveProduct()
  {
    let productFormInputs=this.productForm.value;
    productFormInputs.SellerId=this.sellerId;
    productFormInputs.SellerName=this.sellerName;
    productFormInputs.ImageFile=this.productImage;

    this.alerts=[];
   // console.log(productFormInputs);
        this.productService.saveProductInfo(productFormInputs)
            .subscribe((result) => {
              this.globalResponse = result;              
            },
            error => { //This is error part
              console.log(error.message);
              this.alerts.push({
                id: 2,
                type: 'danger',
                message: 'Something went wrong while saving the product, Please try after sometime.'
              });
            },
            () => {
                //  This is Success part
               // console.log(this.globalResponse);
                this.alerts.push({
                  id: 1,
                  type: 'success',
                  message: 'Product has been saved successfully. Now you can add more prodcut , if you wish to.',
                });
                
                }
              )
            }
     public closeAlert(alert: IAlert) {
          const index: number = this.alerts.indexOf(alert);
          this.alerts.splice(index, 1);
      }   
}

