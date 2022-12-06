import { Component, OnInit } from '@angular/core';
import { AuthService } from "../../services/auth.service"
import { FormGroup, FormControl, Validators } from '@angular/forms'
import { Router, ActivatedRoute } from '@angular/router'
import { FormBuilder } from '@angular/forms';
import { extend } from 'highcharts';

export  interface UpdateUserInfoViewModel{
  company :string,
  username :string,
  email :string,

  firstName :string,

  lastName :string,

  address :string,
  zip :string,
  city :string,
  country :string,

  aboutme :string,

  pic :string
}

@Component({
  selector: 'app-usersetting',
  templateUrl: './setting.component.html',
  styleUrls: ['./setting.component.css']
})
export class SettingComponent implements OnInit {

    constructor(public authservice:AuthService,private fb:FormBuilder) {

      this.configForm();
      
     
       // this.ProductGroupManager.Selected$.subscribe(p => { this.Manager.SearchByGroup(p.id); });

       // this.Manager.Selected$.subscribe(p => this.route.navigate(['/Product', p.id]));
    }

    ngOnInit() {
      this.authservice.getUserInfo().subscribe((response: any) => {
      
        let _response: UpdateUserInfoViewModel = <UpdateUserInfoViewModel>response;
        this.profileForm.patchValue({
       
          company :_response.company,
          username :_response.username,
          email :_response.email,
     
          firstName :_response.firstName,
     
          lastName :_response.lastName,
     
          address :_response.address,
          zip :_response.zip,
          city :_response.city,
          country :_response.country,
     
          aboutme :_response.aboutme,
     
          pic :_response.pic
         
       });
      });
      
  }
  onSubmit() {
    // TODO: Use EventEmitter with form value
    console.warn(this.profileForm.value);
    this.authservice.updateUserInfo(JSON.stringify(this.profileForm.value)).subscribe((response: any) => {
      console.log('updateUserInfo');
      console.log(response);
      alert('updated!!!')
      console.log('updateUserInfo');
    });
    //this.authservice.updateUserInfo( );
  }
  profileForm: FormGroup;
  configForm() {
      // this.profileForm = new FormGroup({
      //     'productName': new FormControl("", [Validators.required]),
      //     'productGroupId': new FormControl("", [Validators.required]),

      //     'colorId': new FormControl("", [Validators.required])
      // });
      this.profileForm  = this.fb.group({
        firstName: ['', Validators.required],
        lastName: [''],
        email:[''],
        pic:[''],
        address: [''],
        street: [''],
        city: [''],
        country: [''],
        username: [''],
        company:[''],
        zip:[''],
        aboutme:['']

       
      });
      // this.profileForm = new FormGroup({
      //    firstName: new FormControl(''),
      //    lastName: new FormControl(''),
      //     address: new FormControl(''),
      //     state: new FormControl(''),
      //     zip: new FormControl(''),
      //     Company:new FormControl(''),
      //     Username:new FormControl(''),
      //     email:new FormControl(''), 
      //     country:new FormControl(''),
      //     description:new FormControl('')
      //   });
     
  }
}
