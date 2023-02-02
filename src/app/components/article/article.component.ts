import { Component, Input, OnInit } from '@angular/core';
import { Article } from '../../interfaces/index';

//pluggins
import { Browser } from '@capacitor/browser';
import { ActionSheetButton, ActionSheetController, Platform } from '@ionic/angular';
import { Share } from '@capacitor/share';
import { StorageService } from '../../services/storage.service';

@Component({
  selector: 'app-article',
  templateUrl: './article.component.html',
  styleUrls: ['./article.component.scss'],
})
export class ArticleComponent implements OnInit {

  @Input() article?: Article;
  @Input() index?: number;

  constructor(private platform:Platform, 
              private actionCrl: ActionSheetController,
              private storageService: StorageService) { }

  ngOnInit() {}

  
  async openArticle(){
    
    if(this.platform.is('ios') || this.platform.is('android')){
      
      await Browser.open({ url: this.article?.url || '', windowName: '_blank' });
    } else {
      
      window.open(this.article?.url, '_blank');
    }
    
  }
  
  async openMenu() {

    const articleFavorite = this.storageService.articleInFavorite(this.article!);

    const normalBtns: ActionSheetButton[] = [
      {
        text: articleFavorite ? 'Remover Favorito': 'Favorito',
        icon: articleFavorite ? 'heart': 'heart-outline',
        handler: () => this.onToggleFavorite() 
      },
      {
        text: 'Cancelar',
        icon: 'close-outline',
        role: 'cancel' 
      }
    ]
    //Boton para compartir moviles
    const shareBtn: ActionSheetButton = {
      text: 'Compartir',
      icon: 'share-outline',
      handler: () => this.onShareArticle() 
    }
    
    //Boton para compartir mweb
    const shareBtnBrowser: ActionSheetButton = {
      text: 'Compartir',
      icon: 'share-outline',
      handler: () => this.onShareArticleWeb() 
    }

    if(this.platform.is('cordova')){
      normalBtns.unshift(shareBtn); //Agregando el boton al arreglo de botones si se esta corriendo la app en capacitor
    } else {
      normalBtns.unshift(shareBtnBrowser);
    }

    const actionSheet = await this.actionCrl.create({
      header: 'Opciones',
      buttons: normalBtns
    });

    await actionSheet.present();

  }

  async onShareArticle() {

    if(this.article){
      console.log('OnShareArticle');
      const { title, source, url, description} = this.article;
      await Share.share({
        title: title,
        text: source.name,
        url: url,
        dialogTitle: description,
      });
    } else {
      console.log('no soporta la funcionalidad de compartir el navegador');
    }

  }

  onToggleFavorite() {
   this.storageService.saveRemoveArticle(this.article!);
  }

  onShareArticleWeb(){
    if (navigator.share) {
      navigator.share({
        title: this.article?.title,
        text: this.article?.description,
        url: this.article?.url,
      })
        .then(() => console.log('Successful share'))
        .catch((error) => console.log('Error sharing', error));
    }
  }
}
