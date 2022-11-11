import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { GetLocationService } from 'src/app/services/get-location.service';

@Component({
  selector: 'app-user-location',
  templateUrl: './user-location.component.html',
  styleUrls: ['./user-location.component.css']
})
export class UserLocationComponent implements OnInit {

  locationDetails: any=[];
 
  constructor(private location: GetLocationService) { }

  ngOnInit(): void {
    this.location.getGeolocationData().subscribe((result) => {
      return this.locationDetails = result;
    })
   

  }

  
 
}


  


