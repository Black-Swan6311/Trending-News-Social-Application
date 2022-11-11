import { Component, Input, OnInit } from '@angular/core';
import { GetLocationService } from 'src/app/services/get-location.service';
import { NewsapiService } from '../../services/newsapi.service'



@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.css']
})
export class MainPageComponent implements OnInit {


  constructor(private api:NewsapiService ,private country:GetLocationService ) { }

  // Display Headlines Data
  topHeadlinesData: any = [];
  locationDetails: any = [];
  
  ngOnInit(): void {
    this.api.tcHeadlines().subscribe((result) => {
      console.log(result.articles);
      this.topHeadlinesData = result.articles;
    })
  }

  getCountry() {
    this.country.getGeolocationData().subscribe((result) => {
      return this.locationDetails = result;
    })
  }


}
