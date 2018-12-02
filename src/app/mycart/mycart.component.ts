import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { Product } from '../Models/Product.Model';
import { ProductService } from '../Services/product.service';
import { IAlert } from '../Models/IAlert';
import { OrderDetail } from '../Models/OrderDetail.Model';
import { Registration } from '../Models/User.Models';
import { AuthenticationService } from '../Services/authentication.service';
import { OrderService } from '../Services/order.service';
import { OrderItem } from '../Models/OrderItem.Model';

@Component({
  selector: 'app-mycart',
  templateUrl: './mycart.component.html',
  styleUrls: ['./mycart.component.scss']
})
export class MycartComponent implements OnInit {
  dafualtQuantity:number=1;
  productAddedTocart:Product[];
  allTotal:number;
  currentUser: Registration[];
  orderDetail:OrderDetail;
  orderItem:OrderItem[];

  public globalResponse: any;
  public alerts: Array<IAlert> = [];

  deliveryForm:FormGroup;


  constructor(private productService:ProductService,private fb: FormBuilder,private authService:AuthenticationService,private orderService:OrderService) 
  {
    
   }

  ngOnInit() {
    this.productAddedTocart=this.productService.getProductFromCart();
    for (let i in this.productAddedTocart) {
      this.productAddedTocart[i].Quantity=1;
   }
   this.productService.removeAllProductFromCart();
   this.productService.addProductToCart(this.productAddedTocart);
   this.calculteAllTotal(this.productAddedTocart);

   this.GetLoggedinUserDetails();

   this.deliveryForm = this.fb.group({
    UserName:  ['', [Validators.required]],
    DeliveryAddress:['',[Validators.required]],
    Phone:['',[Validators.required]],
    Email:['',[Validators.required]],
    Message:['',[]],
    Amount:['',[Validators.required]],

  });

  this.deliveryForm.controls['UserName'].setValue(this.currentUser["UserName"]);
  this.deliveryForm.controls['Phone'].setValue(this.currentUser["Phone"]);
  this.deliveryForm.controls['Email'].setValue(this.currentUser["Email"]);
  this.deliveryForm.controls['Amount'].setValue(this.allTotal);
  }
  onAddQuantity(product:Product)
  {
    //Get Product
    this.productAddedTocart=this.productService.getProductFromCart();
    this.productAddedTocart.find(p=>p.Id==product.Id).Quantity = product.Quantity+1;
    //Find produc for which we want to update the quantity
    //let tempProd= this.productAddedTocart.find(p=>p.Id==product.Id);  
    //tempProd.Quantity=tempProd.Quantity+1;
   
    //this.productAddedTocart=this.productAddedTocart.splice(this.productAddedTocart.indexOf(product), 1)
   //Push the product for cart
   // this.productAddedTocart.push(tempProd);
  this.productService.removeAllProductFromCart();
  this.productService.addProductToCart(this.productAddedTocart);
  this.calculteAllTotal(this.productAddedTocart);
  this.deliveryForm.controls['Amount'].setValue(this.allTotal);
   
  }
  onRemoveQuantity(product:Product)
  {
    this.productAddedTocart=this.productService.getProductFromCart();
    this.productAddedTocart.find(p=>p.Id==product.Id).Quantity = product.Quantity-1;
    this.productService.removeAllProductFromCart();
    this.productService.addProductToCart(this.productAddedTocart);
    this.calculteAllTotal(this.productAddedTocart);
    this.deliveryForm.controls['Amount'].setValue(this.allTotal);

  }
  calculteAllTotal(allItems:Product[])
  {
    let total=0;
    for (let i in allItems) {
      total= total+(allItems[i].Quantity *allItems[i].UnitPrice);
   }
   this.allTotal=total;
  }

  GetLoggedinUserDetails()
  {
    this.currentUser=this.authService.getRole();
            
  } 
  ConfirmOrder()
  {
    const date: Date = new Date();
    var id=this.currentUser['Id'];
    var name=this.currentUser["UserName"];
    var day = date.getDate();
    var monthIndex = date.getMonth();
    var year = date.getFullYear();
    var minutes = date.getMinutes();
    var hours = date.getHours();
    var seconds = date.getSeconds();
    var dateTimeStamp=day.toString()+monthIndex.toString()+year.toString()+minutes.toString()+hours.toString()+seconds.toString();
    let orderDetail:any={};
    
    //Orderdetail is object which hold all the value, which needs to be saved into database
    orderDetail.CustomerId=this.currentUser['Id'];
    orderDetail.CustomerName=this.currentUser["UserName"];
    orderDetail.DeliveryAddress=this.deliveryForm.controls['DeliveryAddress'].value;
    orderDetail.Phone=this.deliveryForm.controls['Phone'].value;

    orderDetail.PaymentRefrenceId=id+"-"+name+dateTimeStamp;
    orderDetail.OrderPayMethod="Cash On Delivery";
    
    //Assigning the ordered item details
    this.orderItem=[];
    for (let i in this.productAddedTocart) {
      this.orderItem.push({
        ID:0,
        ProductID:this.productAddedTocart[i].Id,
        SellerID:this.productAddedTocart[i].SellerId,
        ProductName:this.productAddedTocart[i].Name,
        OrderedQuantity:this.productAddedTocart[i].Quantity,
        PerUnitPrice:this.productAddedTocart[i].UnitPrice,
        OrderID:0,
      }) ;
   }
      //So now compelte object of order is
    orderDetail.OrderItems=this.orderItem;

    this.orderService.PlaceOrder(orderDetail)
            .subscribe((result) => {
              this.globalResponse = result;              
            },
            error => { //This is error part
              console.log(error.message);
              this.alerts.push({
                id: 2,
                type: 'danger',
                message: 'Something went wrong while placing the order, Please try after sometime.'
              });
            },
            () => {
                //  This is Success part
                //console.log(this.globalResponse);
                this.alerts.push({
                  id: 1,
                  type: 'success',
                  message: 'Order has been placed succesfully.',
                });
                
                }
              )

  }
  public closeAlert(alert: IAlert) {
    const index: number = this.alerts.indexOf(alert);
    this.alerts.splice(index, 1);
} 

}
