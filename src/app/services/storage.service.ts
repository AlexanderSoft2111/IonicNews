import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage-angular';
import { Article } from '../interfaces/index';

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  private _storage: Storage | null = null;
  private _localArticles: Article[] = [];

  constructor(private storage: Storage) { 
    this.init();
  }

  async init() {
    const storage = await this.storage.create();
    console.log('creamos el storage', storage);
    this._storage = storage;
    console.log('segundo storage',this._storage);
  }

  async saveRemoveArticle(article: Article) {
    this._localArticles = [article, ...this._localArticles]; //asigno el nuevo articulo al arreglo privado de articles
    if(this._storage){
      this._storage.set('articles', this._localArticles); //Guardo en el storage con su clave articles
      console.log('Se guardo en el storage');
    }
  }



}
