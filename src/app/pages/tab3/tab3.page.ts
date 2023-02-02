import { Component } from '@angular/core';
import { StorageService } from '../../services/storage.service';
import { Article } from '../../interfaces/index';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page {

  //Accediendo a los articulos mediante un get para obtener los cambios en vivo del arreglo 
  get articles(): Article[]{
    return this.storageService.getArticles;
  }

  constructor(private storageService: StorageService) {}

}
