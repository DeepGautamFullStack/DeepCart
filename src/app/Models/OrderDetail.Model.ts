
import { OrderItem } from "./OrderItem.Model";

export interface OrderDetail
{
     OrderID :number;
     CustomerId :number;
     CustomerName:string;
     DeliveryAddress:string;
     Phone:string;
     OrderPayMethod :string;
     PaymentRefrenceId :string;
     OrderItems:OrderItem[];
}