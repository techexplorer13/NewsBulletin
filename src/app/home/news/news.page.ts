import { Component, OnChanges, OnInit, Input } from '@angular/core';
import { ApiService } from '../service/api.service';
import { TestService } from '../service/testService';
import { LoadingController } from '@ionic/angular';
import { ModalController } from '@ionic/angular';
import { NewdescComponent } from './newdesc/newdesc.component';
import { SegmentChangeEventDetail } from '@ionic/core'
import {LoginUserInfo} from '../login/LoginUserInfo'

@Component({
  selector: 'app-news',
  templateUrl: './news.page.html',
  styleUrls: ['./news.page.scss'],
})
export class NewsPage implements OnInit {

  private categories: string[]
  private information: any[] = [];
  private selectedCat: any;
  offset = 0;
  maximumOffset = 20; // this is maximum offset till when the query will be fired

  constructor(private apiService: ApiService, private loadingCtrl: LoadingController,
    private testService: TestService, private modalCtrl: ModalController) { }

  ngOnInit() {
    this.categories = ["Finance", "Science", "Sports", "Health", "Technology"];

    this.loadingCtrl.create({ spinner: "bubbles", message: "loading.." }).then(loadingel => {
      loadingel.present();
      this.categories.slice(0, 3).forEach(cat =>this.fetchNewsByCategories(cat, this.offset, null,loadingel));
      //this.fetchNewsByCategories(this.categories[0])
      setTimeout(() => {
        loadingel.dismiss();
      }, 5000)
    })
  }

  fetchNewsByCategories(cat, offset, event,el:HTMLIonLoadingElement) {

    /**    this.testService.getNewsTest().subscribe(res=>{
        res.information[0].open=true;
        this.information.push(res.information[0])
        res.information[0].open=false;
        this.information.push(res.information[1])
        res.information[0].open=false;
        this.information.push(res.information[2])
      })*/
    this.apiService.getNews(cat, offset).subscribe(res => {
      res.cat = cat;
      res.offset = offset + 20;

      let index = this.information.findIndex(value => value.cat === cat)
      if (index != -1) {
        this.information[index].value = this.information[index].value.concat(res.value);
        this.selectedCat.offset = res.offset
      } else {
        this.information.push(res)
      }
      if(el && this.information.length>2){
        el.dismiss();
        this.selectedCat = this.information.filter(value => value.cat === this.categories[0])[0]
        this.information[0].activated=true;
      }
      if (event) {
        event.target.complete()
      }
    })

  }

  toggleSection(event: CustomEvent<SegmentChangeEventDetail>) {
    console.log("selected :" + event.detail.value)
    this.selectedCat = this.information.filter(value => value.cat === event.detail.value)[0];
    this.information[0].activated = false;
    if (this.selectedCat == null) {
      this.loadingCtrl.create({ spinner: "bubbles", message: "loading.." }).then(loadingel => {
        loadingel.present();
        this.fetchNewsByCategories(event.detail.value, this.offset, null,null);
        setTimeout(() => {
          loadingel.dismiss();
          this.selectedCat = this.information.filter(value => value.cat === event.detail.value)[0];
        }, 1200);
      })
    }
  }

  openModal(index: any) {
    this.modalCtrl.create({
      component: NewdescComponent,
      componentProps: { newdesc: this.selectedCat.value[index] }
    })
      .then(modalel =>
        modalel.present())
  }

  loadCatNews(event) {

    if (this.selectedCat.offset > this.maximumOffset) {
      /**
       * if offset is greater than maximum return dont fire api
       */
      event.target.complete()
      return;
    }
    console.log("cat: " + this.selectedCat.cat + " offset: " + this.selectedCat.offset)
    this.fetchNewsByCategories(this.selectedCat.cat, this.selectedCat.offset, event,null)
  }

}
