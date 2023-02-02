import { Component, OnInit, ViewChild } from '@angular/core';
import { NewService } from '../../services/new.service';
import { Article } from '../../interfaces';
import { IonInfiniteScroll } from '@ionic/angular';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page implements OnInit {

  @ViewChild(IonInfiniteScroll, {static: true}) infinityScroll!: IonInfiniteScroll //El static es para que el componente se inicialice primero y no de undefined
  
  encabezados: string[] = ['business', 'entertainment', 'general', 'health', 'science', 'sports', 'technology'];
  encabezadoSelected: string = this.encabezados[0];
  articles: Article[] = [];

  constructor(private newService: NewService) {}

  ngOnInit() {
    
    this.newService.getNewHeadlinesByCategory(this.encabezadoSelected)
        .subscribe(articles => {
          this.articles = [...articles]
        });
  }
  
  segmentChanged(event: Event){
    this.encabezadoSelected = (event as CustomEvent).detail.value; //indicamos que el envento lo trate como un CustomEvent para no tener problemas en el html
    this.newService.getNewHeadlinesByCategory(this.encabezadoSelected)
    .subscribe(articles => {
      this.articles = [...articles]
    });
  }

  loadData(){

    this.newService.getNewHeadlinesByCategory(this.encabezadoSelected, true)
        .subscribe(articles => {

          if(this.articles.length === articles.length){ //si la cantidad de articulos consultados es la misma del arreglo ya no hay mas
            this.infinityScroll.disabled = true; //desabilitamos el infity scroll
            return;
          }

          this.articles = articles; //caso contrario reemplazamos el arreglo por el nuevo consultado
          this.infinityScroll.complete(); //seguimos ejecutando el infinity scroll

        })

  }

}
