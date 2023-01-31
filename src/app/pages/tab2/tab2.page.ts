import { Component, OnInit } from '@angular/core';
import { NewService } from '../../services/new.service';
import { Article } from '../../interfaces/index';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page implements OnInit {

  encabezados: string[] = ['business', 'entertainment', 'general', 'health', 'science', 'sports', 'technology'];
  encabezadoSelected: string = this.encabezados[0];
  articles: Article[] = [];

  constructor(private newService: NewService) {}

  ngOnInit() {
    
    this.newService.getNewHeadlinesByCategory(this.encabezadoSelected)
        .subscribe(articles => {
          this.articles = articles
          console.log(this.articles);
        });
  }
  
  segmentChanged(event: any){
    console.log(event.detail.value);
    this.encabezadoSelected = event.detail.value;
    this.newService.getNewHeadlinesByCategory(this.encabezadoSelected)
    .subscribe(articles => this.articles = articles);
    console.log(this.articles);
  }

}
