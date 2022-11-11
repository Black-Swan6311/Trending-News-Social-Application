import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { GetLocationService } from './get-location.service';


@Injectable({
  providedIn: 'root'
})
export class NewsapiService {
 
  private searchTerm: BehaviorSubject<string>;

 
  constructor(private http: HttpClient, private location:GetLocationService ) {
    this.searchTerm = new BehaviorSubject<string>('');
  }

  getSearchTerm(): Observable<string> {
    return this.searchTerm.asObservable();
  }

  setSearchTerm(newValue: string): void {
    this.searchTerm.next(newValue);
  }


  API_KEY: string = '082c377cfd8d44f3b20ef9f522e07230';
  url: string = 'http://newsapi.org/v2/everything?q=';
  params: string = '&sortBy=relevancy&apiKey=' ;//REPLACE YYYY-MM-DD WITH VALID DATE WITHIN ONE MONTH OF RUNNING APP
  
  // Top Headlines API URL
  topHeaadlinesNews = `https://newsapi.org/v2/top-headlines?country=ca&pageSize=pageSize=60&sortBy=popularity&apiKey=082c377cfd8d44f3b20ef9f522e07230`;
  // Technology News API URL
  techNews = 'https://newsapi.org/v2/top-headlines?country=us&category=technology&pageSize=50&apiKey=082c377cfd8d44f3b20ef9f522e07230';
  //business News
  businessNews = 'https://newsapi.org/v2/top-headlines?country=us&pageSize=50&category=business&apiKey=082c377cfd8d44f3b20ef9f522e07230'
  //sport News
  sportsNews = 'https://newsapi.org/v2/top-headlines?country=us&category=sports&pageSize=50&sortBy=popularity&apiKey=082c377cfd8d44f3b20ef9f522e07230'
  //entertaiment News
  entertainmentNews = 'https://newsapi.org/v2/top-headlines?country=us&category=entertainment&pageSize=50&sortBy=popularity&apiKey=082c377cfd8d44f3b20ef9f522e07230'
  //general News
  generalNews = 'https://newsapi.org/v2/top-headlines?country=us&category=general&pageSize=50&sortBy=popularity&apiKey=082c377cfd8d44f3b20ef9f522e07230'
   //health News
  healthNews = 'https://newsapi.org/v2/top-headlines?country=us&category=health&pageSize=50&sortBy=popularity&apiKey=082c377cfd8d44f3b20ef9f522e07230'
   //science News
   scienceNews = 'https://newsapi.org/v2/top-headlines?country=us&category=science&pageSize=50&sortBy=popularity&apiKey=082c377cfd8d44f3b20ef9f522e07230'


  // Use Tech Methods
  tcTechNews(): Observable<any> {
    return this.http.get((this.techNews))
  }
  //Sports Methods
  tcSportsNews(): Observable<any> {
    return this.http.get(this.sportsNews)
  }
  // Business Methods
  tcBusinessNews(): Observable<any> {
    return this.http.get(this.businessNews)
  }
  //Entertaiment Methods
  tcEntertaimentNews(): Observable<any> {
    return this.http.get(this.entertainmentNews)
  }
  //General Methods
  tcGeneralNews(): Observable<any> {
     return this.http.get(this.generalNews)
  }
  //Health Methods
  tchealthNews(): Observable<any> {
     return this.http.get(this.healthNews)
  }
  //Science Methods
   tcScienceNews(): Observable<any> {
     return this.http.get(this.scienceNews)
  }
  //TopHeadline Methods
  tcHeadlines(): Observable<any> {
    return this.http.get(this.topHeaadlinesNews)
  }
  
  getNewsServiceBySearch(searchWord: string) {
    if (searchWord.length) {
      return this.http.get(this.url + encodeURIComponent(searchWord) + this.params + this.API_KEY);
    }
    return this.http.get(this.topHeaadlinesNews)
  }


}
