import { Component, OnChanges, OnInit ,Input} from '@angular/core';
import { ApiService } from '../service/api.service';
import { TestService } from '../service/testService';
import { LoadingController } from '@ionic/angular';
import { ModalController } from '@ionic/angular';
import { NewdescComponent } from './newdesc/newdesc.component';
import {SegmentChangeEventDetail} from '@ionic/core'

@Component({
  selector: 'app-news',
  templateUrl: './news.page.html',
  styleUrls: ['./news.page.scss'],
})
export class NewsPage implements OnInit {

  private categories: string[]
  private information: any[] = [];
  @Input() private selectedCat: any;

  automaticClose = false;
  constructor(private apiService: ApiService, private loadingCtrl: LoadingController,
    private testService: TestService, private modalCtrl: ModalController) { }

  ngOnInit() {
    this.categories = ["Finance", "Science", "Sports", "Health", "Technology"];

    this.loadingCtrl.create({ spinner: "bubbles", message: "loading.." }).then(loadingel => {
      loadingel.present();
      this.categories.slice(0, 3).forEach((cat) => this.fetchNewsByCategories(cat));
      //this.fetchNewsByCategories(this.categories[0])
      setTimeout(() => {
        loadingel.dismiss()
        console.log(this.information)
        this.selectedCat = this.information[0]
      }, 1200)
    })

  }

  fetchNewsByCategories(cat) {

    /**    this.testService.getNewsTest().subscribe(res=>{
        res.information[0].open=true;
        this.information.push(res.information[0])
        res.information[0].open=false;
        this.information.push(res.information[1])
        res.information[0].open=false;
        this.information.push(res.information[2])
      })*/
    this.apiService.getNews(cat).subscribe(res => {
      console.log(res)
      res.cat = cat;
      this.information.push(res);
    })

  }

  toggleSection(event:CustomEvent<SegmentChangeEventDetail>) {
    console.log(event.detail.value)
    this.selectedCat = this.information.filter(value => value.cat === event.detail.value)[0];
    if (this.selectedCat == null) {
      this.loadingCtrl.create({ spinner: "bubbles", message: "loading.." }).then(loadingel => {
        loadingel.present();
        this.fetchNewsByCategories(event.detail.value);
        setTimeout(() => {
          loadingel.dismiss();
          this.selectedCat = this.information.filter(value => value.cat === event.detail.value)[0];
        }, 1200);
      })
    }
  }

  ng

  openModal(index: any) {
    this.modalCtrl.create({
      component: NewdescComponent,
      componentProps: { newdesc: this.selectedCat.value[index] }
    })
      .then(modalel =>
        modalel.present())
  }

}
