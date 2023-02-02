import { Component, OnInit, ViewChild } from '@angular/core';
import { NewService } from '../../services/new.service';
import { Article } from '../../interfaces/index';
import { IonInfiniteScroll } from '@ionic/angular';


@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page implements OnInit{

  articles: Article[] = [];

  @ViewChild(IonInfiniteScroll, {static: true}) infiniteScroll!: IonInfiniteScroll;

  constructor(private newService: NewService) {}

  ngOnInit(){
    
    this.newService.getNewHeadlines().subscribe(articles => this.articles.push(...articles));
    
  }

  loadData(){
    this.newService.getNewHeadlinesByCategory('business', true)
        .subscribe(articles => {
          if(this.articles.length === articles.length){
            this.infiniteScroll.disabled = true;
            return;
          }
          this.articles = articles;
          this.infiniteScroll.complete();
        })
  }

}
