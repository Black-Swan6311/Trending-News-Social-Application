import { Component, ElementRef, ViewChild } from '@angular/core';
import { NewsapiService } from './services/newsapi.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Articles, initialArticles } from './article.model';
import { Router } from '@angular/router';
import { AuthService } from './services/auth.service';
import { GoogleApiService } from './services/google-api.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

 @ViewChild('home') home: ElementRef;

  searchForm: FormGroup;
  searchTerm: string;
  searchData: Articles = initialArticles;
  routeCategories: string[] = ['technology','business','sport','health','general','entertainment','science']
  isLoggedIn: boolean = false
  title = 'news-site'; 


  constructor(private newsApi: NewsapiService, private fb: FormBuilder, private router: Router, private readonly googleApi: GoogleApiService) {
    this.isLoggedIn = googleApi.isLoggedIn()
  }


  ngOnInit() {
    this.searchForm = this.buildSearchForm();
  }

  

  buildSearchForm(): FormGroup {
    return this.fb.group({
      searchTerm: ['', [Validators.required]]
    })
  }

  openArticle(url: string) {
    window.open(url, "_blank");
  }



  setSearchTerm() {
    this.newsApi.setSearchTerm(this.searchForm.get('searchTerm').value);
    this.router.navigate(['/search']);
  }
  
  
}
