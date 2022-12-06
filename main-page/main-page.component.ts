import { Component, Input, OnInit } from '@angular/core';
import { GetLocationService } from 'src/app/services/get-location.service';
import { NewsapiService } from '../../services/newsapi.service'
import { GoogleApiService } from '../../services/google-api.service';
import { Articles } from 'src/app/article.model';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.css']
})
export class MainPageComponent implements OnInit {
  topHeadlinesData: any = [];
  locationDetails: any = [];
  // Display Headlines Data
  isCustom: boolean = false
  customHeadlines: { name: string, list: Articles }[] = []
  customFilter: string | undefined

  constructor(private api: NewsapiService, private country: GetLocationService, private readonly googleApi: GoogleApiService) {
    console.log('man:googleApi.userProfileSubject')
    console.log('googleApi.userProfileSubject')
    console.log(googleApi.userProfileSubject)
  }

  ngOnInit(): void {
    let userPerfCats: [] = []
    let categories: { name: string, request: Observable<any> }[]
    if (window.localStorage.getItem('user_category_preferrences')) {
      userPerfCats = JSON.parse(window.localStorage.getItem('user_category_preferrences'))
    }
    if (userPerfCats.length) {
      categories = this.api.getNewsServiceByCategories(userPerfCats)
      this.isCustom = userPerfCats.length > 0
      categories.forEach(category => {
        category.request.subscribe((response) => {
          this.customHeadlines.push({
            name: category.name,
            list: response.articles as Articles
          })
        })
      })
      this.setcustomFilter(categories[0].name)
    } else {
      this.isCustom = false
      this.api.tcHeadlines().subscribe((result) => {
        console.log(result.articles);
        this.topHeadlinesData = result.articles;
      })
    }
  }

  getCountry() {
    this.country.getGeolocationData().subscribe((result) => {
      return this.locationDetails = result;
    })
  }

  changeHeadlines() {
    window.localStorage.removeItem('hidePref')
    window.location.reload()
  }

  get filteredCustomHeadlines(): { name: string, list: Articles }[] {
    if (!this.customFilter) return this.customHeadlines
    return this.customHeadlines.filter((item: { name: string, list: Articles }) => item.name === this.customFilter)
  }

  setcustomFilter(name: string): void {
    this.customFilter = name
  }


}
