import {Input, Component, OnInit } from '@angular/core';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { HttpClient,HttpClientModule } from '@angular/common/http';
import { Registration } from './Models/User.Models';
import {RegistrationService} from './Services/Registration.Service'


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  providers:[RegistrationService]
})
export class AppComponent implements OnInit {
  closeResult: string;
  registrationForm: FormGroup;
  registrationInputs: Registration[];

  @Input()
  public alerts: Array<IAlert> = [];

  message = "";
  public globalResponse: any;

  constructor(private modalService: NgbModal,private fb: FormBuilder,private regService:RegistrationService) {

  }
  ngOnInit()
  {
    this.registrationForm = this.fb.group({
      UserName:  ['', Validators.compose([Validators.required, Validators.minLength(3),Validators.maxLength(50)])],
      Password:['',Validators.compose([Validators.required, Validators.minLength(3),Validators.maxLength(50)])],
      Email:['',Validators.compose([Validators.required,Validators.email])],
      Role:['',Validators.required],
      Phone:['',Validators.required],
      Gender:['',''],


    });
  }

  open(content) {
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title',size: 'lg'}).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return  `with: ${reason}`;
    }
  }
  OnRegister()
  {
    this.registrationInputs=this.registrationForm.value;

    console.log(this.registrationInputs);
        this.regService.RegisterUser(this.registrationInputs)
            .subscribe((result) => {
              this.globalResponse = result;              
            },
            error => { //This is error part
              this.alerts.push({
                id: 2,
                type: 'danger',
                message: 'Registration failed with fallowing error:'+error,
              });
            },
            () => {
                //  This is Success part
                this.alerts.push({
                  id: 1,
                  type: 'success',
                  message: 'Registration successful.',
                });
                }
              )
            }
     

}
export interface IAlert {
  id: number;
  type: string;
  message: string;
}