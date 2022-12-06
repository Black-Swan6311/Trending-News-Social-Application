import { Component, ElementRef, ViewChild } from '@angular/core';
import { NewsapiService } from './services/newsapi.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Articles, initialArticles } from './article.model';
import { Router } from '@angular/router';
import { AuthService, UserInfoDetail } from './services/auth.service';
import { GoogleApiService } from './services/google-api.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  user: UserInfoDetail | null;
  prefferenceForm: FormGroup;
  hidePrefferenceDialoge: boolean;
  showUserPreferrenceModal: boolean = false

  searchForm: FormGroup;
  searchTerm: string;
  searchData: Articles = initialArticles;
  routeCategories: string[] = ['technology', 'business', 'sport', 'health', 'general', 'entertainment', 'science']
  isLoggedIn: boolean = false
  title = 'TrendingNews';

  @ViewChild('home') home: ElementRef;

  constructor(private newsApi: NewsapiService, private fb: FormBuilder, private router: Router, private readonly googleApi: GoogleApiService) {
    this.isLoggedIn = googleApi.isLoggedIn()
  }

  ngOnInit() {
    this.setLoginStatus()
    this.searchForm = this.buildSearchForm();
    this.getPreferredCategories()
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

  getPreferredCategories(): void {
    let preferredCategoriesByLocalStorage: [] = []
    if (localStorage.getItem('user_category_preferrences')?.length) {
      preferredCategoriesByLocalStorage = JSON.parse(localStorage.getItem('user_category_preferrences'))
    }
    let dontShowPrefferenceModal: boolean = false
    if (window.localStorage.getItem('hidePref')?.length) {
      dontShowPrefferenceModal = Boolean(JSON.parse(window.localStorage.getItem('hidePref')))
    }
    if (!(preferredCategoriesByLocalStorage.length > 0 && dontShowPrefferenceModal === true)) {
      this.showPreferrenceModal()
    }
  }

  showPreferrenceModal(): void {
    this.showUserPreferrenceModal = true
  }

  closePreferrenceModal() {
    this.showUserPreferrenceModal = false
  }

  isCategorySelected(route: string): boolean {
    let currentPrefferrences = []
    if (window.localStorage.getItem('user_category_preferrences')) {
      currentPrefferrences = JSON.parse(window.localStorage.getItem('user_category_preferrences'))
    }

    if (currentPrefferrences.includes(route)) {
      return true
    }
    return false
  }

  toggleCategoryPrefference(route: string) {
    let currentPrefferrences = []
    if (window.localStorage.getItem('user_category_preferrences')) {
      currentPrefferrences = JSON.parse(window.localStorage.getItem('user_category_preferrences'))
    }
    if (currentPrefferrences.includes(route)) {
      currentPrefferrences = currentPrefferrences.filter(item => item.toString() !== route.toString())
    } else {
      currentPrefferrences.push(route)
    }
    window.localStorage.setItem('user_category_preferrences', JSON.stringify(currentPrefferrences))
  }

  getCurrentHideState() {
    let currentHideState: boolean | string = window.localStorage.getItem('hidePref')
    if (!currentHideState) {
      return false
    }
    currentHideState = Boolean(JSON.parse(currentHideState))
    return currentHideState
  }

  setHideState() {
    let currentHideState: boolean | string = window.localStorage.getItem('hidePref')
    if (!currentHideState) {
      window.localStorage.setItem('hidePref', JSON.stringify(true))
    } else {
      currentHideState = Boolean(JSON.parse(currentHideState))
      currentHideState = !currentHideState
      window.localStorage.setItem('hidePref', JSON.stringify(currentHideState))
    }
  }

  savePrefferences() {
    this.closePreferrenceModal()
    window.location.reload()
  }

  setLoginStatus(): void {
    let shouldRefresh: boolean = false
    if (window.localStorage.getItem('shouldRefresh') !== null) {
      shouldRefresh = JSON.parse(window.localStorage.getItem('shouldRefresh'))
    }
    if (shouldRefresh) {
      window.localStorage.removeItem('shouldRefresh')
      window.localStorage.setItem('refreshedForLogin', JSON.stringify(true))
      setTimeout(() => {
        window.location.reload()
      }, 300)
      return
    } else {
      let refreshedForLogin: boolean = false
      if (window.localStorage.getItem('refreshedForLogin') !== null) {
        refreshedForLogin = JSON.parse(window.localStorage.getItem('refreshedForLogin'))
      }
      if (refreshedForLogin && this.isLoggedIn) {
        window.localStorage.removeItem('refreshedForLogin')
        this.setUserInfo()
      }
    }
  }


  setUserInfo(): void {
    this.googleApi.userProfileSubject.subscribe(info => {
      localStorage.setItem('emailinfo', info.info.email);
      localStorage.setItem('nameinfo', info.info.name);
      localStorage.setItem('picinfo', info.info.picture);
    })
  }


}
