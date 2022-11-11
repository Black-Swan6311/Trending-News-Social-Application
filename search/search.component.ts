import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { Observable } from 'rxjs';
import { Article, Articles } from 'src/app/article.model';
import { NewsapiService } from 'src/app/services/newsapi.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {

  searchTerm: string = '';
  searchData: Article[];
  constructor(private newsApi: NewsapiService) { }

  ngOnInit(): void {
    this.newsApi.getSearchTerm().subscribe((value: string) => {
      this.searchTerm = value
      this.newsApi.getNewsServiceBySearch(this.searchTerm).subscribe(
        (resp: Articles) => {
          this.searchData = resp.articles
        }
      );
    })
  }


}
